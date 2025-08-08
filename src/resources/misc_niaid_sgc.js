import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function miscNiaidSgc(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a misc_niaid_sgc data object by target_id
     * @param {string} targetId - The target_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Misc NIAID SGC data object
     */
    getById(targetId, options = {}) {
      return run('misc_niaid_sgc', qb.eq('target_id', targetId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query misc_niaid_sgc data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('misc_niaid_sgc', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by genus
     * @param {string} genus - The genus name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByGenus(genus, options = {}) {
      return run('misc_niaid_sgc', qb.eq('genus', genus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by species
     * @param {string} species - The species name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getBySpecies(species, options = {}) {
      return run('misc_niaid_sgc', qb.eq('species', species), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by strain
     * @param {string} strain - The strain name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByStrain(strain, options = {}) {
      return run('misc_niaid_sgc', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by target status
     * @param {string} targetStatus - The target status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByTargetStatus(targetStatus, options = {}) {
      return run('misc_niaid_sgc', qb.eq('target_status', targetStatus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by has clones
     * @param {string} hasClones - The has clones value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByHasClones(hasClones, options = {}) {
      return run('misc_niaid_sgc', qb.eq('has_clones', hasClones), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by has proteins
     * @param {string} hasProteins - The has proteins value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByHasProteins(hasProteins, options = {}) {
      return run('misc_niaid_sgc', qb.eq('has_proteins', hasProteins), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by selection criteria
     * @param {string} selectionCriteria - The selection criteria
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getBySelectionCriteria(selectionCriteria, options = {}) {
      return run('misc_niaid_sgc', qb.eq('selection_criteria', selectionCriteria), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by gene symbol collection
     * @param {string} geneSymbol - The gene symbol to search for in the collection
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByGeneSymbol(geneSymbol, options = {}) {
      return run('misc_niaid_sgc', qb.eq('gene_symbol_collection', geneSymbol), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('misc_niaid_sgc', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by modified date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByModifiedDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_modified', startDate),
        qb.lt('date_modified', endDate)
      ];
      return run('misc_niaid_sgc', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search misc_niaid_sgc data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('misc_niaid_sgc', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all misc_niaid_sgc data with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getAll(options = {}) {
      return run('misc_niaid_sgc', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

export default miscNiaidSgc; 