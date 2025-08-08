import { 
  getGenome, 
  getGenomeBySpecies, 
  getGenomeFeature, 
  getGenomeFeatureByGenomeId,
  searchAntibioticsByKeyword,
  getAntibioticByName,
  createClient
} from './src/index.js';

// Simple test function focusing on commonly used functions
async function testSimpleFunctions() {
  console.log('Testing Simple BV-BRC API Functions...\n');

  try {
    // Test 1: Get a specific genome by ID
    console.log('Test 1: Get genome by ID');
    const genome = await getGenome('208964.12');
    console.log(`✓ Retrieved genome: ${genome[0]?.genome_name || 'Unknown'}`);

    // Test 2: Get genomes by species
    console.log('\nTest 2: Get E. coli genomes');
    const ecoliGenomes = await getGenomeBySpecies('Escherichia coli', { limit: 3 });
    console.log(`✓ Found ${ecoliGenomes.length} E. coli genomes`);

    // Test 3: Get genome features for a specific genome
    console.log('\nTest 3: Get genome features');
    const features = await getGenomeFeatureByGenomeId('208964.12', { limit: 5 });
    console.log(`✓ Found ${features.length} features for genome 208964.12`);

    // Test 4: Search for antibiotics
    console.log('\nTest 4: Search for antibiotics');
    const antibiotics = await searchAntibioticsByKeyword('penicillin', { limit: 3 });
    console.log(`✓ Found ${antibiotics.length} antibiotics matching 'penicillin'`);

    // Test 5: Get specific antibiotic by name
    console.log('\nTest 5: Get antibiotic by name');
    const penicillin = await getAntibioticByName('Penicillin G', { limit: 1 });
    console.log(`✓ Found ${penicillin.length} Penicillin G records`);

    // Test 6: Use the client approach for more control
    console.log('\nTest 6: Using client approach');
    const client = createClient();
    
    // Get genomes with specific criteria
    const completeGenomes = await client.genome.getByGenomeStatus('Complete', { limit: 2 });
    console.log(`✓ Found ${completeGenomes.length} complete genomes`);

    // Get features by type
    const cdsFeatures = await client.genome_feature.getByFeatureType('CDS', { limit: 3 });
    console.log(`✓ Found ${cdsFeatures.length} CDS features`);

    // Get antibiotics by mechanism
    const cellWallInhibitors = await client.antibiotics.getByMechanismOfAction('Cell wall synthesis inhibitor', { limit: 2 });
    console.log(`✓ Found ${cellWallInhibitors.length} cell wall synthesis inhibitors`);

    console.log('\n🎉 Simple function tests completed successfully!');

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run the tests
testSimpleFunctions(); 