import { createContext, run } from './src/core/httpClient.js';
import assert from 'assert';

// Create a context for testing
const context = createContext();

// Test function to demonstrate the new functionality
async function testNewFeatures() {
  console.log('Testing new http_download, sort, and limit features...\n');

  try {
    // Test 1: Basic query with default limit (should be 1000)
    console.log('Test 1: Basic query with default limit');
    const result1 = await run('genome_feature', 'eq(genome_id,208964.12)', {}, context.baseUrl, context.headers);
    assert.equal(result1.length, 1000);
    console.log('✓ Default limit should be 1000');

    // Test 2: Query with custom limit
    console.log('\nTest 2: Query with custom limit');
    const result2 = await run('genome_feature', 'eq(genome_id,208964.12)', { limit: 500 }, context.baseUrl, context.headers);
    assert.equal(result2.length, 500);
    console.log('✓ Custom limit of 500 applied');

    // Test 3: Query with sort parameter
    console.log('\nTest 3: Query with sort parameter');
    const result3 = await run('genome_feature', 'eq(genome_id,208964.12)', { sort: 'feature_id' }, context.baseUrl, context.headers);
    console.log('✓ Sort parameter applied');

    // Test 4: Query with http_download (should work with sort)
    console.log('\nTest 4: Query with http_download and sort');
    const result4 = await run('genome_feature', 'eq(genome_id,208964.12)', { 
      http_download: true, 
      sort: 'feature_id',
      limit: 100000 
    }, context.baseUrl, context.headers);
    console.log(result4.length);
    console.log('✓ http_download with sort and custom limit applied');

    // Test 5: Query with http_download without sort (should throw error)
    console.log('\nTest 5: Query with http_download without sort (should throw error)');
    try {
      await run('genome_feature', 'eq(genome_id,208964.12)', { http_download: true }, context.baseUrl, context.headers);
      console.log('✗ This should have thrown an error');
    } catch (error) {
      console.log('✓ Correctly threw error:', error.message);
    }

    console.log('\nAll tests completed successfully!');

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run the tests
testNewFeatures();
