import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function genomeAmr(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a genome_amr data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Genome AMR data object
     */
    getById(id, options = {}) {
      return run('genome_amr', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query genome_amr data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('genome_amr', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by antibiotic (case insensitive)
     * @param {string} antibiotic - The antibiotic name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByAntibiotic(antibiotic, options = {}) {
      return run('genome_amr', qb.eq('antibiotic', antibiotic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by computational method (case insensitive)
     * @param {string} computationalMethod - The computational method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByComputationalMethod(computationalMethod, options = {}) {
      return run('genome_amr', qb.eq('computational_method', computationalMethod), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by computational method version
     * @param {string} computationalMethodVersion - The computational method version
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByComputationalMethodVersion(computationalMethodVersion, options = {}) {
      return run('genome_amr', qb.eq('computational_method_version', computationalMethodVersion), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by evidence (case insensitive)
     * @param {string} evidence - The evidence type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByEvidence(evidence, options = {}) {
      return run('genome_amr', qb.eq('evidence', evidence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('genome_amr', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by genome name (case insensitive)
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('genome_amr', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by laboratory typing method (case insensitive)
     * @param {string} laboratoryTypingMethod - The laboratory typing method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByLaboratoryTypingMethod(laboratoryTypingMethod, options = {}) {
      return run('genome_amr', qb.eq('laboratory_typing_method', laboratoryTypingMethod), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by laboratory typing method version
     * @param {string} laboratoryTypingMethodVersion - The laboratory typing method version
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByLaboratoryTypingMethodVersion(laboratoryTypingMethodVersion, options = {}) {
      return run('genome_amr', qb.eq('laboratory_typing_method_version', laboratoryTypingMethodVersion), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by laboratory typing platform (case insensitive)
     * @param {string} laboratoryTypingPlatform - The laboratory typing platform
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByLaboratoryTypingPlatform(laboratoryTypingPlatform, options = {}) {
      return run('genome_amr', qb.eq('laboratory_typing_platform', laboratoryTypingPlatform), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by measurement
     * @param {string} measurement - The measurement
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByMeasurement(measurement, options = {}) {
      return run('genome_amr', qb.eq('measurement', measurement), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by measurement sign
     * @param {string} measurementSign - The measurement sign
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByMeasurementSign(measurementSign, options = {}) {
      return run('genome_amr', qb.eq('measurement_sign', measurementSign), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by measurement unit
     * @param {string} measurementUnit - The measurement unit
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByMeasurementUnit(measurementUnit, options = {}) {
      return run('genome_amr', qb.eq('measurement_unit', measurementUnit), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by measurement value
     * @param {string} measurementValue - The measurement value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByMeasurementValue(measurementValue, options = {}) {
      return run('genome_amr', qb.eq('measurement_value', measurementValue), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by owner
     * @param {string} owner - The owner
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByOwner(owner, options = {}) {
      return run('genome_amr', qb.eq('owner', owner), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by PMID
     * @param {number} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByPmid(pmid, options = {}) {
      return run('genome_amr', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by public status
     * @param {boolean} isPublic - The public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('genome_amr', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by resistant phenotype
     * @param {string} resistantPhenotype - The resistant phenotype
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByResistantPhenotype(resistantPhenotype, options = {}) {
      return run('genome_amr', qb.eq('resistant_phenotype', resistantPhenotype), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by source (case insensitive)
     * @param {string} source - The source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getBySource(source, options = {}) {
      return run('genome_amr', qb.eq('source', source), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('genome_amr', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by testing standard (case insensitive)
     * @param {string} testingStandard - The testing standard
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByTestingStandard(testingStandard, options = {}) {
      return run('genome_amr', qb.eq('testing_standard', testingStandard), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by testing standard year
     * @param {number} testingStandardYear - The testing standard year
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByTestingStandardYear(testingStandardYear, options = {}) {
      return run('genome_amr', qb.eq('testing_standard_year', testingStandardYear), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by vendor (case insensitive)
     * @param {string} vendor - The vendor
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByVendor(vendor, options = {}) {
      return run('genome_amr', qb.eq('vendor', vendor), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('genome_amr', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by modified date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByModifiedDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_modified', startDate),
        qb.lt('date_modified', endDate)
      ];
      return run('genome_amr', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search genome_amr data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('genome_amr', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all genome_amr data with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getAll(options = {}) {
      return run('genome_amr', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

export default genomeAmr; 