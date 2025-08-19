#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract function names from source file
function extractSourceFunctions(sourcePath) {
  const content = fs.readFileSync(sourcePath, 'utf8');
  const functionMatches = content.match(/^export function (\w+)/gm);
  const defaultExportMatches = content.match(/^export default \{([^}]+)\}/m);
  
  const functions = new Set();
  
  // Add named exports
  if (functionMatches) {
    functionMatches.forEach(match => {
      const funcName = match.replace('export function ', '');
      functions.add(funcName);
    });
  }
  
  // Add default export functions
  if (defaultExportMatches) {
    const defaultExports = defaultExportMatches[1];
    const defaultFuncMatches = defaultExports.match(/(\w+)/g);
    if (defaultFuncMatches) {
      defaultFuncMatches.forEach(funcName => {
        functions.add(funcName);
      });
    }
  }
  
  return functions;
}

// Extract function names from built files
function extractBuiltFunctions(builtPath) {
  const content = fs.readFileSync(builtPath, 'utf8');
  const functions = new Set();
  
  // For ES modules
  if (builtPath.endsWith('.mjs')) {
    const exportMatches = content.match(/^export \{ ([^}]+) \}/m);
    if (exportMatches) {
      const exports = exportMatches[1];
      const funcMatches = exports.match(/(\w+)/g);
      if (funcMatches) {
        funcMatches.forEach(funcName => {
          functions.add(funcName);
        });
      }
    }
  }
  
  // For CommonJS
  if (builtPath.endsWith('.js')) {
    const exportMatches = content.match(/exports\.(\w+) = \w+;/g);
    if (exportMatches) {
      exportMatches.forEach(match => {
        const funcName = match.match(/exports\.(\w+) =/)[1];
        functions.add(funcName);
      });
    }
  }
  
  return functions;
}

// Main verification
function verifyBuild() {
  console.log('🔍 Verifying build completeness...\n');
  
  const sourcePath = path.join(__dirname, 'src', 'index.js');
  const mjsPath = path.join(__dirname, 'dist', 'bvbrcApi.mjs');
  const jsPath = path.join(__dirname, 'dist', 'bvbrcApi.js');
  
  // Check if files exist
  if (!fs.existsSync(sourcePath)) {
    console.error('❌ Source file not found:', sourcePath);
    return;
  }
  
  if (!fs.existsSync(mjsPath)) {
    console.error('❌ ES module build not found:', mjsPath);
    return;
  }
  
  if (!fs.existsSync(jsPath)) {
    console.error('❌ CommonJS build not found:', jsPath);
    return;
  }
  
  // Extract functions
  const sourceFunctions = extractSourceFunctions(sourcePath);
  const mjsFunctions = extractBuiltFunctions(mjsPath);
  const jsFunctions = extractBuiltFunctions(jsPath);
  
  console.log(`📊 Function counts:`);
  console.log(`   Source: ${sourceFunctions.size} functions`);
  console.log(`   ES Module (.mjs): ${mjsFunctions.size} functions`);
  console.log(`   CommonJS (.js): ${jsFunctions.size} functions\n`);
  
  // Find missing functions
  const missingInMjs = [...sourceFunctions].filter(f => !mjsFunctions.has(f));
  const missingInJs = [...sourceFunctions].filter(f => !jsFunctions.has(f));
  
  // Find extra functions in builds
  const extraInMjs = [...mjsFunctions].filter(f => !sourceFunctions.has(f));
  const extraInJs = [...jsFunctions].filter(f => !sourceFunctions.has(f));
  
  // Report results
  let allGood = true;
  
  if (missingInMjs.length > 0) {
    console.log('❌ Missing functions in ES module build:');
    missingInMjs.forEach(f => console.log(`   - ${f}`));
    allGood = false;
  }
  
  if (missingInJs.length > 0) {
    console.log('❌ Missing functions in CommonJS build:');
    missingInJs.forEach(f => console.log(`   - ${f}`));
    allGood = false;
  }
  
  if (extraInMjs.length > 0) {
    console.log('⚠️  Extra functions in ES module build (not in source):');
    extraInMjs.forEach(f => console.log(`   + ${f}`));
  }
  
  if (extraInJs.length > 0) {
    console.log('⚠️  Extra functions in CommonJS build (not in source):');
    extraInJs.forEach(f => console.log(`   + ${f}`));
  }
  
  if (allGood) {
    console.log('✅ All source functions are present in both build files!');
  } else {
    console.log('\n❌ Build verification failed. Some functions are missing.');
  }
  
  // Show function lists for comparison
  console.log('\n📋 Function comparison:');
  console.log('Source functions:', [...sourceFunctions].sort().join(', '));
  console.log('\nES Module functions:', [...mjsFunctions].sort().join(', '));
  console.log('\nCommonJS functions:', [...jsFunctions].sort().join(', '));
}

// Run verification
verifyBuild(); 