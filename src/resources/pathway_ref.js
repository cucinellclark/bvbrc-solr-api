import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function pathway_ref(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a pathway_ref data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Pathway reference data object
     */
    getById(id, options = {}) {
      return run('pathway_ref', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query pathway_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('pathway_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by EC number
     * @param {string} ecNumber - The EC number
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByEcNumber(ecNumber, options = {}) {
      return run('pathway_ref', qb.eq('ec_number', ecNumber), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by EC description
     * @param {string} ecDescription - The EC description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByEcDescription(ecDescription, options = {}) {
      return run('pathway_ref', qb.eq('ec_description', ecDescription), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by map location
     * @param {string} mapLocation - The map location
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByMapLocation(mapLocation, options = {}) {
      return run('pathway_ref', qb.eq('map_location', mapLocation), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by map name
     * @param {string} mapName - The map name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByMapName(mapName, options = {}) {
      return run('pathway_ref', qb.eq('map_name', mapName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by map type
     * @param {string} mapType - The map type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByMapType(mapType, options = {}) {
      return run('pathway_ref', qb.eq('map_type', mapType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by occurrence
     * @param {number} occurrence - The occurrence count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByOccurrence(occurrence, options = {}) {
      return run('pathway_ref', qb.eq('occurrence', occurrence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by pathway class
     * @param {string} pathwayClass - The pathway class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByPathwayClass(pathwayClass, options = {}) {
      return run('pathway_ref', qb.eq('pathway_class', pathwayClass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by pathway ID
     * @param {string} pathwayId - The pathway ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByPathwayId(pathwayId, options = {}) {
      return run('pathway_ref', qb.eq('pathway_id', pathwayId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by pathway name
     * @param {string} pathwayName - The pathway name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByPathwayName(pathwayName, options = {}) {
      return run('pathway_ref', qb.eq('pathway_name', pathwayName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by occurrence range
     * @param {number} minOccurrence - Minimum occurrence count
     * @param {number} maxOccurrence - Maximum occurrence count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByOccurrenceRange(minOccurrence, maxOccurrence, options = {}) {
      return run('pathway_ref', qb.and(qb.gte('occurrence', minOccurrence), qb.lte('occurrence', maxOccurrence)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('pathway_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('pathway_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search pathway references by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('pathway_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all pathway references
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getAll(options = {}) {
      return run('pathway_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 