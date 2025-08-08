import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function genome(context) {
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

export default genome;

