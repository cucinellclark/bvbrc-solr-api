define(['exports'], (function (exports) { 'use strict';

  const DEFAULT_BASE_URL = 'https://www.bv-brc.org/api';
  const DEFAULT_HEADERS = { 
    Accept: 'application/json',
    'Content-Type': 'application/rqlquery+x-www-form-urlencoded'
  };

  function createContext(overrides = {}) {
    const { baseUrl, headers } = overrides;
    return {
      baseUrl: baseUrl || DEFAULT_BASE_URL,
      headers: { ...DEFAULT_HEADERS, ...(headers || {}) },
    };
  }

  async function run(coreName, filter, options = {}, baseUrl, headers) {
    const { select, sort, limit, http_download = false } = options || {};

    // Validate that sort is provided when http_download is true
    if (http_download && !sort) {
      throw new Error('sort parameter is required when http_download is true');
    }

    // Set default limit to 1000 if not provided
    const finalLimit = Number.isInteger(limit) ? limit : 1000;

    const params = [];
    if (filter) params.push(filter);
    if (select && select.length) params.push(`select(${select.join(',')})`);
    if (sort) params.push(`sort(${sort})`);
    if (Number.isInteger(finalLimit)) params.push(`limit(${finalLimit})`);
    if (http_download) params.push('http_download=true');

    const url = `${(baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '')}/${coreName}/`;
    const body = params.join('&');
    console.log(url);
    console.log(headers);
    console.log('Request body:', body);
    const response = await fetch(url, { 
      method: 'POST',
      headers: headers || DEFAULT_HEADERS,
      body: body
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  const encode = (value) => {
    // Special handling for strand field - wrap + and - in backslash quotes
    if (typeof value === 'string' && (value === '+' || value === '-')) {
      return encodeURIComponent(`\"${value}\"`);
    }
    return encodeURIComponent(value);
  };

  function eq(fieldName, value) {
    return `eq(${fieldName},${encode(value)})`;
  }


  function gt(fieldName, value) {
    return `gt(${fieldName},${encode(value)})`;
  }

  function lt(fieldName, value) {
    return `lt(${fieldName},${encode(value)})`;
  }

  function andFilters(...parts) {
    const cleaned = parts.filter((p) => Boolean(p));
    return cleaned.length ? `and(${cleaned.join(',')})` : '';
  }

  function orFilters(...parts) {
    const cleaned = parts.filter((p) => Boolean(p));
    return cleaned.length ? `or(${cleaned.join(',')})` : '';
  }

  function inFilters(fieldName, values) {
    return values.length ? `in(${fieldName},${values.map(encode).join(',')})` : '';
  }

  function select(fields) {
    return fields && fields.length ? `select(${fields.join(',')})` : '';
  }

  function sort(sortExpr) {
    return sortExpr ? `sort(${sortExpr})` : '';
  }

  function limit(limitValue) {
    return Number.isInteger(limitValue) ? `limit(${limitValue})` : '';
  }

  function httpDownload(enable = false) {
    return enable ? 'http_download=true' : '';
  }

  function objToEq(filters = {}) {
    return Object.entries(filters).map(([key, value]) => eq(key, value));
  }

  function buildAndFrom(filters = {}) {
    return andFilters(...objToEq(filters));
  }

  const qb = {
    eq,
    gt,
    lt,
    and: andFilters,
    or: orFilters,
    in: inFilters,
    select,
    sort,
    limit,
    httpDownload,
    objToEq,
    buildAndFrom,
  };

  function genome(context) {
    const ctx = context;

    return {
      /**
       * Retrieve a genome data object by genome_id
       * @param {string} genomeId - The genome_id to search for
       * @param {Object} options - Additional options for the request
       * @returns {Promise<Object>} Genome data object
       */
      getById(genomeId, options = {}) {
        return run('genome', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Query genome data with filters
       * @param {Object} filters - Filter criteria
       * @param {Object} options - Additional options (select, sort, limit, etc.)
       * @returns {Promise<Array>} Array of genome data objects
       */
      queryBy(filters = {}, options = {}) {
        return run('genome', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by taxon ID
       * @param {number} taxonId - The taxon ID
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByTaxonId(taxonId, options = {}) {
        return run('genome', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by organism name (case insensitive)
       * @param {string} organismName - The organism name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByOrganismName(organismName, options = {}) {
        return run('genome', qb.eq('organism_name', organismName), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by genome name (case insensitive)
       * @param {string} genomeName - The genome name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByGenomeName(genomeName, options = {}) {
        return run('genome', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by strain name (case insensitive)
       * @param {string} strain - The strain name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByStrain(strain, options = {}) {
        return run('genome', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by species (case insensitive)
       * @param {string} species - The species name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getBySpecies(species, options = {}) {
        return run('genome', qb.eq('species', species), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by genus (case insensitive)
       * @param {string} genus - The genus name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByGenus(genus, options = {}) {
        return run('genome', qb.eq('genus', genus), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by family (case insensitive)
       * @param {string} family - The family name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByFamily(family, options = {}) {
        return run('genome', qb.eq('family', family), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by order (case insensitive)
       * @param {string} order - The order name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByOrder(order, options = {}) {
        return run('genome', qb.eq('order', order), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by class (case insensitive)
       * @param {string} className - The class name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByClass(className, options = {}) {
        return run('genome', qb.eq('class', className), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by phylum (case insensitive)
       * @param {string} phylum - The phylum name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByPhylum(phylum, options = {}) {
        return run('genome', qb.eq('phylum', phylum), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by kingdom (case insensitive)
       * @param {string} kingdom - The kingdom name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByKingdom(kingdom, options = {}) {
        return run('genome', qb.eq('kingdom', kingdom), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by superkingdom (case insensitive)
       * @param {string} superkingdom - The superkingdom name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getBySuperkingdom(superkingdom, options = {}) {
        return run('genome', qb.eq('superkingdom', superkingdom), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by genome status (case insensitive)
       * @param {string} genomeStatus - The genome status (e.g., 'Complete', 'Draft')
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByGenomeStatus(genomeStatus, options = {}) {
        return run('genome', qb.eq('genome_status', genomeStatus), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by genome quality (case insensitive)
       * @param {string} genomeQuality - The genome quality
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByGenomeQuality(genomeQuality, options = {}) {
        return run('genome', qb.eq('genome_quality', genomeQuality), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by assembly accession
       * @param {string} assemblyAccession - The assembly accession
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByAssemblyAccession(assemblyAccession, options = {}) {
        return run('genome', qb.eq('assembly_accession', assemblyAccession), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by bioproject accession
       * @param {string} bioprojectAccession - The bioproject accession
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByBioprojectAccession(bioprojectAccession, options = {}) {
        return run('genome', qb.eq('bioproject_accession', bioprojectAccession), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by biosample accession
       * @param {string} biosampleAccession - The biosample accession
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByBiosampleAccession(biosampleAccession, options = {}) {
        return run('genome', qb.eq('biosample_accession', biosampleAccession), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by SRA accession
       * @param {string} sraAccession - The SRA accession
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getBySraAccession(sraAccession, options = {}) {
        return run('genome', qb.eq('sra_accession', sraAccession), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by refseq accessions (case insensitive)
       * @param {string} refseqAccessions - The refseq accessions
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByRefseqAccessions(refseqAccessions, options = {}) {
        return run('genome', qb.eq('refseq_accessions', refseqAccessions), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by genbank accessions (case insensitive)
       * @param {string} genbankAccessions - The genbank accessions
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByGenbankAccessions(genbankAccessions, options = {}) {
        return run('genome', qb.eq('genbank_accessions', genbankAccessions), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by gram stain (case insensitive)
       * @param {string} gramStain - The gram stain (e.g., 'positive', 'negative')
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByGramStain(gramStain, options = {}) {
        return run('genome', qb.eq('gram_stain', gramStain), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by motility (case insensitive)
       * @param {string} motility - The motility type
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByMotility(motility, options = {}) {
        return run('genome', qb.eq('motility', motility), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by oxygen requirement (case insensitive)
       * @param {string} oxygenRequirement - The oxygen requirement
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByOxygenRequirement(oxygenRequirement, options = {}) {
        return run('genome', qb.eq('oxygen_requirement', oxygenRequirement), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by habitat (case insensitive)
       * @param {string} habitat - The habitat
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByHabitat(habitat, options = {}) {
        return run('genome', qb.eq('habitat', habitat), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by isolation country (case insensitive)
       * @param {string} isolationCountry - The isolation country
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByIsolationCountry(isolationCountry, options = {}) {
        return run('genome', qb.eq('isolation_country', isolationCountry), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by isolation source (case insensitive)
       * @param {string} isolationSource - The isolation source
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByIsolationSource(isolationSource, options = {}) {
        return run('genome', qb.eq('isolation_source', isolationSource), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by geographic location (case insensitive)
       * @param {string} geographicLocation - The geographic location
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByGeographicLocation(geographicLocation, options = {}) {
        return run('genome', qb.eq('geographic_location', geographicLocation), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by geographic group (case insensitive)
       * @param {string} geographicGroup - The geographic group
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByGeographicGroup(geographicGroup, options = {}) {
        return run('genome', qb.eq('geographic_group', geographicGroup), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by cell shape (case insensitive)
       * @param {string} cellShape - The cell shape
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByCellShape(cellShape, options = {}) {
        return run('genome', qb.eq('cell_shape', cellShape), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by sporulation (case insensitive)
       * @param {string} sporulation - The sporulation type
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getBySporulation(sporulation, options = {}) {
        return run('genome', qb.eq('sporulation', sporulation), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by optimal temperature (case insensitive)
       * @param {string} optimalTemperature - The optimal temperature
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByOptimalTemperature(optimalTemperature, options = {}) {
        return run('genome', qb.eq('optimal_temperature', optimalTemperature), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by temperature range (case insensitive)
       * @param {string} temperatureRange - The temperature range
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByTemperatureRange(temperatureRange, options = {}) {
        return run('genome', qb.eq('temperature_range', temperatureRange), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by salinity (case insensitive)
       * @param {string} salinity - The salinity
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getBySalinity(salinity, options = {}) {
        return run('genome', qb.eq('salinity', salinity), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by depth (case insensitive)
       * @param {string} depth - The depth
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByDepth(depth, options = {}) {
        return run('genome', qb.eq('depth', depth), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by altitude (case insensitive)
       * @param {string} altitude - The altitude
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByAltitude(altitude, options = {}) {
        return run('genome', qb.eq('altitude', altitude), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by type strain (case insensitive)
       * @param {string} typeStrain - The type strain
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByTypeStrain(typeStrain, options = {}) {
        return run('genome', qb.eq('type_strain', typeStrain), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by serovar (case insensitive)
       * @param {string} serovar - The serovar
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getBySerovar(serovar, options = {}) {
        return run('genome', qb.eq('serovar', serovar), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by pathovar (case insensitive)
       * @param {string} pathovar - The pathovar
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByPathovar(pathovar, options = {}) {
        return run('genome', qb.eq('pathovar', pathovar), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by biovar (case insensitive)
       * @param {string} biovar - The biovar
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByBiovar(biovar, options = {}) {
        return run('genome', qb.eq('biovar', biovar), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by clade
       * @param {string} clade - The clade
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByClade(clade, options = {}) {
        return run('genome', qb.eq('clade', clade), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by subclade
       * @param {string} subclade - The subclade
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getBySubclade(subclade, options = {}) {
        return run('genome', qb.eq('subclade', subclade), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by subtype
       * @param {string} subtype - The subtype
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getBySubtype(subtype, options = {}) {
        return run('genome', qb.eq('subtype', subtype), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by lineage
       * @param {string} lineage - The lineage
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByLineage(lineage, options = {}) {
        return run('genome', qb.eq('lineage', lineage), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by MLST (case insensitive)
       * @param {string} mlst - The MLST type
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByMlst(mlst, options = {}) {
        return run('genome', qb.eq('mlst', mlst), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by sequencing platform (case insensitive)
       * @param {string} sequencingPlatform - The sequencing platform
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getBySequencingPlatform(sequencingPlatform, options = {}) {
        return run('genome', qb.eq('sequencing_platform', sequencingPlatform), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by assembly method (case insensitive)
       * @param {string} assemblyMethod - The assembly method
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByAssemblyMethod(assemblyMethod, options = {}) {
        return run('genome', qb.eq('assembly_method', assemblyMethod), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by genome length range
       * @param {number} minLength - Minimum genome length
       * @param {number} maxLength - Maximum genome length
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByGenomeLengthRange(minLength, maxLength, options = {}) {
        const filters = [
          qb.gt('genome_length', minLength),
          qb.lt('genome_length', maxLength)
        ];
        return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by GC content range
       * @param {number} minGc - Minimum GC content
       * @param {number} maxGc - Maximum GC content
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByGcContentRange(minGc, maxGc, options = {}) {
        const filters = [
          qb.gt('gc_content', minGc),
          qb.lt('gc_content', maxGc)
        ];
        return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by CDS count range
       * @param {number} minCds - Minimum CDS count
       * @param {number} maxCds - Maximum CDS count
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByCdsCountRange(minCds, maxCds, options = {}) {
        const filters = [
          qb.gt('cds', minCds),
          qb.lt('cds', maxCds)
        ];
        return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by contig count range
       * @param {number} minContigs - Minimum contig count
       * @param {number} maxContigs - Maximum contig count
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByContigCountRange(minContigs, maxContigs, options = {}) {
        const filters = [
          qb.gt('contigs', minContigs),
          qb.lt('contigs', maxContigs)
        ];
        return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by collection year range
       * @param {number} startYear - Start year
       * @param {number} endYear - End year
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByCollectionYearRange(startYear, endYear, options = {}) {
        const filters = [
          qb.gt('collection_year', startYear),
          qb.lt('collection_year', endYear)
        ];
        return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by date range
       * @param {string} startDate - Start date (YYYY-MM-DD format)
       * @param {string} endDate - End date (YYYY-MM-DD format)
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByDateRange(startDate, endDate, options = {}) {
        const filters = [
          qb.gt('date_inserted', startDate),
          qb.lt('date_inserted', endDate)
        ];
        return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genomes by public status
       * @param {boolean} isPublic - Public status
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome data objects
       */
      getByPublicStatus(isPublic, options = {}) {
        return run('genome', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get all genomes with pagination
       * @param {Object} options - Options including limit and offset
       * @returns {Promise<Array>} Array of genome data objects
       */
      getAll(options = {}) {
        return run('genome', '', options, ctx.baseUrl, ctx.headers);
      }
    };
  }

  function genomeFeature(context) {
    const ctx = context;

    return {
      /**
       * Retrieve a genome_feature data object by feature_id
       * @param {string} featureId - The feature_id to search for
       * @param {Object} options - Additional options for the request
       * @returns {Promise<Object>} Genome feature data object
       */
      getById(featureId, options = {}) {
        return run('genome_feature', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Query genome_feature data with filters
       * @param {Object} filters - Filter criteria
       * @param {Object} options - Additional options (select, sort, limit, etc.)
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      queryBy(filters = {}, options = {}) {
        return run('genome_feature', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by genome ID
       * @param {string} genomeId - The genome ID
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByGenomeId(genomeId, options = {}) {
        return run('genome_feature', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by genome name (case insensitive)
       * @param {string} genomeName - The genome name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByGenomeName(genomeName, options = {}) {
        return run('genome_feature', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by gene name (case insensitive)
       * @param {string} geneName - The gene name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByGene(geneName, options = {}) {
        return run('genome_feature', qb.eq('gene', geneName), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by product name (case insensitive)
       * @param {string} productName - The product name
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByProduct(productName, options = {}) {
        return run('genome_feature', qb.eq('product', productName), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by feature type
       * @param {string} featureType - The feature type (e.g., 'CDS', 'tRNA', 'rRNA')
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByFeatureType(featureType, options = {}) {
        return run('genome_feature', qb.eq('feature_type', featureType), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by annotation type
       * @param {string} annotationType - The annotation type (e.g., 'PATRIC', 'RefSeq')
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByAnnotation(annotationType, options = {}) {
        return run('genome_feature', qb.eq('annotation', annotationType), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by PATRIC ID
       * @param {string} patricId - The PATRIC ID
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByPatricId(patricId, options = {}) {
        return run('genome_feature', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by protein ID
       * @param {string} proteinId - The protein ID
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByProteinId(proteinId, options = {}) {
        return run('genome_feature', qb.eq('protein_id', proteinId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by accession
       * @param {string} accession - The accession number
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByAccession(accession, options = {}) {
        return run('genome_feature', qb.eq('accession', accession), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by UniProtKB accession
       * @param {string} uniprotAccession - The UniProtKB accession
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByUniprotAccession(uniprotAccession, options = {}) {
        return run('genome_feature', qb.eq('uniprotkb_accession', uniprotAccession), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by FIGfam ID
       * @param {string} figfamId - The FIGfam ID
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByFigfamId(figfamId, options = {}) {
        return run('genome_feature', qb.eq('figfam_id', figfamId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by PGFam ID
       * @param {string} pgfamId - The PGFam ID
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByPgfamId(pgfamId, options = {}) {
        return run('genome_feature', qb.eq('pgfam_id', pgfamId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by PLfam ID
       * @param {string} plfamId - The PLfam ID
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByPlfamId(plfamId, options = {}) {
        return run('genome_feature', qb.eq('plfam_id', plfamId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by GO term (case insensitive)
       * @param {string} goTerm - The GO term
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByGoTerm(goTerm, options = {}) {
        return run('genome_feature', qb.eq('go', goTerm), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by strand
       * @param {string} strand - The strand ('+' or '-')
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByStrand(strand, options = {}) {
        return run('genome_feature', qb.eq('strand', strand), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by location range
       * @param {number} start - Start position
       * @param {number} end - End position
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByLocationRange(start, end, options = {}) {
        const filters = [
          qb.gt('start', start),
          qb.lt('end', end)
        ];
        return run('genome_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by sequence length range
       * @param {number} minLength - Minimum sequence length
       * @param {number} maxLength - Maximum sequence length
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getBySequenceLengthRange(minLength, maxLength, options = {}) {
        const filters = [
          qb.gt('na_length', minLength),
          qb.lt('na_length', maxLength)
        ];
        return run('genome_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by protein length range
       * @param {number} minLength - Minimum protein length
       * @param {number} maxLength - Maximum protein length
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByProteinLengthRange(minLength, maxLength, options = {}) {
        const filters = [
          qb.gt('aa_length', minLength),
          qb.lt('aa_length', maxLength)
        ];
        return run('genome_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by classifier score range
       * @param {number} minScore - Minimum classifier score
       * @param {number} maxScore - Maximum classifier score
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByClassifierScoreRange(minScore, maxScore, options = {}) {
        const filters = [
          qb.gt('classifier_score', minScore),
          qb.lt('classifier_score', maxScore)
        ];
        return run('genome_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by date range
       * @param {string} startDate - Start date (YYYY-MM-DD format)
       * @param {string} endDate - End date (YYYY-MM-DD format)
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByDateRange(startDate, endDate, options = {}) {
        const filters = [
          qb.gt('date_inserted', startDate),
          qb.lt('date_inserted', endDate)
        ];
        return run('genome_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by public status
       * @param {boolean} isPublic - Public status
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByPublicStatus(isPublic, options = {}) {
        return run('genome_feature', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by taxon ID
       * @param {number} taxonId - The taxon ID
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getByTaxonId(taxonId, options = {}) {
        return run('genome_feature', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get genome features by sequence ID
       * @param {string} sequenceId - The sequence ID
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getBySequenceId(sequenceId, options = {}) {
        return run('genome_feature', qb.eq('sequence_id', sequenceId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get all genome features with pagination
       * @param {Object} options - Options including limit and offset
       * @returns {Promise<Array>} Array of genome feature data objects
       */
      getAll(options = {}) {
        return run('genome_feature', '', options, ctx.baseUrl, ctx.headers);
      }
    };
  }

  function antibiotics(context) {
    const ctx = context;

    return {
      /**
       * Retrieve antibiotics data by pubchem_cid
       * @param {string} pubchemCid - The pubchem_cid to search for
       * @param {Object} options - Additional options for the request
       * @returns {Promise<Object>} Antibiotics data object
       */
      getByPubchemCid(pubchemCid, options = {}) {
        return run('antibiotics', qb.eq('pubchem_cid', pubchemCid), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Query antibiotics data with filters
       * @param {Object} filters - Filter criteria
       * @param {Object} options - Additional options (select, sort, limit, etc.)
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      queryBy(filters = {}, options = {}) {
        return run('antibiotics', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Search antibiotics by keyword
       * @param {string} keyword - Keyword to search for
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      searchByKeyword(keyword, options = {}) {
        return run('antibiotics', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get antibiotics by antibiotic name
       * @param {string} antibioticName - Name of the antibiotic
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      getByAntibioticName(antibioticName, options = {}) {
        return run('antibiotics', qb.eq('antibiotic_name', antibioticName), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get antibiotics by CAS ID
       * @param {string} casId - CAS ID of the antibiotic
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      getByCasId(casId, options = {}) {
        return run('antibiotics', qb.eq('cas_id', casId), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get antibiotics by molecular formula
       * @param {string} molecularFormula - Molecular formula
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      getByMolecularFormula(molecularFormula, options = {}) {
        return run('antibiotics', qb.eq('molecular_formula', molecularFormula), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get antibiotics by ATC classification
       * @param {string} atcClassification - ATC classification code
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      getByAtcClassification(atcClassification, options = {}) {
        return run('antibiotics', qb.eq('atc_classification', atcClassification), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get antibiotics by mechanism of action
       * @param {string} mechanismOfAction - Mechanism of action
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      getByMechanismOfAction(mechanismOfAction, options = {}) {
        return run('antibiotics', qb.eq('mechanism_of_action', mechanismOfAction), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get antibiotics by pharmacological class
       * @param {string} pharmacologicalClass - Pharmacological class
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      getByPharmacologicalClass(pharmacologicalClass, options = {}) {
        return run('antibiotics', qb.eq('pharmacological_classes', pharmacologicalClass), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get antibiotics by synonym
       * @param {string} synonym - Synonym of the antibiotic
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      getBySynonym(synonym, options = {}) {
        return run('antibiotics', qb.eq('synonyms', synonym), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get antibiotics by molecular weight range
       * @param {number} minWeight - Minimum molecular weight
       * @param {number} maxWeight - Maximum molecular weight
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      getByMolecularWeightRange(minWeight, maxWeight, options = {}) {
        const filters = [
          qb.gt('molecular_weight', minWeight),
          qb.lt('molecular_weight', maxWeight)
        ];
        return run('antibiotics', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get antibiotics by date range
       * @param {string} startDate - Start date (YYYY-MM-DD format)
       * @param {string} endDate - End date (YYYY-MM-DD format)
       * @param {Object} options - Additional options
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      getByDateRange(startDate, endDate, options = {}) {
        const filters = [
          qb.gt('date_inserted', startDate),
          qb.lt('date_inserted', endDate)
        ];
        return run('antibiotics', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
      },

      /**
       * Get all antibiotics with pagination
       * @param {Object} options - Options including limit and offset
       * @returns {Promise<Array>} Array of antibiotics data objects
       */
      getAll(options = {}) {
        return run('antibiotics', '', options, ctx.baseUrl, ctx.headers);
      }
    };
  }

  // Public entry: client factory + backward compatible helpers

  // Factory client to access all resources with custom context
  function createClient(contextOverrides = {}) {
    const ctx = createContext(contextOverrides);
    return {
      genome: genome(ctx),
      genome_feature: genomeFeature(ctx),
      antibiotics: antibiotics(ctx),
    };
  }

  // Default client used by convenience functions
  const defaultClient = createClient();

  // Backward compatible convenience exports
  function getGenome(id, options = {}) {
    return defaultClient.genome.getById(id, options);
  }

  function queryGenomeBy(filters = {}, options = {}) {
    return defaultClient.genome.queryBy(filters, options);
  }

  // Genome convenience functions
  function getGenomeByTaxonId(taxonId, options = {}) {
    return defaultClient.genome.getByTaxonId(taxonId, options);
  }

  function getGenomeByOrganismName(organismName, options = {}) {
    return defaultClient.genome.getByOrganismName(organismName, options);
  }

  function getGenomeByGenomeName(genomeName, options = {}) {
    return defaultClient.genome.getByGenomeName(genomeName, options);
  }

  function getGenomeByStrain(strain, options = {}) {
    return defaultClient.genome.getByStrain(strain, options);
  }

  function getGenomeBySpecies(species, options = {}) {
    return defaultClient.genome.getBySpecies(species, options);
  }

  function getGenomeByGenus(genus, options = {}) {
    return defaultClient.genome.getByGenus(genus, options);
  }

  function getGenomeByFamily(family, options = {}) {
    return defaultClient.genome.getByFamily(family, options);
  }

  function getGenomeByOrder(order, options = {}) {
    return defaultClient.genome.getByOrder(order, options);
  }

  function getGenomeByClass(className, options = {}) {
    return defaultClient.genome.getByClass(className, options);
  }

  function getGenomeByPhylum(phylum, options = {}) {
    return defaultClient.genome.getByPhylum(phylum, options);
  }

  function getGenomeByKingdom(kingdom, options = {}) {
    return defaultClient.genome.getByKingdom(kingdom, options);
  }

  function getGenomeBySuperkingdom(superkingdom, options = {}) {
    return defaultClient.genome.getBySuperkingdom(superkingdom, options);
  }

  function getGenomeByGenomeStatus(genomeStatus, options = {}) {
    return defaultClient.genome.getByGenomeStatus(genomeStatus, options);
  }

  function getGenomeByGenomeQuality(genomeQuality, options = {}) {
    return defaultClient.genome.getByGenomeQuality(genomeQuality, options);
  }

  function getGenomeByAssemblyAccession(assemblyAccession, options = {}) {
    return defaultClient.genome.getByAssemblyAccession(assemblyAccession, options);
  }

  function getGenomeByBioprojectAccession(bioprojectAccession, options = {}) {
    return defaultClient.genome.getByBioprojectAccession(bioprojectAccession, options);
  }

  function getGenomeByBiosampleAccession(biosampleAccession, options = {}) {
    return defaultClient.genome.getByBiosampleAccession(biosampleAccession, options);
  }

  function getGenomeBySraAccession(sraAccession, options = {}) {
    return defaultClient.genome.getBySraAccession(sraAccession, options);
  }

  function getGenomeByRefseqAccessions(refseqAccessions, options = {}) {
    return defaultClient.genome.getByRefseqAccessions(refseqAccessions, options);
  }

  function getGenomeByGenbankAccessions(genbankAccessions, options = {}) {
    return defaultClient.genome.getByGenbankAccessions(genbankAccessions, options);
  }

  function getGenomeByGramStain(gramStain, options = {}) {
    return defaultClient.genome.getByGramStain(gramStain, options);
  }

  function getGenomeByMotility(motility, options = {}) {
    return defaultClient.genome.getByMotility(motility, options);
  }

  function getGenomeByOxygenRequirement(oxygenRequirement, options = {}) {
    return defaultClient.genome.getByOxygenRequirement(oxygenRequirement, options);
  }

  function getGenomeByHabitat(habitat, options = {}) {
    return defaultClient.genome.getByHabitat(habitat, options);
  }

  function getGenomeByIsolationCountry(isolationCountry, options = {}) {
    return defaultClient.genome.getByIsolationCountry(isolationCountry, options);
  }

  function getGenomeByIsolationSource(isolationSource, options = {}) {
    return defaultClient.genome.getByIsolationSource(isolationSource, options);
  }

  function getGenomeByGeographicLocation(geographicLocation, options = {}) {
    return defaultClient.genome.getByGeographicLocation(geographicLocation, options);
  }

  function getGenomeByGeographicGroup(geographicGroup, options = {}) {
    return defaultClient.genome.getByGeographicGroup(geographicGroup, options);
  }

  function getGenomeByCellShape(cellShape, options = {}) {
    return defaultClient.genome.getByCellShape(cellShape, options);
  }

  function getGenomeBySporulation(sporulation, options = {}) {
    return defaultClient.genome.getBySporulation(sporulation, options);
  }

  function getGenomeByOptimalTemperature(optimalTemperature, options = {}) {
    return defaultClient.genome.getByOptimalTemperature(optimalTemperature, options);
  }

  function getGenomeByTemperatureRange(temperatureRange, options = {}) {
    return defaultClient.genome.getByTemperatureRange(temperatureRange, options);
  }

  function getGenomeBySalinity(salinity, options = {}) {
    return defaultClient.genome.getBySalinity(salinity, options);
  }

  function getGenomeByDepth(depth, options = {}) {
    return defaultClient.genome.getByDepth(depth, options);
  }

  function getGenomeByAltitude(altitude, options = {}) {
    return defaultClient.genome.getByAltitude(altitude, options);
  }

  function getGenomeByTypeStrain(typeStrain, options = {}) {
    return defaultClient.genome.getByTypeStrain(typeStrain, options);
  }

  function getGenomeBySerovar(serovar, options = {}) {
    return defaultClient.genome.getBySerovar(serovar, options);
  }

  function getGenomeByPathovar(pathovar, options = {}) {
    return defaultClient.genome.getByPathovar(pathovar, options);
  }

  function getGenomeByBiovar(biovar, options = {}) {
    return defaultClient.genome.getByBiovar(biovar, options);
  }

  function getGenomeByClade(clade, options = {}) {
    return defaultClient.genome.getByClade(clade, options);
  }

  function getGenomeBySubclade(subclade, options = {}) {
    return defaultClient.genome.getBySubclade(subclade, options);
  }

  function getGenomeBySubtype(subtype, options = {}) {
    return defaultClient.genome.getBySubtype(subtype, options);
  }

  function getGenomeByLineage(lineage, options = {}) {
    return defaultClient.genome.getByLineage(lineage, options);
  }

  function getGenomeByMlst(mlst, options = {}) {
    return defaultClient.genome.getByMlst(mlst, options);
  }

  function getGenomeBySequencingPlatform(sequencingPlatform, options = {}) {
    return defaultClient.genome.getBySequencingPlatform(sequencingPlatform, options);
  }

  function getGenomeByAssemblyMethod(assemblyMethod, options = {}) {
    return defaultClient.genome.getByAssemblyMethod(assemblyMethod, options);
  }

  function getGenomeByGenomeLengthRange(minLength, maxLength, options = {}) {
    return defaultClient.genome.getByGenomeLengthRange(minLength, maxLength, options);
  }

  function getGenomeByGcContentRange(minGc, maxGc, options = {}) {
    return defaultClient.genome.getByGcContentRange(minGc, maxGc, options);
  }

  function getGenomeByCdsCountRange(minCds, maxCds, options = {}) {
    return defaultClient.genome.getByCdsCountRange(minCds, maxCds, options);
  }

  function getGenomeByContigCountRange(minContigs, maxContigs, options = {}) {
    return defaultClient.genome.getByContigCountRange(minContigs, maxContigs, options);
  }

  function getGenomeByCollectionYearRange(startYear, endYear, options = {}) {
    return defaultClient.genome.getByCollectionYearRange(startYear, endYear, options);
  }

  function getGenomeByDateRange(startDate, endDate, options = {}) {
    return defaultClient.genome.getByDateRange(startDate, endDate, options);
  }

  function getGenomeByPublicStatus(isPublic, options = {}) {
    return defaultClient.genome.getByPublicStatus(isPublic, options);
  }

  function getAllGenomes(options = {}) {
    return defaultClient.genome.getAll(options);
  }

  function getGenomeFeature(id, options = {}) {
    return defaultClient.genome_feature.getById(id, options);
  }

  function queryGenomeFeatureBy(filters = {}, options = {}) {
    return defaultClient.genome_feature.queryBy(filters, options);
  }

  // Genome Feature convenience functions
  function getGenomeFeatureByGenomeId(genomeId, options = {}) {
    return defaultClient.genome_feature.getByGenomeId(genomeId, options);
  }

  function getGenomeFeatureByGenomeName(genomeName, options = {}) {
    return defaultClient.genome_feature.getByGenomeName(genomeName, options);
  }

  function getGenomeFeatureByGene(geneName, options = {}) {
    return defaultClient.genome_feature.getByGene(geneName, options);
  }

  function getGenomeFeatureByProduct(productName, options = {}) {
    return defaultClient.genome_feature.getByProduct(productName, options);
  }

  function getGenomeFeatureByFeatureType(featureType, options = {}) {
    return defaultClient.genome_feature.getByFeatureType(featureType, options);
  }

  function getGenomeFeatureByAnnotation(annotationType, options = {}) {
    return defaultClient.genome_feature.getByAnnotation(annotationType, options);
  }

  function getGenomeFeatureByPatricId(patricId, options = {}) {
    return defaultClient.genome_feature.getByPatricId(patricId, options);
  }

  function getGenomeFeatureByProteinId(proteinId, options = {}) {
    return defaultClient.genome_feature.getByProteinId(proteinId, options);
  }

  function getGenomeFeatureByAccession(accession, options = {}) {
    return defaultClient.genome_feature.getByAccession(accession, options);
  }

  function getGenomeFeatureByUniprotAccession(uniprotAccession, options = {}) {
    return defaultClient.genome_feature.getByUniprotAccession(uniprotAccession, options);
  }

  function getGenomeFeatureByGoTerm(goTerm, options = {}) {
    return defaultClient.genome_feature.getByGoTerm(goTerm, options);
  }

  function getGenomeFeatureByStrand(strand, options = {}) {
    return defaultClient.genome_feature.getByStrand(strand, options);
  }

  function getGenomeFeatureByLocationRange(start, end, options = {}) {
    return defaultClient.genome_feature.getByLocationRange(start, end, options);
  }

  function getGenomeFeatureBySequenceLengthRange(minLength, maxLength, options = {}) {
    return defaultClient.genome_feature.getBySequenceLengthRange(minLength, maxLength, options);
  }

  function getGenomeFeatureByProteinLengthRange(minLength, maxLength, options = {}) {
    return defaultClient.genome_feature.getByProteinLengthRange(minLength, maxLength, options);
  }

  function getGenomeFeatureByPublicStatus(isPublic, options = {}) {
    return defaultClient.genome_feature.getByPublicStatus(isPublic, options);
  }

  function getAllGenomeFeatures(options = {}) {
    return defaultClient.genome_feature.getAll(options);
  }

  // Antibiotics convenience functions
  function getAntibiotic(pubchemCid, options = {}) {
    return defaultClient.antibiotics.getByPubchemCid(pubchemCid, options);
  }

  function queryAntibioticsBy(filters = {}, options = {}) {
    return defaultClient.antibiotics.queryBy(filters, options);
  }

  function searchAntibioticsByKeyword(keyword, options = {}) {
    return defaultClient.antibiotics.searchByKeyword(keyword, options);
  }

  function getAntibioticByName(antibioticName, options = {}) {
    return defaultClient.antibiotics.getByAntibioticName(antibioticName, options);
  }

  function getAntibioticByCasId(casId, options = {}) {
    return defaultClient.antibiotics.getByCasId(casId, options);
  }

  function getAntibioticByMolecularFormula(molecularFormula, options = {}) {
    return defaultClient.antibiotics.getByMolecularFormula(molecularFormula, options);
  }

  function getAntibioticByAtcClassification(atcClassification, options = {}) {
    return defaultClient.antibiotics.getByAtcClassification(atcClassification, options);
  }

  function getAntibioticByMechanismOfAction(mechanismOfAction, options = {}) {
    return defaultClient.antibiotics.getByMechanismOfAction(mechanismOfAction, options);
  }

  function getAntibioticByPharmacologicalClass(pharmacologicalClass, options = {}) {
    return defaultClient.antibiotics.getByPharmacologicalClass(pharmacologicalClass, options);
  }

  function getAntibioticBySynonym(synonym, options = {}) {
    return defaultClient.antibiotics.getBySynonym(synonym, options);
  }

  function getAllAntibiotics(options = {}) {
    return defaultClient.antibiotics.getAll(options);
  }
  async function query(core, filter = '', options = {}) {
    const ctx = createContext();
    return run(core, filter, options, ctx.baseUrl, ctx.headers);
  }

  var index = {
    createClient,
    getGenome,
    queryGenomeBy,
    getGenomeByTaxonId,
    getGenomeByOrganismName,
    getGenomeByGenomeName,
    getGenomeByStrain,
    getGenomeBySpecies,
    getGenomeByGenus,
    getGenomeByFamily,
    getGenomeByOrder,
    getGenomeByClass,
    getGenomeByPhylum,
    getGenomeByKingdom,
    getGenomeBySuperkingdom,
    getGenomeByGenomeStatus,
    getGenomeByGenomeQuality,
    getGenomeByAssemblyAccession,
    getGenomeByBioprojectAccession,
    getGenomeByBiosampleAccession,
    getGenomeBySraAccession,
    getGenomeByRefseqAccessions,
    getGenomeByGenbankAccessions,
    getGenomeByGramStain,
    getGenomeByMotility,
    getGenomeByOxygenRequirement,
    getGenomeByHabitat,
    getGenomeByIsolationCountry,
    getGenomeByIsolationSource,
    getGenomeByGeographicLocation,
    getGenomeByGeographicGroup,
    getGenomeByCellShape,
    getGenomeBySporulation,
    getGenomeByOptimalTemperature,
    getGenomeByTemperatureRange,
    getGenomeBySalinity,
    getGenomeByDepth,
    getGenomeByAltitude,
    getGenomeByTypeStrain,
    getGenomeBySerovar,
    getGenomeByPathovar,
    getGenomeByBiovar,
    getGenomeByClade,
    getGenomeBySubclade,
    getGenomeBySubtype,
    getGenomeByLineage,
    getGenomeByMlst,
    getGenomeBySequencingPlatform,
    getGenomeByAssemblyMethod,
    getGenomeByGenomeLengthRange,
    getGenomeByGcContentRange,
    getGenomeByCdsCountRange,
    getGenomeByContigCountRange,
    getGenomeByCollectionYearRange,
    getGenomeByDateRange,
    getGenomeByPublicStatus,
    getAllGenomes,
    getGenomeFeature,
    queryGenomeFeatureBy,
    getGenomeFeatureByGenomeId,
    getGenomeFeatureByGenomeName,
    getGenomeFeatureByGene,
    getGenomeFeatureByProduct,
    getGenomeFeatureByFeatureType,
    getGenomeFeatureByAnnotation,
    getGenomeFeatureByPatricId,
    getGenomeFeatureByProteinId,
    getGenomeFeatureByAccession,
    getGenomeFeatureByUniprotAccession,
    getGenomeFeatureByGoTerm,
    getGenomeFeatureByStrand,
    getGenomeFeatureByLocationRange,
    getGenomeFeatureBySequenceLengthRange,
    getGenomeFeatureByProteinLengthRange,
    getGenomeFeatureByPublicStatus,
    getAllGenomeFeatures,
    getAntibiotic,
    queryAntibioticsBy,
    searchAntibioticsByKeyword,
    getAntibioticByName,
    getAntibioticByCasId,
    getAntibioticByMolecularFormula,
    getAntibioticByAtcClassification,
    getAntibioticByMechanismOfAction,
    getAntibioticByPharmacologicalClass,
    getAntibioticBySynonym,
    getAllAntibiotics,
    query,
  };

  exports.createClient = createClient;
  exports.default = index;
  exports.getAllAntibiotics = getAllAntibiotics;
  exports.getAllGenomeFeatures = getAllGenomeFeatures;
  exports.getAllGenomes = getAllGenomes;
  exports.getAntibiotic = getAntibiotic;
  exports.getAntibioticByAtcClassification = getAntibioticByAtcClassification;
  exports.getAntibioticByCasId = getAntibioticByCasId;
  exports.getAntibioticByMechanismOfAction = getAntibioticByMechanismOfAction;
  exports.getAntibioticByMolecularFormula = getAntibioticByMolecularFormula;
  exports.getAntibioticByName = getAntibioticByName;
  exports.getAntibioticByPharmacologicalClass = getAntibioticByPharmacologicalClass;
  exports.getAntibioticBySynonym = getAntibioticBySynonym;
  exports.getGenome = getGenome;
  exports.getGenomeByAltitude = getGenomeByAltitude;
  exports.getGenomeByAssemblyAccession = getGenomeByAssemblyAccession;
  exports.getGenomeByAssemblyMethod = getGenomeByAssemblyMethod;
  exports.getGenomeByBioprojectAccession = getGenomeByBioprojectAccession;
  exports.getGenomeByBiosampleAccession = getGenomeByBiosampleAccession;
  exports.getGenomeByBiovar = getGenomeByBiovar;
  exports.getGenomeByCdsCountRange = getGenomeByCdsCountRange;
  exports.getGenomeByCellShape = getGenomeByCellShape;
  exports.getGenomeByClade = getGenomeByClade;
  exports.getGenomeByClass = getGenomeByClass;
  exports.getGenomeByCollectionYearRange = getGenomeByCollectionYearRange;
  exports.getGenomeByContigCountRange = getGenomeByContigCountRange;
  exports.getGenomeByDateRange = getGenomeByDateRange;
  exports.getGenomeByDepth = getGenomeByDepth;
  exports.getGenomeByFamily = getGenomeByFamily;
  exports.getGenomeByGcContentRange = getGenomeByGcContentRange;
  exports.getGenomeByGenbankAccessions = getGenomeByGenbankAccessions;
  exports.getGenomeByGenomeLengthRange = getGenomeByGenomeLengthRange;
  exports.getGenomeByGenomeName = getGenomeByGenomeName;
  exports.getGenomeByGenomeQuality = getGenomeByGenomeQuality;
  exports.getGenomeByGenomeStatus = getGenomeByGenomeStatus;
  exports.getGenomeByGenus = getGenomeByGenus;
  exports.getGenomeByGeographicGroup = getGenomeByGeographicGroup;
  exports.getGenomeByGeographicLocation = getGenomeByGeographicLocation;
  exports.getGenomeByGramStain = getGenomeByGramStain;
  exports.getGenomeByHabitat = getGenomeByHabitat;
  exports.getGenomeByIsolationCountry = getGenomeByIsolationCountry;
  exports.getGenomeByIsolationSource = getGenomeByIsolationSource;
  exports.getGenomeByKingdom = getGenomeByKingdom;
  exports.getGenomeByLineage = getGenomeByLineage;
  exports.getGenomeByMlst = getGenomeByMlst;
  exports.getGenomeByMotility = getGenomeByMotility;
  exports.getGenomeByOptimalTemperature = getGenomeByOptimalTemperature;
  exports.getGenomeByOrder = getGenomeByOrder;
  exports.getGenomeByOrganismName = getGenomeByOrganismName;
  exports.getGenomeByOxygenRequirement = getGenomeByOxygenRequirement;
  exports.getGenomeByPathovar = getGenomeByPathovar;
  exports.getGenomeByPhylum = getGenomeByPhylum;
  exports.getGenomeByPublicStatus = getGenomeByPublicStatus;
  exports.getGenomeByRefseqAccessions = getGenomeByRefseqAccessions;
  exports.getGenomeBySalinity = getGenomeBySalinity;
  exports.getGenomeBySequencingPlatform = getGenomeBySequencingPlatform;
  exports.getGenomeBySerovar = getGenomeBySerovar;
  exports.getGenomeBySpecies = getGenomeBySpecies;
  exports.getGenomeBySporulation = getGenomeBySporulation;
  exports.getGenomeBySraAccession = getGenomeBySraAccession;
  exports.getGenomeByStrain = getGenomeByStrain;
  exports.getGenomeBySubclade = getGenomeBySubclade;
  exports.getGenomeBySubtype = getGenomeBySubtype;
  exports.getGenomeBySuperkingdom = getGenomeBySuperkingdom;
  exports.getGenomeByTaxonId = getGenomeByTaxonId;
  exports.getGenomeByTemperatureRange = getGenomeByTemperatureRange;
  exports.getGenomeByTypeStrain = getGenomeByTypeStrain;
  exports.getGenomeFeature = getGenomeFeature;
  exports.getGenomeFeatureByAccession = getGenomeFeatureByAccession;
  exports.getGenomeFeatureByAnnotation = getGenomeFeatureByAnnotation;
  exports.getGenomeFeatureByFeatureType = getGenomeFeatureByFeatureType;
  exports.getGenomeFeatureByGene = getGenomeFeatureByGene;
  exports.getGenomeFeatureByGenomeId = getGenomeFeatureByGenomeId;
  exports.getGenomeFeatureByGenomeName = getGenomeFeatureByGenomeName;
  exports.getGenomeFeatureByGoTerm = getGenomeFeatureByGoTerm;
  exports.getGenomeFeatureByLocationRange = getGenomeFeatureByLocationRange;
  exports.getGenomeFeatureByPatricId = getGenomeFeatureByPatricId;
  exports.getGenomeFeatureByProduct = getGenomeFeatureByProduct;
  exports.getGenomeFeatureByProteinId = getGenomeFeatureByProteinId;
  exports.getGenomeFeatureByProteinLengthRange = getGenomeFeatureByProteinLengthRange;
  exports.getGenomeFeatureByPublicStatus = getGenomeFeatureByPublicStatus;
  exports.getGenomeFeatureBySequenceLengthRange = getGenomeFeatureBySequenceLengthRange;
  exports.getGenomeFeatureByStrand = getGenomeFeatureByStrand;
  exports.getGenomeFeatureByUniprotAccession = getGenomeFeatureByUniprotAccession;
  exports.query = query;
  exports.queryAntibioticsBy = queryAntibioticsBy;
  exports.queryGenomeBy = queryGenomeBy;
  exports.queryGenomeFeatureBy = queryGenomeFeatureBy;
  exports.searchAntibioticsByKeyword = searchAntibioticsByKeyword;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
