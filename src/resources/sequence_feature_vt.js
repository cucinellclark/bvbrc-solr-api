import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function sequence_feature_vt(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a sequence_feature_vt data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Sequence feature variant data object
     */
    getById(id, options = {}) {
      return run('sequence_feature_vt', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query sequence_feature_vt data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('sequence_feature_vt', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SF category
     * @param {string} sfCategory - The SF category
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfCategory(sfCategory, options = {}) {
      return run('sequence_feature_vt', qb.eq('sf_category', sfCategory), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SF ID
     * @param {string} sfId - The SF ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfId(sfId, options = {}) {
      return run('sequence_feature_vt', qb.eq('sf_id', sfId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SF name (case insensitive)
     * @param {string} sfName - The SF name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfName(sfName, options = {}) {
      return run('sequence_feature_vt', qb.eq('sf_name', sfName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SF sequence
     * @param {string} sfSequence - The SF sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfSequence(sfSequence, options = {}) {
      return run('sequence_feature_vt', qb.eq('sf_sequence', sfSequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SF sequence MD5
     * @param {string} sfSequenceMd5 - The SF sequence MD5 hash
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfSequenceMd5(sfSequenceMd5, options = {}) {
      return run('sequence_feature_vt', qb.eq('sf_sequence_md5', sfSequenceMd5), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT genome count
     * @param {string} sfvtGenomeCount - The SFVT genome count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtGenomeCount(sfvtGenomeCount, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_genome_count', sfvtGenomeCount), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT genome ID
     * @param {string} sfvtGenomeId - The SFVT genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtGenomeId(sfvtGenomeId, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_genome_ids', sfvtGenomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT ID
     * @param {string} sfvtId - The SFVT ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtId(sfvtId, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_id', sfvtId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT sequence
     * @param {string} sfvtSequence - The SFVT sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtSequence(sfvtSequence, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_sequence', sfvtSequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT sequence MD5
     * @param {string} sfvtSequenceMd5 - The SFVT sequence MD5 hash
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtSequenceMd5(sfvtSequenceMd5, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_sequence_md5', sfvtSequenceMd5), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT variations
     * @param {string} sfvtVariations - The SFVT variations
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtVariations(sfvtVariations, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_variations', sfvtVariations), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by additional metadata (case insensitive)
     * @param {string} additionalMetadata - The additional metadata
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getByAdditionalMetadata(additionalMetadata, options = {}) {
      return run('sequence_feature_vt', qb.eq('additional_metadata', additionalMetadata), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by comments (case insensitive)
     * @param {string} comment - The comment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getByComment(comment, options = {}) {
      return run('sequence_feature_vt', qb.eq('comments', comment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('sequence_feature_vt', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('sequence_feature_vt', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search sequence feature variants by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('sequence_feature_vt', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all sequence feature variants
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getAll(options = {}) {
      return run('sequence_feature_vt', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 