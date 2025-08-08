import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function spikeLineage(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a spike_lineage data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Spike lineage data object
     */
    getById(id, options = {}) {
      return run('spike_lineage', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query spike_lineage data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('spike_lineage', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by country (case insensitive)
     * @param {string} country - The country
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByCountry(country, options = {}) {
      return run('spike_lineage', qb.eq('country', country), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by growth rate
     * @param {number} growthRate - The growth rate
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByGrowthRate(growthRate, options = {}) {
      return run('spike_lineage', qb.eq('growth_rate', growthRate), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by lineage
     * @param {string} lineage - The lineage
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByLineage(lineage, options = {}) {
      return run('spike_lineage', qb.eq('lineage', lineage), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by lineage count
     * @param {number} lineageCount - The lineage count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByLineageCount(lineageCount, options = {}) {
      return run('spike_lineage', qb.eq('lineage_count', lineageCount), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by lineage of concern
     * @param {string} lineageOfConcern - The lineage of concern
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByLineageOfConcern(lineageOfConcern, options = {}) {
      return run('spike_lineage', qb.eq('lineage_of_concern', lineageOfConcern), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by month
     * @param {string} month - The month
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByMonth(month, options = {}) {
      return run('spike_lineage', qb.eq('month', month), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by prevalence
     * @param {number} prevalence - The prevalence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByPrevalence(prevalence, options = {}) {
      return run('spike_lineage', qb.eq('prevalence', prevalence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by region (case insensitive)
     * @param {string} region - The region
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByRegion(region, options = {}) {
      return run('spike_lineage', qb.eq('region', region), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by sequence features
     * @param {string} sequenceFeatures - The sequence features
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getBySequenceFeatures(sequenceFeatures, options = {}) {
      return run('spike_lineage', qb.eq('sequence_features', sequenceFeatures), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by total isolates
     * @param {number} totalIsolates - The total isolates
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByTotalIsolates(totalIsolates, options = {}) {
      return run('spike_lineage', qb.eq('total_isolates', totalIsolates), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by growth rate range
     * @param {number} minGrowthRate - Minimum growth rate
     * @param {number} maxGrowthRate - Maximum growth rate
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByGrowthRateRange(minGrowthRate, maxGrowthRate, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('growth_rate', minGrowthRate), qb.lte('growth_rate', maxGrowthRate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by lineage count range
     * @param {number} minLineageCount - Minimum lineage count
     * @param {number} maxLineageCount - Maximum lineage count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByLineageCountRange(minLineageCount, maxLineageCount, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('lineage_count', minLineageCount), qb.lte('lineage_count', maxLineageCount)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by prevalence range
     * @param {number} minPrevalence - Minimum prevalence
     * @param {number} maxPrevalence - Maximum prevalence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByPrevalenceRange(minPrevalence, maxPrevalence, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('prevalence', minPrevalence), qb.lte('prevalence', maxPrevalence)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by total isolates range
     * @param {number} minTotalIsolates - Minimum total isolates
     * @param {number} maxTotalIsolates - Maximum total isolates
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByTotalIsolatesRange(minTotalIsolates, maxTotalIsolates, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('total_isolates', minTotalIsolates), qb.lte('total_isolates', maxTotalIsolates)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search spike_lineage data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('spike_lineage', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all spike_lineage data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getAll(options = {}) {
      return run('spike_lineage', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 