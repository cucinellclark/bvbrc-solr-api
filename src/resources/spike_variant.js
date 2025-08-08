import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function spikeVariant(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a spike_variant data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Spike variant data object
     */
    getById(id, options = {}) {
      return run('spike_variant', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query spike_variant data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('spike_variant', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by AA variant
     * @param {string} aaVariant - The AA variant
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByAaVariant(aaVariant, options = {}) {
      return run('spike_variant', qb.eq('aa_variant', aaVariant), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by country (case insensitive)
     * @param {string} country - The country name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByCountry(country, options = {}) {
      return run('spike_variant', qb.eq('country', country), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by region (case insensitive)
     * @param {string} region - The region name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByRegion(region, options = {}) {
      return run('spike_variant', qb.eq('region', region), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by month
     * @param {string} month - The month
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByMonth(month, options = {}) {
      return run('spike_variant', qb.eq('month', month), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by sequence feature
     * @param {string} sequenceFeature - The sequence feature to search for in the array
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getBySequenceFeature(sequenceFeature, options = {}) {
      return run('spike_variant', qb.eq('sequence_features', sequenceFeature), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by growth rate
     * @param {number} growthRate - The growth rate
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByGrowthRate(growthRate, options = {}) {
      return run('spike_variant', qb.eq('growth_rate', growthRate), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by prevalence
     * @param {number} prevalence - The prevalence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByPrevalence(prevalence, options = {}) {
      return run('spike_variant', qb.eq('prevalence', prevalence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by lineage count
     * @param {number} lineageCount - The lineage count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByLineageCount(lineageCount, options = {}) {
      return run('spike_variant', qb.eq('lineage_count', lineageCount), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by total isolates
     * @param {number} totalIsolates - The total isolates count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByTotalIsolates(totalIsolates, options = {}) {
      return run('spike_variant', qb.eq('total_isolates', totalIsolates), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by growth rate range
     * @param {number} minGrowthRate - Minimum growth rate
     * @param {number} maxGrowthRate - Maximum growth rate
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByGrowthRateRange(minGrowthRate, maxGrowthRate, options = {}) {
      const filters = [
        qb.gte('growth_rate', minGrowthRate),
        qb.lte('growth_rate', maxGrowthRate)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by prevalence range
     * @param {number} minPrevalence - Minimum prevalence
     * @param {number} maxPrevalence - Maximum prevalence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByPrevalenceRange(minPrevalence, maxPrevalence, options = {}) {
      const filters = [
        qb.gte('prevalence', minPrevalence),
        qb.lte('prevalence', maxPrevalence)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by lineage count range
     * @param {number} minLineageCount - Minimum lineage count
     * @param {number} maxLineageCount - Maximum lineage count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByLineageCountRange(minLineageCount, maxLineageCount, options = {}) {
      const filters = [
        qb.gte('lineage_count', minLineageCount),
        qb.lte('lineage_count', maxLineageCount)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by total isolates range
     * @param {number} minTotalIsolates - Minimum total isolates
     * @param {number} maxTotalIsolates - Maximum total isolates
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByTotalIsolatesRange(minTotalIsolates, maxTotalIsolates, options = {}) {
      const filters = [
        qb.gte('total_isolates', minTotalIsolates),
        qb.lte('total_isolates', maxTotalIsolates)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by modified date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByModifiedDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_modified', startDate),
        qb.lt('date_modified', endDate)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search spike_variant data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('spike_variant', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all spike_variant data with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getAll(options = {}) {
      return run('spike_variant', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

export default spikeVariant; 