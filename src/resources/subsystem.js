import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function subsystem(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a subsystem data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Subsystem data object
     */
    getById(id, options = {}) {
      return run('subsystem', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query subsystem data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('subsystem', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by active status
     * @param {string} active - The active status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByActive(active, options = {}) {
      return run('subsystem', qb.eq('active', active), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by class
     * @param {string} class_ - The class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByClass(class_, options = {}) {
      return run('subsystem', qb.eq('class', class_), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('subsystem', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by gene
     * @param {string} gene - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByGene(gene, options = {}) {
      return run('subsystem', qb.eq('gene', gene), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('subsystem', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by genome name (case insensitive)
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('subsystem', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by owner
     * @param {string} owner - The owner
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByOwner(owner, options = {}) {
      return run('subsystem', qb.eq('owner', owner), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('subsystem', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by product
     * @param {string} product - The product name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByProduct(product, options = {}) {
      return run('subsystem', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by public status
     * @param {boolean} isPublic - The public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('subsystem', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by RefSeq locus tag
     * @param {string} refseqLocusTag - The RefSeq locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByRefseqLocusTag(refseqLocusTag, options = {}) {
      return run('subsystem', qb.eq('refseq_locus_tag', refseqLocusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by role ID
     * @param {string} roleId - The role ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByRoleId(roleId, options = {}) {
      return run('subsystem', qb.eq('role_id', roleId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by role name
     * @param {string} roleName - The role name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByRoleName(roleName, options = {}) {
      return run('subsystem', qb.eq('role_name', roleName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by subclass
     * @param {string} subclass - The subclass
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getBySubclass(subclass, options = {}) {
      return run('subsystem', qb.eq('subclass', subclass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by subsystem ID
     * @param {string} subsystemId - The subsystem ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getBySubsystemId(subsystemId, options = {}) {
      return run('subsystem', qb.eq('subsystem_id', subsystemId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by subsystem name
     * @param {string} subsystemName - The subsystem name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getBySubsystemName(subsystemName, options = {}) {
      return run('subsystem', qb.eq('subsystem_name', subsystemName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by superclass
     * @param {string} superclass - The superclass
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getBySuperclass(superclass, options = {}) {
      return run('subsystem', qb.eq('superclass', superclass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('subsystem', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by user read
     * @param {string} userRead - The user read
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByUserRead(userRead, options = {}) {
      return run('subsystem', qb.eq('user_read', userRead), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by user write
     * @param {string} userWrite - The user write
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByUserWrite(userWrite, options = {}) {
      return run('subsystem', qb.eq('user_write', userWrite), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('subsystem', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('subsystem', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search subsystems by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('subsystem', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all subsystems
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getAll(options = {}) {
      return run('subsystem', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 