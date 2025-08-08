import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function proteinFamilyRef(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a protein_family_ref data object by family_id
     * @param {string} familyId - The family_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Protein family reference data object
     */
    getById(familyId, options = {}) {
      return run('protein_family_ref', qb.eq('family_id', familyId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query protein_family_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('protein_family_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein family references by family product
     * @param {string} familyProduct - The family product
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    getByFamilyProduct(familyProduct, options = {}) {
      return run('protein_family_ref', qb.eq('family_product', familyProduct), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein family references by family type
     * @param {string} familyType - The family type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    getByFamilyType(familyType, options = {}) {
      return run('protein_family_ref', qb.eq('family_type', familyType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein family references by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('protein_family_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein family references by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('protein_family_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search protein_family_ref data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('protein_family_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all protein_family_ref data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    getAll(options = {}) {
      return run('protein_family_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 