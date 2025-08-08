import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function structured_assertion(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a structured_assertion data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Structured assertion data object
     */
    getById(id, options = {}) {
      return run('structured_assertion', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query structured_assertion data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('structured_assertion', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by comment
     * @param {string} comment - The comment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByComment(comment, options = {}) {
      return run('structured_assertion', qb.eq('comment', comment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by evidence code
     * @param {string} evidenceCode - The evidence code
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByEvidenceCode(evidenceCode, options = {}) {
      return run('structured_assertion', qb.eq('evidence_code', evidenceCode), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('structured_assertion', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by owner
     * @param {string} owner - The owner
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByOwner(owner, options = {}) {
      return run('structured_assertion', qb.eq('owner', owner), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('structured_assertion', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by PMID
     * @param {string} pmid - The PubMed ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByPmid(pmid, options = {}) {
      return run('structured_assertion', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by property
     * @param {string} property - The property
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByProperty(property, options = {}) {
      return run('structured_assertion', qb.eq('property', property), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by public status
     * @param {boolean} isPublic - The public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('structured_assertion', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by RefSeq locus tag
     * @param {string} refseqLocusTag - The RefSeq locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByRefseqLocusTag(refseqLocusTag, options = {}) {
      return run('structured_assertion', qb.eq('refseq_locus_tag', refseqLocusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by score
     * @param {string} score - The score
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByScore(score, options = {}) {
      return run('structured_assertion', qb.eq('score', score), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by source
     * @param {string} source - The source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getBySource(source, options = {}) {
      return run('structured_assertion', qb.eq('source', source), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by value
     * @param {string} value - The value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByValue(value, options = {}) {
      return run('structured_assertion', qb.eq('value', value), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by user read permission
     * @param {string} userRead - The user read permission
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByUserRead(userRead, options = {}) {
      return run('structured_assertion', qb.eq('user_read', userRead), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by user write permission
     * @param {string} userWrite - The user write permission
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByUserWrite(userWrite, options = {}) {
      return run('structured_assertion', qb.eq('user_write', userWrite), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by version
     * @param {number} version - The version number
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByVersion(version, options = {}) {
      return run('structured_assertion', qb.eq('_version_', version), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('structured_assertion', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('structured_assertion', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search structured assertions by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('structured_assertion', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all structured assertions
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getAll(options = {}) {
      return run('structured_assertion', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 