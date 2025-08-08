import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function serology(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a serology data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Serology data object
     */
    getById(id, options = {}) {
      return run('serology', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query serology data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of serology data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('serology', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by additional metadata
     * @param {string} additionalMetadata - The additional metadata
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByAdditionalMetadata(additionalMetadata, options = {}) {
      return run('serology', qb.eq('additional_metadata', additionalMetadata), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by collection city (case insensitive)
     * @param {string} collectionCity - The collection city
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByCollectionCity(collectionCity, options = {}) {
      return run('serology', qb.eq('collection_city', collectionCity), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by collection country (case insensitive)
     * @param {string} collectionCountry - The collection country
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByCollectionCountry(collectionCountry, options = {}) {
      return run('serology', qb.eq('collection_country', collectionCountry), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by collection state (case insensitive)
     * @param {string} collectionState - The collection state
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByCollectionState(collectionState, options = {}) {
      return run('serology', qb.eq('collection_state', collectionState), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by collection year (case insensitive)
     * @param {string} collectionYear - The collection year
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByCollectionYear(collectionYear, options = {}) {
      return run('serology', qb.eq('collection_year', collectionYear), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by comments
     * @param {string} comments - The comments
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByComments(comments, options = {}) {
      return run('serology', qb.eq('comments', comments), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by contributing institution (case insensitive)
     * @param {string} contributingInstitution - The contributing institution
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByContributingInstitution(contributingInstitution, options = {}) {
      return run('serology', qb.eq('contributing_institution', contributingInstitution), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by GenBank accession
     * @param {string} genbankAccession - The GenBank accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByGenbankAccession(genbankAccession, options = {}) {
      return run('serology', qb.eq('genbank_accession', genbankAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by geographic group (case insensitive)
     * @param {string} geographicGroup - The geographic group
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByGeographicGroup(geographicGroup, options = {}) {
      return run('serology', qb.eq('geographic_group', geographicGroup), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host age (case insensitive)
     * @param {string} hostAge - The host age
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostAge(hostAge, options = {}) {
      return run('serology', qb.eq('host_age', hostAge), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host age group (case insensitive)
     * @param {string} hostAgeGroup - The host age group
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostAgeGroup(hostAgeGroup, options = {}) {
      return run('serology', qb.eq('host_age_group', hostAgeGroup), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host common name (case insensitive)
     * @param {string} hostCommonName - The host common name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostCommonName(hostCommonName, options = {}) {
      return run('serology', qb.eq('host_common_name', hostCommonName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host health (case insensitive)
     * @param {string} hostHealth - The host health
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostHealth(hostHealth, options = {}) {
      return run('serology', qb.eq('host_health', hostHealth), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host identifier
     * @param {string} hostIdentifier - The host identifier
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostIdentifier(hostIdentifier, options = {}) {
      return run('serology', qb.eq('host_identifier', hostIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host sex (case insensitive)
     * @param {string} hostSex - The host sex
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostSex(hostSex, options = {}) {
      return run('serology', qb.eq('host_sex', hostSex), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host species (case insensitive)
     * @param {string} hostSpecies - The host species
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostSpecies(hostSpecies, options = {}) {
      return run('serology', qb.eq('host_species', hostSpecies), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host type
     * @param {string} hostType - The host type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostType(hostType, options = {}) {
      return run('serology', qb.eq('host_type', hostType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by positive definition (case insensitive)
     * @param {string} positiveDefinition - The positive definition
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByPositiveDefinition(positiveDefinition, options = {}) {
      return run('serology', qb.eq('positive_definition', positiveDefinition), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by project identifier
     * @param {string} projectIdentifier - The project identifier
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByProjectIdentifier(projectIdentifier, options = {}) {
      return run('serology', qb.eq('project_identifier', projectIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by sample accession
     * @param {string} sampleAccession - The sample accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getBySampleAccession(sampleAccession, options = {}) {
      return run('serology', qb.eq('sample_accession', sampleAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by sample identifier
     * @param {string} sampleIdentifier - The sample identifier
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getBySampleIdentifier(sampleIdentifier, options = {}) {
      return run('serology', qb.eq('sample_identifier', sampleIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by serotype
     * @param {string} serotype - The serotype
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getBySerotype(serotype, options = {}) {
      return run('serology', qb.eq('serotype', serotype), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by strain (case insensitive)
     * @param {string} strain - The strain
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByStrain(strain, options = {}) {
      return run('serology', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by taxon lineage ID
     * @param {string} taxonLineageId - The taxon lineage ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTaxonLineageId(taxonLineageId, options = {}) {
      return run('serology', qb.eq('taxon_lineage_ids', taxonLineageId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by test antigen (case insensitive)
     * @param {string} testAntigen - The test antigen
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTestAntigen(testAntigen, options = {}) {
      return run('serology', qb.eq('test_antigen', testAntigen), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by test interpretation (case insensitive)
     * @param {string} testInterpretation - The test interpretation
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTestInterpretation(testInterpretation, options = {}) {
      return run('serology', qb.eq('test_interpretation', testInterpretation), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by test pathogen (case insensitive)
     * @param {string} testPathogen - The test pathogen
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTestPathogen(testPathogen, options = {}) {
      return run('serology', qb.eq('test_pathogen', testPathogen), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by test result (case insensitive)
     * @param {string} testResult - The test result
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTestResult(testResult, options = {}) {
      return run('serology', qb.eq('test_result', testResult), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by test type (case insensitive)
     * @param {string} testType - The test type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTestType(testType, options = {}) {
      return run('serology', qb.eq('test_type', testType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by virus identifier (case insensitive)
     * @param {string} virusIdentifier - The virus identifier
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByVirusIdentifier(virusIdentifier, options = {}) {
      return run('serology', qb.eq('virus_identifier', virusIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by collection date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByCollectionDateRange(startDate, endDate, options = {}) {
      return run('serology', qb.and(qb.gte('collection_date', startDate), qb.lte('collection_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('serology', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('serology', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search serology data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('serology', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all serology data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getAll(options = {}) {
      return run('serology', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 