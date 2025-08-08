import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function subsystemRef(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a subsystem_ref data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Subsystem ref data object
     */
    getById(id, options = {}) {
      return run('subsystem_ref', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query subsystem_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('subsystem_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by class
     * @param {string} className - The class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByClass(className, options = {}) {
      return run('subsystem_ref', qb.eq('class', className), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by description
     * @param {string} description - The description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByDescription(description, options = {}) {
      return run('subsystem_ref', qb.eq('description', description), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by notes
     * @param {string} notes - The notes
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByNotes(notes, options = {}) {
      return run('subsystem_ref', qb.eq('notes', notes), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by PMID
     * @param {string} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByPmid(pmid, options = {}) {
      return run('subsystem_ref', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by role ID
     * @param {string} roleId - The role ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByRoleId(roleId, options = {}) {
      return run('subsystem_ref', qb.eq('role_id', roleId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by role name
     * @param {string} roleName - The role name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByRoleName(roleName, options = {}) {
      return run('subsystem_ref', qb.eq('role_name', roleName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by subclass
     * @param {string} subclass - The subclass
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getBySubclass(subclass, options = {}) {
      return run('subsystem_ref', qb.eq('subclass', subclass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by subsystem ID
     * @param {string} subsystemId - The subsystem ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getBySubsystemId(subsystemId, options = {}) {
      return run('subsystem_ref', qb.eq('subsystem_id', subsystemId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by subsystem name
     * @param {string} subsystemName - The subsystem name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getBySubsystemName(subsystemName, options = {}) {
      return run('subsystem_ref', qb.eq('subsystem_name', subsystemName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by superclass
     * @param {string} superclass - The superclass
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getBySuperclass(superclass, options = {}) {
      return run('subsystem_ref', qb.eq('superclass', superclass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('subsystem_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('subsystem_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search subsystem refs by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('subsystem_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all subsystem refs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getAll(options = {}) {
      return run('subsystem_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 