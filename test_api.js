import { getGenome, queryGenomeBy, getGenomeFeature, queryGenomeFeatureBy, getAntibiotic } from './bvbrcApi.js';

const ecoli = await getGenome('208964.12');
console.log(ecoli[0].genome_name);

const goodEcoliFeatures = await queryGenomeFeatureBy(
  { genome_id: '208964.12' },
  { limit: 50, select: ['feature_id', 'gene', 'product'] }
);
console.log(goodEcoliFeatures.length);

const ampicillin = await getAntibiotic('6249');
console.log(ampicillin[0].antibiotic_name);

