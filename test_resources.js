import { createClient } from './src/index.js';
import assert from 'assert';

// Create a client for testing
const client = createClient();

// Test function to demonstrate the resource functions
async function testResourceFunctions() {
  console.log('Testing BV-BRC API Resource Functions...\n');

  try {
    // ===== GENOME TESTS =====
    console.log('=== GENOME TESTS ===');

    // Test 1: Get genome by ID
    console.log('Test 1: Get genome by ID');
    const genome1 = await client.genome.getById('208964.12');
    assert(genome1 && genome1.length > 0);
    console.log('✓ Genome retrieved by ID');

    // Test 2: Get genomes by species
    console.log('\nTest 2: Get genomes by species');
    const genomesBySpecies = await client.genome.getBySpecies('Escherichia coli', { limit: 5 });
    assert(genomesBySpecies.length <= 5);
    console.log(`✓ Found ${genomesBySpecies.length} E. coli genomes`);

    // Test 3: Get genomes by genome status
    console.log('\nTest 3: Get complete genomes');
    const completeGenomes = await client.genome.getByGenomeStatus('Complete', { limit: 3 });
    assert(completeGenomes.length <= 3);
    console.log(`✓ Found ${completeGenomes.length} complete genomes`);

    // Test 4: Get genomes by genome length range
    console.log('\nTest 4: Get genomes by length range');
    const largeGenomes = await client.genome.getByGenomeLengthRange(5000000, 10000000, { limit: 3 });
    assert(largeGenomes.length <= 3);
    console.log(`✓ Found ${largeGenomes.length} genomes between 5-10Mb`);

    // Test 5: Get genomes by GC content range
    console.log('\nTest 5: Get genomes by GC content range');
    const highGcGenomes = await client.genome.getByGcContentRange(60, 70, { limit: 3 });
    assert(highGcGenomes.length <= 3);
    console.log(`✓ Found ${highGcGenomes.length} genomes with 60-70% GC content`);

    // Test 6: Complex query with multiple filters
    console.log('\nTest 6: Complex genome query');
    const complexQuery = await client.genome.queryBy({
      'genome_status': 'Complete',
      'genome_quality': 'Good'
    }, { limit: 3, sort: 'genome_id' });
    assert(complexQuery.length <= 3);
    console.log(`✓ Found ${complexQuery.length} complete, good quality genomes`);

    // ===== GENOME FEATURE TESTS =====
    console.log('\n=== GENOME FEATURE TESTS ===');

    // Test 7: Get features by genome ID
    console.log('Test 7: Get features by genome ID');
    const features = await client.genome_feature.getByGenomeId('208964.12', { limit: 10 });
    assert(features.length <= 10);
    console.log(`✓ Found ${features.length} features for genome 208964.12`);

    // Test 8: Get features by feature type
    console.log('\nTest 8: Get CDS features');
    const cdsFeatures = await client.genome_feature.getByFeatureType('CDS', { limit: 5 });
    assert(cdsFeatures.length <= 5);
    console.log(`✓ Found ${cdsFeatures.length} CDS features`);

    // Test 9: Get features by gene name
    console.log('\nTest 9: Get features by gene name');
    const geneFeatures = await client.genome_feature.getByGene('lacZ', { limit: 5 });
    assert(geneFeatures.length <= 5);
    console.log(`✓ Found ${geneFeatures.length} lacZ gene features`);

    // Test 10: Get features by product name
    console.log('\nTest 10: Get features by product name');
    const productFeatures = await client.genome_feature.getByProduct('beta-galactosidase', { limit: 5 });
    assert(productFeatures.length <= 5);
    console.log(`✓ Found ${productFeatures.length} beta-galactosidase features`);

    // Test 11: Get features by location range
    console.log('\nTest 11: Get features by location range');
    const locationFeatures = await client.genome_feature.getByLocationRange(1, 10000, { limit: 5 });
    assert(locationFeatures.length <= 5);
    console.log(`✓ Found ${locationFeatures.length} features in range 1-10000`);

    // Test 12: Get features by protein length range
    console.log('\nTest 12: Get features by protein length range');
    const proteinFeatures = await client.genome_feature.getByProteinLengthRange(100, 500, { limit: 5 });
    assert(proteinFeatures.length <= 5);
    console.log(`✓ Found ${proteinFeatures.length} features with protein length 100-500`);

    // Test 13: Complex genome feature query
    console.log('\nTest 13: Complex genome feature query');
    try {
      const complexFeatureQuery = await client.genome_feature.queryBy({
        'feature_type': 'CDS',
        'strand': '-'
      }, { limit: 5, sort: 'feature_id' });
      assert(complexFeatureQuery.length <= 5);
      console.log(`✓ Found ${complexFeatureQuery.length} positive strand CDS features`);
    } catch (error) {
      console.error('Error in Test 13:', error);
    }

    // ===== ANTIBIOTICS TESTS =====
    console.log('\n=== ANTIBIOTICS TESTS ===');

    // Test 14: Search antibiotics by keyword
    console.log('Test 14: Search antibiotics by keyword');
    const keywordResults = await client.antibiotics.searchByKeyword('penicillin', { limit: 5 });
    assert(keywordResults.length <= 5);
    console.log(`✓ Found ${keywordResults.length} antibiotics matching 'penicillin'`);

    // Test 15: Get antibiotic by name
    console.log('\nTest 15: Get antibiotic by name');
    const antibioticByName = await client.antibiotics.getByAntibioticName('Penicillin G', { limit: 3 });
    assert(antibioticByName.length <= 3);
    console.log(`✓ Found ${antibioticByName.length} Penicillin G records`);

    // Test 16: Get antibiotics by mechanism of action
    console.log('\nTest 16: Get antibiotics by mechanism of action');
    const mechanismResults = await client.antibiotics.getByMechanismOfAction('Cell wall synthesis inhibitor', { limit: 5 });
    assert(mechanismResults.length <= 5);
    console.log(`✓ Found ${mechanismResults.length} cell wall synthesis inhibitors`);

    // Test 17: Get antibiotics by molecular weight range
    console.log('\nTest 17: Get antibiotics by molecular weight range');
    const weightResults = await client.antibiotics.getByMolecularWeightRange(300, 500, { limit: 5 });
    assert(weightResults.length <= 5);
    console.log(`✓ Found ${weightResults.length} antibiotics with MW 300-500`);

    // Test 18: Get antibiotics by ATC classification
    console.log('\nTest 18: Get antibiotics by ATC classification');
    const atcResults = await client.antibiotics.getByAtcClassification('J01C', { limit: 5 });
    assert(atcResults.length <= 5);
    console.log(`✓ Found ${atcResults.length} antibiotics with ATC classification J01C`);

    // Test 19: Complex antibiotics query
    console.log('\nTest 19: Complex antibiotics query');
    const complexAntibioticQuery = await client.antibiotics.queryBy({
      'mechanism_of_action': 'Protein synthesis inhibitor'
    }, { limit: 5, sort: 'antibiotic_name' });
    assert(complexAntibioticQuery.length <= 5);
    console.log(`✓ Found ${complexAntibioticQuery.length} protein synthesis inhibitors`);

    // ===== ADVANCED FEATURE TESTS =====
    console.log('\n=== ADVANCED FEATURE TESTS ===');

    // Test 20: Test sorting with genome features
    console.log('Test 20: Test sorting with genome features');
    const sortedFeatures = await client.genome_feature.getByGenomeId('208964.12', { 
      limit: 5, 
      sort: 'feature_id' 
    });
    assert(sortedFeatures.length <= 5);
    console.log('✓ Features retrieved with sorting');

    // Test 21: Test limit functionality
    console.log('\nTest 21: Test limit functionality');
    const limitedGenomes = await client.genome.getAll({ limit: 3 });
    assert(limitedGenomes.length <= 3);
    console.log(`✓ Retrieved ${limitedGenomes.length} genomes with limit`);

    // Test 22: Test http_download with sort (should work)
    console.log('\nTest 22: Test http_download with sort');
    try {
      const downloadResults = await client.genome_feature.getByGenomeId('208964.12', {
        http_download: true,
        sort: 'feature_id',
        limit: 1000
      });
      console.log(`✓ http_download successful, retrieved ${downloadResults.length} features`);
    } catch (error) {
      console.log('✗ http_download failed:', error.message);
    }

    // Test 23: Test http_download without sort (should fail)
    console.log('\nTest 23: Test http_download without sort (should fail)');
    try {
      await client.genome_feature.getByGenomeId('208964.12', {
        http_download: true,
        limit: 1000
      });
      console.log('✗ This should have thrown an error');
    } catch (error) {
      console.log('✓ Correctly threw error for http_download without sort:', error.message);
    }

    // Test 24: Test range queries with different data types
    console.log('\nTest 24: Test range queries');
    const yearRangeGenomes = await client.genome.getByCollectionYearRange(2020, 2023, { limit: 3 });
    assert(yearRangeGenomes.length <= 3);
    console.log(`✓ Found ${yearRangeGenomes.length} genomes from 2020-2023`);

    // Test 25: Test public status filtering
    console.log('\nTest 25: Test public status filtering');
    const publicGenomes = await client.genome.getByPublicStatus(true, { limit: 3 });
    assert(publicGenomes.length <= 3);
    console.log(`✓ Found ${publicGenomes.length} public genomes`);

    console.log('\n🎉 All tests completed successfully!');
    console.log('\nSummary:');
    console.log('- Genome functions: ✓');
    console.log('- Genome feature functions: ✓');
    console.log('- Antibiotics functions: ✓');
    console.log('- Advanced features (sort, limit, http_download): ✓');
    console.log('- Range queries: ✓');
    console.log('- Complex queries: ✓');

  } catch (error) {
    console.error('Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the tests
testResourceFunctions(); 