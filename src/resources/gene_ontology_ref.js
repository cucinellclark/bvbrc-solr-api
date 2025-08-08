import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function gene_ontology_ref(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a gene_ontology_ref data object by go_id
     * @param {string} goId - The go_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Gene ontology reference data object
     */
    getById(goId, options = {}) {
      return run('gene_ontology_ref', qb.eq('go_id', goId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query gene_ontology_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('gene_ontology_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get gene ontology references by GO name
     * @param {string} goName - The GO name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getByGoName(goName, options = {}) {
      return run('gene_ontology_ref', qb.eq('go_name', goName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get gene ontology references by definition
     * @param {string} definition - The definition
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getByDefinition(definition, options = {}) {
      return run('gene_ontology_ref', qb.eq('definition', definition), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get gene ontology references by ontology
     * @param {string} ontology - The ontology
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getByOntology(ontology, options = {}) {
      return run('gene_ontology_ref', qb.eq('ontology', ontology), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get gene ontology references by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('gene_ontology_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get gene ontology references by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('gene_ontology_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search gene ontology references by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('gene_ontology_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all gene ontology references
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getAll(options = {}) {
      return run('gene_ontology_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 