import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function enzyme_class_ref(context) {
  const ctx = context;

  return {
    /**
     * Retrieve an enzyme_class_ref data object by ec_number
     * @param {string} ecNumber - The ec_number to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Enzyme class reference data object
     */
    getById(ecNumber, options = {}) {
      return run('enzyme_class_ref', qb.eq('ec_number', ecNumber), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query enzyme_class_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('enzyme_class_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get enzyme class references by EC description
     * @param {string} ecDescription - The EC description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getByEcDescription(ecDescription, options = {}) {
      return run('enzyme_class_ref', qb.eq('ec_description', ecDescription), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get enzyme class references by GO term (case insensitive)
     * @param {string} goTerm - The GO term
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getByGo(goTerm, options = {}) {
      return run('enzyme_class_ref', qb.eq('go', goTerm), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get enzyme class references by version
     * @param {number} version - The version number
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getByVersion(version, options = {}) {
      return run('enzyme_class_ref', qb.eq('_version_', version), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get enzyme class references by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('enzyme_class_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get enzyme class references by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('enzyme_class_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search enzyme class references by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('enzyme_class_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all enzyme class references
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getAll(options = {}) {
      return run('enzyme_class_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 