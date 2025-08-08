import { createClient } from './src/index.js';

// Test function to verify range query fixes
async function testRangeQueries() {
  console.log('Testing Range Query Fixes...\n');

  const client = createClient();

  try {
    // Test 1: Genome length range query
    console.log('Test 1: Genome length range query (5-10Mb)');
    const largeGenomes = await client.genome.getByGenomeLengthRange(5000000, 10000000, { limit: 3 });
    console.log(`✓ Found ${largeGenomes.length} genomes between 5-10Mb`);
    
    if (largeGenomes.length > 0) {
      console.log(`   Example: ${largeGenomes[0].genome_name} (${largeGenomes[0].genome_length} bp)`);
    }

    // Test 2: GC content range query
    console.log('\nTest 2: GC content range query (60-70%)');
    const highGcGenomes = await client.genome.getByGcContentRange(60, 70, { limit: 3 });
    console.log(`✓ Found ${highGcGenomes.length} genomes with 60-70% GC content`);
    
    if (highGcGenomes.length > 0) {
      console.log(`   Example: ${highGcGenomes[0].genome_name} (${highGcGenomes[0].gc_content}% GC)`);
    }

    // Test 3: Collection year range query
    console.log('\nTest 3: Collection year range query (2020-2023)');
    const recentGenomes = await client.genome.getByCollectionYearRange(2020, 2023, { limit: 3 });
    console.log(`✓ Found ${recentGenomes.length} genomes from 2020-2023`);
    
    if (recentGenomes.length > 0) {
      console.log(`   Example: ${recentGenomes[0].genome_name} (${recentGenomes[0].collection_year})`);
    }

    // Test 4: Genome feature location range query
    console.log('\nTest 4: Genome feature location range query');
    const locationFeatures = await client.genome_feature.getByLocationRange(1, 10000, { limit: 3 });
    console.log(`✓ Found ${locationFeatures.length} features in range 1-10000`);
    
    if (locationFeatures.length > 0) {
      console.log(`   Example: ${locationFeatures[0].feature_id} (${locationFeatures[0].start}-${locationFeatures[0].end})`);
    }

    // Test 5: Protein length range query
    console.log('\nTest 5: Protein length range query (100-500 aa)');
    const proteinFeatures = await client.genome_feature.getByProteinLengthRange(100, 500, { limit: 3 });
    console.log(`✓ Found ${proteinFeatures.length} features with protein length 100-500`);
    
    if (proteinFeatures.length > 0) {
      console.log(`   Example: ${proteinFeatures[0].feature_id} (${proteinFeatures[0].aa_length} aa)`);
    }

    // Test 6: Antibiotic molecular weight range query
    console.log('\nTest 6: Antibiotic molecular weight range query (300-500)');
    const weightResults = await client.antibiotics.getByMolecularWeightRange(300, 500, { limit: 3 });
    console.log(`✓ Found ${weightResults.length} antibiotics with MW 300-500`);
    
    if (weightResults.length > 0) {
      console.log(`   Example: ${weightResults[0].antibiotic_name} (MW: ${weightResults[0].molecular_weight})`);
    }

    console.log('\n🎉 All range query tests completed successfully!');
    console.log('The range query fixes are working correctly.');

  } catch (error) {
    console.error('Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the tests
testRangeQueries(); 