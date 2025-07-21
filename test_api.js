import { getGenome, queryGenomeBy, getAntibiotic } from './bvbrcApi.js';

const ecoli = await getGenome('208964.12');
console.log(ecoli[0].genome_name);

const goodEcoliFeatures = await queryGenomeBy(
  { genome_id: '208964.12', genome_quality: 'Good' },
  { limit: 50, select: ['feature_id', 'gene', 'product'] }
);
console.log(goodEcoliFeatures.length);

const ampicillin = await getAntibiotic('6249');
console.log(ampicillin[0].antibiotic_name);

