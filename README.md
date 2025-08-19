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

## Usage

### ES Modules (Node.js 18+, Modern Browsers)

```javascript
import { createClient, query } from 'bvbrc-solr-api';

// Create a client to access all resources
const client = createClient();

// Get a specific genome by ID
const ecoli = await client.genome.getById('208964.12');
console.log(ecoli[0].genome_name);

// Get genome features by genome ID
const features = await client.genome_feature.getByGenomeId('208964.12', { limit: 50 });
console.log(`Found ${features.length} features`);

// Get features by gene name
const geneFeatures = await client.genome_feature.getByGene('lacZ', { limit: 10 });
console.log(geneFeatures.map(f => f.product));

// Query genomes with filters and options
const ecoliFeatures = await client.genome_feature.queryBy(
  { genome_id: '208964.12' },
  { 
    limit: 50, 
    select: ['feature_id', 'gene', 'product'],
    sort: 'start'
  }
);

// Get antibiotic information by PubChem CID
const ampicillin = await client.antibiotics.getByPubchemCid('6249');
console.log(ampicillin[0].antibiotic_name);

// Use the generic query function for advanced queries
const results = await query('genome', 'eq(genome_id,208964.12)', {
  limit: 10,
  select: ['genome_name', 'organism_name'],
  sort: 'genome_name'
});
```

### CommonJS (Node.js)

```javascript
const { createClient } = require('bvbrc-solr-api');

async function example() {
  const client = createClient();
  const genome = await client.genome.getById('208964.12');
  console.log(genome[0].genome_name);
}
```

### AMD (Dojo, RequireJS)

```javascript
define(['bvbrc-solr-api'], function(bvbrcApi) {
  const client = bvbrcApi.createClient();
  client.genome.getById('208964.12').then(function(genome) {
    console.log(genome[0].genome_name);
  });
});
```

## API Reference

### Core Functions

#### `createClient(contextOverrides = {})`

Creates a client instance with access to all BV-BRC resources.

```javascript
const client = createClient();
```

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

### Genome Resource

#### `client.genome.getById(genomeId, options)`

Retrieve a specific genome by ID.

```javascript
const genome = await client.genome.getById('208964.12', {
  select: ['genome_name', 'organism_name', 'genome_length']
});
```

#### `client.genome.queryBy(filters, options)`

Query genomes using multiple filter criteria.

