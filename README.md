# BV-BRC Solr API

A lightweight JavaScript client for interacting with [BV-BRC](https://www.bv-brc.org/) (Bacterial and Viral Bioinformatics Resource Center) Solr endpoints. This library provides a simple interface to query genomic data, features, and antibiotic information from the BV-BRC database.

## Features

- 🚀 **Lightweight**: Minimal dependencies, tiny footprint
- 🔧 **Dual Build**: Available as both AMD and ESM modules for maximum compatibility
- 🌐 **Universal**: Works in browsers, Node.js, and Dojo environments
- 📊 **Rich API**: Access genomes, features, and antibiotic data with simple functions
- 🔍 **Flexible Querying**: Support for filtering, sorting, field selection, and limiting results
- 📥 **HTTP Download Support**: Enable HTTP download mode for large datasets with automatic sorting
- ⚡ **Smart Defaults**: Default limit of 1000 results for efficient data retrieval

## Installation

```bash
npm install bvbrc-solr-api
```

## Authentication

The BV-BRC API requires authentication for most operations. See [AUTHENTICATION.md](./AUTHENTICATION.md) for detailed instructions on setting up authentication.

### Quick Setup

```javascript
import bvbrcApi from 'bvbrc-solr-api';

// Set your authentication token
bvbrcApi.setAuthToken('your-auth-token-here');

// Create a client
const client = bvbrcApi.createClient();
```

## Usage

### ES Modules (Node.js 18+, Modern Browsers)

```javascript
import { 
  getGenome, 
  queryGenomeBy, 
  getGenomeFeature, 
  queryGenomeFeatureBy,
  getGenomeFeatureByGenomeId,
  getGenomeFeatureByGene,
  getGenomeFeatureByProduct,
  getAntibiotic 
} from 'bvbrc-solr-api';

// Get a specific genome by ID
const ecoli = await getGenome('208964.12');
console.log(ecoli[0].genome_name);

// Get genome features by genome ID
const features = await getGenomeFeatureByGenomeId('208964.12', { limit: 50 });
console.log(`Found ${features.length} features`);

// Get features by gene name
const geneFeatures = await getGenomeFeatureByGene('lacZ', { limit: 10 });
console.log(geneFeatures.map(f => f.product));

// Query genomes with filters and options
const ecoliFeatures = await queryGenomeFeatureBy(
  { genome_id: '208964.12' },
  { 
    limit: 50, 
    select: ['feature_id', 'gene', 'product'],
    sort: 'start'
  }
);

// Get antibiotic information by PubChem CID
const ampicillin = await getAntibiotic('6249');
console.log(ampicillin[0].antibiotic_name);
```

### CommonJS (Node.js)

```javascript
const { getGenome, queryGenomeBy } = require('bvbrc-solr-api');

async function example() {
  const genome = await getGenome('208964.12');
  console.log(genome[0].genome_name);
}
```

### AMD (Dojo, RequireJS)

```javascript
define(['bvbrc-solr-api'], function(bvbrcApi) {
  bvbrcApi.getGenome('208964.12').then(function(genome) {
    console.log(genome[0].genome_name);
  });
});
```

## API Reference

### Core Functions

#### `query(core, filter, options)`

Generic query function for any BV-BRC Solr core.

- **`core`** (string): The Solr core to query (e.g., 'genome', 'genome_feature', 'antibiotics')
- **`filter`** (string): Query filter string
- **`options`** (object): Query options
  - `limit` (number): Maximum number of results (default: 1000)
  - `select` (array): Fields to include in response
  - `sort` (string): Sort field and direction
  - `http_download` (boolean): Enable HTTP download mode (default: false). Requires `sort` parameter when true.

```javascript
const results = await query('genome', 'eq(genome_id,208964.12)', {
  limit: 10,
  select: ['genome_name', 'organism_name'],
  sort: 'genome_name'
});

// Example with http_download enabled
const downloadResults = await query('genome', 'eq(genome_id,208964.12)', {
  limit: 1000,
  select: ['genome_name', 'organism_name'],
  sort: 'genome_name',
  http_download: true
});
```

#### `getGenome(id, options)`

Retrieve a specific genome by ID.

```javascript
const genome = await getGenome('208964.12', {
  select: ['genome_name', 'organism_name', 'genome_length']
});
```

#### `getGenomeFeature(id, options)`

Retrieve a specific genome feature by ID.

```javascript
const feature = await getGenomeFeature('fig|83333.1.peg.1', {
  select: ['gene', 'product', 'start', 'end']
});
```

#### `getAntibiotic(pubchemCid, options)`

Retrieve antibiotic information by PubChem CID.

```javascript
const antibiotic = await getAntibiotic('6249', {
  select: ['antibiotic_name', 'cas_id', 'molecular_formula']
});
```

#### `queryGenomeBy(filters, options)`

Query genomes using multiple filter criteria.

```javascript
const genomes = await queryGenomeBy(
  { 
    organism_name: 'Escherichia coli',
    genome_status: 'Complete'
  },
  { 
    limit: 20,
    select: ['genome_id', 'genome_name', 'strain']
  }
);
```

#### `queryGenomeFeatureBy(filters, options)`

Query genome features using multiple filter criteria.

```javascript
const features = await queryGenomeFeatureBy(
  { 
    genome_id: '208964.12',
    feature_type: 'CDS'
  },
  { 
    limit: 100,
    select: ['feature_id', 'gene', 'product', 'start', 'end'],
    sort: 'start'
  }
);
```

### Genome Feature Convenience Functions

The library provides specialized functions for common genome feature queries:

#### `getGenomeFeatureByGenomeId(genomeId, options)`

Get all features for a specific genome.

```javascript
const features = await getGenomeFeatureByGenomeId('208964.12', {
  limit: 100,
  select: ['feature_id', 'gene', 'product', 'feature_type']
});
```

#### `getGenomeFeatureByGene(geneName, options)`

Find features by gene name (case insensitive).

```javascript
const lacZFeatures = await getGenomeFeatureByGene('lacZ', {
  limit: 20,
  select: ['genome_id', 'gene', 'product', 'start', 'end']
});
```

#### `getGenomeFeatureByProduct(productName, options)`

Find features by product name (case insensitive).

```javascript
const betaGalFeatures = await getGenomeFeatureByProduct('beta-galactosidase', {
  limit: 20,
  select: ['genome_id', 'gene', 'product', 'feature_type']
});
```

#### `getGenomeFeatureByFeatureType(featureType, options)`

Get features by type (e.g., 'CDS', 'tRNA', 'rRNA').

```javascript
const cdsFeatures = await getGenomeFeatureByFeatureType('CDS', {
  limit: 50,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `getGenomeFeatureByAnnotation(annotationType, options)`

Get features by annotation type (e.g., 'PATRIC', 'RefSeq').

```javascript
const patricFeatures = await getGenomeFeatureByAnnotation('PATRIC', {
  limit: 100,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `getGenomeFeatureByPatricId(patricId, options)`

Find features by PATRIC ID.

```javascript
const feature = await getGenomeFeatureByPatricId('fig|83333.1.peg.1', {
  select: ['gene', 'product', 'start', 'end', 'strand']
});
```

#### `getGenomeFeatureByProteinId(proteinId, options)`

Find features by protein ID.

```javascript
const features = await getGenomeFeatureByProteinId('WP_000123456.1', {
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `getGenomeFeatureByAccession(accession, options)`

Find features by accession number.

```javascript
const features = await getGenomeFeatureByAccession('NC_000913.3', {
  select: ['feature_id', 'gene', 'product', 'feature_type']
});
```

#### `getGenomeFeatureByUniprotAccession(uniprotAccession, options)`

Find features by UniProtKB accession.

```javascript
const features = await getGenomeFeatureByUniprotAccession('P00722', {
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `getGenomeFeatureByGoTerm(goTerm, options)`

Find features by GO term (case insensitive).

```javascript
const features = await getGenomeFeatureByGoTerm('GO:0003674', {
  limit: 50,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `getGenomeFeatureByStrand(strand, options)`

Get features by strand ('+' or '-').

```javascript
const positiveStrandFeatures = await getGenomeFeatureByStrand('+', {
  limit: 100,
  select: ['feature_id', 'gene', 'product', 'start', 'end']
});
```

#### `getGenomeFeatureByLocationRange(start, end, options)`

Get features within a specific location range.

```javascript
const features = await getGenomeFeatureByLocationRange(1000, 5000, {
  limit: 50,
  select: ['feature_id', 'gene', 'product', 'start', 'end']
});
```

#### `getGenomeFeatureBySequenceLengthRange(minLength, maxLength, options)`

Get features by DNA sequence length range.

```javascript
const longGenes = await getGenomeFeatureBySequenceLengthRange(3000, 10000, {
  limit: 20,
  select: ['feature_id', 'gene', 'product', 'na_length']
});
```

#### `getGenomeFeatureByProteinLengthRange(minLength, maxLength, options)`

Get features by protein length range.

```javascript
const longProteins = await getGenomeFeatureByProteinLengthRange(1000, 5000, {
  limit: 20,
  select: ['feature_id', 'gene', 'product', 'aa_length']
});
```

#### `getGenomeFeatureByPublicStatus(isPublic, options)`

Get features by public status.

```javascript
const publicFeatures = await getGenomeFeatureByPublicStatus(true, {
  limit: 100,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `getAllGenomeFeatures(options)`

Get all genome features with pagination.

```javascript
const allFeatures = await getAllGenomeFeatures({
  limit: 1000,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

## Development

### Building

The project uses Rollup to create both AMD and ESM builds:

```bash
npm run build
```

This generates:
- `dist/bvbrcApi.js` - AMD format for Dojo/RequireJS environments
- `dist/bvbrcApi.mjs` - ESM format for modern JavaScript environments

### Project Structure

```
bvbrc-solr-api/
├── src/
│   ├── index.js            # Public entry point
│   ├── core/               # Shared infrastructure
│   │   ├── httpClient.js
│   │   └── queryBuilder.js
│   └── resources/          # One module per BV-BRC data type
│       ├── genome.js
│       ├── genome_feature.js
│       └── antibiotics.js
├── dist/                   # Built files (generated)
├── package.json
├── rollup.config.js        # Build configuration
└── test_api.js            # Usage examples
```

### Requirements

- Node.js 18 or higher
- Modern browser with fetch API support

## Examples

### Working with Genome Data

```javascript
import { queryGenomeBy } from 'bvbrc-solr-api';

// Find all complete E. coli genomes
const ecoliGenomes = await queryGenomeBy(
  { 
    organism_name: 'Escherichia coli',
    genome_status: 'Complete'
  },
  { 
    limit: 50,
    select: ['genome_id', 'genome_name', 'strain', 'genome_length'],
    sort: 'genome_length desc'
  }
);

console.log(`Found ${ecoliGenomes.length} complete E. coli genomes`);
ecoliGenomes.forEach(genome => {
  console.log(`${genome.strain}: ${genome.genome_length} bp`);
});
```

### Analyzing Genome Features

```javascript
import { 
  queryGenomeFeatureBy, 
  getGenomeFeatureByGene,
  getGenomeFeatureByFeatureType 
} from 'bvbrc-solr-api';

// Get all genes from a specific genome
const genes = await queryGenomeFeatureBy(
  { 
    genome_id: '208964.12',
    feature_type: 'CDS',
    annotation: 'PATRIC'
  },
  { 
    select: ['gene', 'product', 'start', 'end', 'strand'],
    sort: 'start'
  }
);

console.log(`Found ${genes.length} genes`);

// Find all lacZ genes across genomes
const lacZGenes = await getGenomeFeatureByGene('lacZ', {
  limit: 50,
  select: ['genome_id', 'gene', 'product', 'start', 'end']
});

console.log(`Found ${lacZGenes.length} lacZ genes`);

// Get all tRNA features
const tRNAs = await getGenomeFeatureByFeatureType('tRNA', {
  limit: 100,
  select: ['feature_id', 'gene', 'genome_id']
});

console.log(`Found ${tRNAs.length} tRNA features`);
```

### Advanced Feature Analysis

```javascript
import { 
  getGenomeFeatureByLocationRange,
  getGenomeFeatureByProteinLengthRange,
  getGenomeFeatureByGoTerm
} from 'bvbrc-solr-api';

// Find long genes in a specific region
const longGenes = await getGenomeFeatureByLocationRange(100000, 200000, {
  limit: 20,
  select: ['feature_id', 'gene', 'product', 'start', 'end', 'na_length']
});

// Find large proteins
const largeProteins = await getGenomeFeatureByProteinLengthRange(500, 1000, {
  limit: 50,
  select: ['feature_id', 'gene', 'product', 'aa_length']
});

// Find features with specific GO terms
const dnaBindingProteins = await getGenomeFeatureByGoTerm('GO:0003677', {
  limit: 100,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

### HTTP Download for Large Datasets

```javascript
import { queryGenomeBy, queryGenomeFeatureBy } from 'bvbrc-solr-api';

// Download all E. coli genomes with HTTP download mode
const allEcoliGenomes = await queryGenomeBy(
  { organism_name: 'Escherichia coli' },
  { 
    http_download: true,
    sort: 'genome_id',
    select: ['genome_id', 'genome_name', 'strain', 'genome_length']
  }
);

// Download all features from a specific genome
const allGenomeFeatures = await queryGenomeFeatureBy(
  { genome_id: '208964.12' },
  { 
    http_download: true,
    sort: 'start',
    select: ['feature_id', 'gene', 'product', 'start', 'end']
  }
);

console.log(`Downloaded ${allEcoliGenomes.length} genomes`);
console.log(`Downloaded ${allGenomeFeatures.length} features`);
```

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the build process: `npm run build`
5. Submit a pull request

## Related Resources

- [BV-BRC Website](https://www.bv-brc.org/)
- [BV-BRC API Documentation](https://www.bv-brc.org/docs/api/)
- [BV-BRC Data](https://www.bv-brc.org/docs/data/)

## Support

For issues related to this library, please file an issue on GitHub. For questions about BV-BRC data or services, visit the [BV-BRC Help](https://www.bv-brc.org/help) page. 