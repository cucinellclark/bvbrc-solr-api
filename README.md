# BV-BRC Solr API

A lightweight JavaScript client for interacting with [BV-BRC](https://www.bv-brc.org/) (Bacterial and Viral Bioinformatics Resource Center) Solr endpoints. This library provides a simple interface to query genomic data, features, and antibiotic information from the BV-BRC database.

## Features

- 🚀 **Lightweight**: Minimal dependencies, tiny footprint
- 🔧 **Dual Build**: Available as both AMD and ESM modules for maximum compatibility
- 🌐 **Universal**: Works in browsers, Node.js, and Dojo environments
- 📊 **Rich API**: Access genomes, features, and antibiotic data with simple functions
- 🔍 **Flexible Querying**: Support for filtering, sorting, field selection, and limiting results

## Installation

```bash
npm install bvbrc-solr-api
```

## Usage

### ES Modules (Node.js 18+, Modern Browsers)

```javascript
import { getGenome, queryGenomeBy, getGenomeFeature, queryGenomeFeatureBy, getAntibiotic } from 'bvbrc-solr-api';

// Get a specific genome by ID
const ecoli = await getGenome('208964.12');
console.log(ecoli[0].genome_name);

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
  - `limit` (number): Maximum number of results
  - `select` (array): Fields to include in response
  - `sort` (string): Sort field and direction

```javascript
const results = await query('genome', 'eq(genome_id,208964.12)', {
  limit: 10,
  select: ['genome_name', 'organism_name'],
  sort: 'genome_name'
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
│   └── bvbrcApiCore.js     # Main source file
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
import { queryGenomeFeatureBy } from 'bvbrc-solr-api';

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