```javascript
const genomes = await client.genome.queryBy(
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

#### `client.genome.getByOrganismName(organismName, options)`

Get genomes by organism name.

```javascript
const ecoliGenomes = await client.genome.getByOrganismName('Escherichia coli', {
  limit: 50,
  select: ['genome_id', 'genome_name', 'strain']
});
```

#### `client.genome.getByStrain(strain, options)`

Get genomes by strain name.

```javascript
const strainGenomes = await client.genome.getByStrain('K-12', {
  select: ['genome_id', 'genome_name', 'organism_name']
});
```

### Genome Feature Resource

#### `client.genome_feature.getById(featureId, options)`

Retrieve a specific genome feature by ID.

```javascript
const feature = await client.genome_feature.getById('fig|83333.1.peg.1', {
  select: ['gene', 'product', 'start', 'end']
});
```

#### `client.genome_feature.queryBy(filters, options)`

Query genome features using multiple filter criteria.

```javascript
const features = await client.genome_feature.queryBy(
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

#### `client.genome_feature.getByGenomeId(genomeId, options)`

Get all features for a specific genome.

```javascript
const features = await client.genome_feature.getByGenomeId('208964.12', {
  limit: 100,
  select: ['feature_id', 'gene', 'product', 'feature_type']
});
```

#### `client.genome_feature.getByGene(geneName, options)`

Find features by gene name (case insensitive).

```javascript
const lacZFeatures = await client.genome_feature.getByGene('lacZ', {
  limit: 20,
  select: ['genome_id', 'gene', 'product', 'start', 'end']
});
```

#### `client.genome_feature.getByProduct(productName, options)`

Find features by product name (case insensitive).

```javascript
const betaGalFeatures = await client.genome_feature.getByProduct('beta-galactosidase', {
  limit: 20,
  select: ['genome_id', 'gene', 'product', 'feature_type']
});
```

#### `client.genome_feature.getByFeatureType(featureType, options)`

Get features by type (e.g., 'CDS', 'tRNA', 'rRNA').

```javascript
const cdsFeatures = await client.genome_feature.getByFeatureType('CDS', {
  limit: 50,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `client.genome_feature.getByAnnotation(annotationType, options)`

Get features by annotation type (e.g., 'PATRIC', 'RefSeq').

```javascript
const patricFeatures = await client.genome_feature.getByAnnotation('PATRIC', {
  limit: 100,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `client.genome_feature.getByPatricId(patricId, options)`

Find features by PATRIC ID.

```javascript
const feature = await client.genome_feature.getByPatricId('fig|83333.1.peg.1', {
  select: ['gene', 'product', 'start', 'end', 'strand']
});
```

#### `client.genome_feature.getByProteinId(proteinId, options)`

Find features by protein ID.

```javascript
const features = await client.genome_feature.getByProteinId('WP_000123456.1', {
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `client.genome_feature.getByAccession(accession, options)`

Find features by accession number.

```javascript
const features = await client.genome_feature.getByAccession('NC_000913.3', {
  select: ['feature_id', 'gene', 'product', 'feature_type']
});
```

#### `client.genome_feature.getByUniprotAccession(uniprotAccession, options)`

Find features by UniProtKB accession.

```javascript
const features = await client.genome_feature.getByUniprotAccession('P00722', {
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `client.genome_feature.getByGoTerm(goTerm, options)`

Find features by GO term (case insensitive).

```javascript
const features = await client.genome_feature.getByGoTerm('GO:0003674', {
  limit: 50,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

#### `client.genome_feature.getByStrand(strand, options)`

Get features by strand ('+' or '-').

```javascript
const positiveStrandFeatures = await client.genome_feature.getByStrand('+', {
  limit: 100,
  select: ['feature_id', 'gene', 'product', 'start', 'end']
});
```

#### `client.genome_feature.getByLocationRange(start, end, options)`

Get features within a specific location range.

```javascript
const features = await client.genome_feature.getByLocationRange(1000, 5000, {
  limit: 50,
  select: ['feature_id', 'gene', 'product', 'start', 'end']
});
```

#### `client.genome_feature.getBySequenceLengthRange(minLength, maxLength, options)`

Get features by DNA sequence length range.

```javascript
const longGenes = await client.genome_feature.getBySequenceLengthRange(3000, 10000, {
  limit: 20,
  select: ['feature_id', 'gene', 'product', 'na_length']
});
```

#### `client.genome_feature.getByProteinLengthRange(minLength, maxLength, options)`

Get features by protein length range.

```javascript
const longProteins = await client.genome_feature.getByProteinLengthRange(1000, 5000, {
  limit: 20,
  select: ['feature_id', 'gene', 'product', 'aa_length']
});
```

#### `client.genome_feature.getByPublicStatus(isPublic, options)`

Get features by public status.

```javascript
const publicFeatures = await client.genome_feature.getByPublicStatus(true, {
  limit: 100,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

### Antibiotics Resource

#### `client.antibiotics.getByPubchemCid(pubchemCid, options)`

Retrieve antibiotic information by PubChem CID.

```javascript
const antibiotic = await client.antibiotics.getByPubchemCid('6249', {
  select: ['antibiotic_name', 'cas_id', 'molecular_formula']
});
```

#### `client.antibiotics.queryBy(filters, options)`

Query antibiotics using multiple filter criteria.

```javascript
const antibiotics = await client.antibiotics.queryBy(
  { 
    mechanism_of_action: 'Cell wall synthesis inhibitor'
  },
  { 
    limit: 20,
    select: ['antibiotic_name', 'cas_id', 'molecular_formula']
  }
);
```

#### `client.antibiotics.getByAntibioticName(antibioticName, options)`

Get antibiotics by name.

```javascript
const ampicillin = await client.antibiotics.getByAntibioticName('Ampicillin', {
  select: ['pubchem_cid', 'cas_id', 'molecular_formula']
});
```

#### `client.antibiotics.searchByKeyword(keyword, options)`

Search antibiotics by keyword.

```javascript
const penicillinResults = await client.antibiotics.searchByKeyword('penicillin', {
  limit: 10,
  select: ['antibiotic_name', 'pubchem_cid']
});
```

### Additional Resources

The library provides access to many other BV-BRC resources:

- **Strain**: `client.strain.*`
- **Taxonomy**: `client.taxonomy.*`
- **Pathway**: `client.pathway.*`
- **Protein Structure**: `client.protein_structure.*`
- **Experiment**: `client.experiment.*`
- **Bioset**: `client.bioset.*`
- **And many more...**

Each resource follows the same pattern with methods like `getById()`, `queryBy()`, and specific getter methods.

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
import { createClient } from 'bvbrc-solr-api';

const client = createClient();

// Find all complete E. coli genomes
const ecoliGenomes = await client.genome.queryBy(
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
import { createClient } from 'bvbrc-solr-api';

const client = createClient();

// Get all genes from a specific genome
const genes = await client.genome_feature.queryBy(
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
const lacZGenes = await client.genome_feature.getByGene('lacZ', {
  limit: 50,
  select: ['genome_id', 'gene', 'product', 'start', 'end']
});

console.log(`Found ${lacZGenes.length} lacZ genes`);

// Get all tRNA features
const tRNAs = await client.genome_feature.getByFeatureType('tRNA', {
  limit: 100,
  select: ['feature_id', 'gene', 'genome_id']
});

console.log(`Found ${tRNAs.length} tRNA features`);
```

### Advanced Feature Analysis

```javascript
import { createClient } from 'bvbrc-solr-api';

const client = createClient();

// Find long genes in a specific region
const longGenes = await client.genome_feature.getByLocationRange(100000, 200000, {
  limit: 20,
  select: ['feature_id', 'gene', 'product', 'start', 'end', 'na_length']
});

// Find large proteins
const largeProteins = await client.genome_feature.getByProteinLengthRange(500, 1000, {
  limit: 50,
  select: ['feature_id', 'gene', 'product', 'aa_length']
});

// Find features with specific GO terms
const dnaBindingProteins = await client.genome_feature.getByGoTerm('GO:0003677', {
  limit: 100,
  select: ['feature_id', 'gene', 'product', 'genome_id']
});
```

### HTTP Download for Large Datasets

```javascript
import { createClient } from 'bvbrc-solr-api';

const client = createClient();

// Download all E. coli genomes with HTTP download mode
const allEcoliGenomes = await client.genome.queryBy(
  { organism_name: 'Escherichia coli' },
  { 
    http_download: true,
    sort: 'genome_id',
    select: ['genome_id', 'genome_name', 'strain', 'genome_length']
  }
);

// Download all features from a specific genome
const allGenomeFeatures = await client.genome_feature.queryBy(
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