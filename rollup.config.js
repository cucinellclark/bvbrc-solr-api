export default [
  // ESM build - simple copy to dist/
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bvbrcApi.mjs',
      format: 'esm'
    },
    external: ['fs', 'path', 'url'],
    onwarn(warning, warn) {
      // Suppress warnings about Node.js modules in browser builds
      if (warning.code === 'UNRESOLVED_IMPORT' && 
          ['fs', 'path', 'url'].includes(warning.source)) {
        return;
      }
      warn(warning);
    }
  },
  // AMD build for Dojo
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bvbrcApi.js',
      format: 'amd',
      exports: 'named'
    },
    external: ['fs', 'path', 'url'],
    onwarn(warning, warn) {
      // Suppress warnings about Node.js modules in browser builds
      if (warning.code === 'UNRESOLVED_IMPORT' && 
          ['fs', 'path', 'url'].includes(warning.source)) {
        return;
      }
      warn(warning);
    }
  }
]; 