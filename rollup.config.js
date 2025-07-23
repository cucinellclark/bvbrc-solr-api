export default [
  // ESM build - simple copy to dist/
  {
    input: 'src/bvbrcApiCore.js',
    output: {
      file: 'dist/bvbrcApi.mjs',
      format: 'esm'
    }
  },
  // AMD build for Dojo
  {
    input: 'src/bvbrcApiCore.js',
    output: {
      file: 'dist/bvbrcApi.js',
      format: 'amd'
    }
  }
]; 