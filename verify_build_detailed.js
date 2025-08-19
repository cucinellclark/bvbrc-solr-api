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

// Categorize functions by type
function categorizeFunctions(functions) {
  const categories = {
    genome: [],
    genomeFeature: [],
    antibiotics: [],
    experiment: [],
    strain: [],
    idRef: [],
    proteinFamilyRef: [],
    spikeLineage: [],
    taxonomy: [],
    utility: []
  };
  
  const sortedFunctions = [...functions].sort();
  
  sortedFunctions.forEach(func => {
    if (func.startsWith('getGenome') || func.startsWith('queryGenome')) {
      categories.genome.push(func);
    } else if (func.startsWith('getGenomeFeature') || func.startsWith('queryGenomeFeature')) {
      categories.genomeFeature.push(func);
    } else if (func.startsWith('getAntibiotic') || func.startsWith('queryAntibiotics') || func.startsWith('searchAntibiotics')) {
      categories.antibiotics.push(func);
    } else if (func.startsWith('getExperiment') || func.startsWith('queryExperiment')) {
      categories.experiment.push(func);
    } else if (func.startsWith('getStrain') || func.startsWith('queryStrain')) {
      categories.strain.push(func);
    } else if (func.startsWith('getIdRef') || func.startsWith('queryIdRef')) {
      categories.idRef.push(func);
    } else if (func.startsWith('getProteinFamilyRef') || func.startsWith('queryProteinFamilyRef')) {
      categories.proteinFamilyRef.push(func);
    } else if (func.startsWith('getSpikeLineage') || func.startsWith('querySpikeLineage')) {
      categories.spikeLineage.push(func);
    } else if (func.startsWith('getTaxonomy') || func.startsWith('queryTaxonomy')) {
      categories.taxonomy.push(func);
    } else {
      categories.utility.push(func);
    }
  });
  
  return categories;
}

// Main verification
function verifyBuild() {
  console.log('🔍 BV-BRC API Build Verification Report');
  console.log('=====================================\n');
  
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
  
  // Categorize functions
  const sourceCategories = categorizeFunctions(sourceFunctions);
  const mjsCategories = categorizeFunctions(mjsFunctions);
  const jsCategories = categorizeFunctions(jsFunctions);
  
  console.log('📊 BUILD SUMMARY');
  console.log('----------------');
  console.log(`Source functions: ${sourceFunctions.size}`);
  console.log(`ES Module (.mjs): ${mjsFunctions.size} functions`);
  console.log(`CommonJS (.js): ${jsFunctions.size} functions\n`);
  
  // Check for missing functions
  const missingInMjs = [...sourceFunctions].filter(f => !mjsFunctions.has(f));
  const missingInJs = [...sourceFunctions].filter(f => !jsFunctions.has(f));
  
  // Check for extra functions
  const extraInMjs = [...mjsFunctions].filter(f => !sourceFunctions.has(f));
  const extraInJs = [...jsFunctions].filter(f => !sourceFunctions.has(f));
  
  // Report status
  let allGood = true;
  
  if (missingInMjs.length > 0) {
    console.log('❌ MISSING FUNCTIONS IN ES MODULE BUILD:');
    missingInMjs.forEach(f => console.log(`   - ${f}`));
    allGood = false;
  }
  
  if (missingInJs.length > 0) {
    console.log('❌ MISSING FUNCTIONS IN COMMONJS BUILD:');
    missingInJs.forEach(f => console.log(`   - ${f}`));
    allGood = false;
  }
  
  if (extraInMjs.length > 0) {
    console.log('⚠️  EXTRA FUNCTIONS IN ES MODULE BUILD:');
    extraInMjs.forEach(f => console.log(`   + ${f}`));
  }
  
  if (extraInJs.length > 0) {
    console.log('⚠️  EXTRA FUNCTIONS IN COMMONJS BUILD:');
    extraInJs.forEach(f => console.log(`   + ${f}`));
  }
  
  if (allGood) {
    console.log('✅ BUILD VERIFICATION PASSED');
    console.log('   All source functions are present in both build files!\n');
  } else {
    console.log('\n❌ BUILD VERIFICATION FAILED');
    console.log('   Some functions are missing from the builds.\n');
  }
  
  // Detailed breakdown by category
  console.log('📋 FUNCTION BREAKDOWN BY CATEGORY');
  console.log('================================');
  
  const categories = ['genome', 'genomeFeature', 'antibiotics', 'experiment', 'strain', 'idRef', 'proteinFamilyRef', 'spikeLineage', 'taxonomy', 'utility'];
  
  categories.forEach(category => {
    const sourceCount = sourceCategories[category].length;
    const mjsCount = mjsCategories[category].length;
    const jsCount = jsCategories[category].length;
    
    console.log(`\n${category.toUpperCase()}:`);
    console.log(`  Source: ${sourceCount}, ES Module: ${mjsCount}, CommonJS: ${jsCount}`);
    
    if (sourceCount > 0) {
      console.log(`  Functions: ${sourceCategories[category].join(', ')}`);
    }
  });
  
  // File size information
  const sourceSize = fs.statSync(sourcePath).size;
  const mjsSize = fs.statSync(mjsPath).size;
  const jsSize = fs.statSync(jsPath).size;
  
  console.log('\n📁 FILE SIZES');
  console.log('-------------');
  console.log(`Source (src/index.js): ${(sourceSize / 1024).toFixed(1)} KB`);
  console.log(`ES Module (dist/bvbrcApi.mjs): ${(mjsSize / 1024).toFixed(1)} KB`);
  console.log(`CommonJS (dist/bvbrcApi.js): ${(jsSize / 1024).toFixed(1)} KB`);
  
  // Build efficiency
  const mjsRatio = (mjsSize / sourceSize).toFixed(2);
  const jsRatio = (jsSize / sourceSize).toFixed(2);
  console.log(`Build ratios: ES Module ${mjsRatio}x, CommonJS ${jsRatio}x source size\n`);
}

// Run verification
verifyBuild(); 