import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function idRef(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a id_ref data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} ID reference data object
     */
    getById(id, options = {}) {
      return run('id_ref', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query id_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('id_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get id_ref entries by ID type
     * @param {string} idType - The ID type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getByIdType(idType, options = {}) {
      return run('id_ref', qb.eq('id_type', idType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get id_ref entries by ID value
     * @param {string} idValue - The ID value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getByIdValue(idValue, options = {}) {
      return run('id_ref', qb.eq('id_value', idValue), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get id_ref entries by UniProtKB accession
     * @param {string} uniprotkbAccession - The UniProtKB accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getByUniprotkbAccession(uniprotkbAccession, options = {}) {
      return run('id_ref', qb.eq('uniprotkb_accession', uniprotkbAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get id_ref entries by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('id_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get id_ref entries by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('id_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search id_ref data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('id_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all id_ref data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getAll(options = {}) {
      return run('id_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 