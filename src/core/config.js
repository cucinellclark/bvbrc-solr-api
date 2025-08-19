// Runtime configuration system
let runtimeConfig = {
  auth_token: null
};

// Try to load from config.json in development (Node.js environment)
function loadConfigFile() {
  try {
    // Only try to load from file in Node.js environment
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
      const fs = require('fs');
      const path = require('path');
      const configPath = path.join(process.cwd(), 'config.json');
      const configData = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(configData);
    }
  } catch (error) {
    // Silently fail in browser or if file doesn't exist
  }
  return { auth_token: null };
}

// Initialize with file config if available
const fileConfig = loadConfigFile();
runtimeConfig.auth_token = fileConfig.auth_token;

export function setAuthToken(token) {
  runtimeConfig.auth_token = token;
}

export function getAuthToken() {
  return runtimeConfig.auth_token || null;
}

export function getConfig() {
  return { ...runtimeConfig };
}

export function setConfig(config) {
  runtimeConfig = { ...runtimeConfig, ...config };
} 