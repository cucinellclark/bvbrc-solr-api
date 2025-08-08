import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function epitope(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a epitope data object by epitope_id
     * @param {string} epitopeId - The epitope_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Epitope data object
     */
    getById(epitopeId, options = {}) {
      return run('epitope', qb.eq('epitope_id', epitopeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query epitope data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of epitope data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('epitope', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by epitope sequence
     * @param {string} epitopeSequence - The epitope sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByEpitopeSequence(epitopeSequence, options = {}) {
      return run('epitope', qb.eq('epitope_sequence', epitopeSequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by epitope type
     * @param {string} epitopeType - The epitope type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByEpitopeType(epitopeType, options = {}) {
      return run('epitope', qb.eq('epitope_type', epitopeType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by host name (case insensitive)
     * @param {string} hostName - The host name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByHostName(hostName, options = {}) {
      return run('epitope', qb.eq('host_name', hostName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by organism (case insensitive)
     * @param {string} organism - The organism name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByOrganism(organism, options = {}) {
      return run('epitope', qb.eq('organism', organism), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by protein accession
     * @param {string} proteinAccession - The protein accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByProteinAccession(proteinAccession, options = {}) {
      return run('epitope', qb.eq('protein_accession', proteinAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by protein ID
     * @param {string} proteinId - The protein ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByProteinId(proteinId, options = {}) {
      return run('epitope', qb.eq('protein_id', proteinId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by protein name (case insensitive)
     * @param {string} proteinName - The protein name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByProteinName(proteinName, options = {}) {
      return run('epitope', qb.eq('protein_name', proteinName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by start position
     * @param {number} start - The start position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByStart(start, options = {}) {
      return run('epitope', qb.eq('start', start), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by end position
     * @param {number} end - The end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByEnd(end, options = {}) {
      return run('epitope', qb.eq('end', end), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('epitope', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by B-cell assays
     * @param {string} bcellAssays - The B-cell assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByBcellAssays(bcellAssays, options = {}) {
      return run('epitope', qb.eq('bcell_assays', bcellAssays), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by MHC assays
     * @param {string} mhcAssays - The MHC assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByMhcAssays(mhcAssays, options = {}) {
      return run('epitope', qb.eq('mhc_assays', mhcAssays), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by T-cell assays
     * @param {string} tcellAssays - The T-cell assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTcellAssays(tcellAssays, options = {}) {
      return run('epitope', qb.eq('tcell_assays', tcellAssays), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by total assays
     * @param {number} totalAssays - The total number of assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTotalAssays(totalAssays, options = {}) {
      return run('epitope', qb.eq('total_assays', totalAssays), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by comment (case insensitive)
     * @param {string} comment - The comment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByComment(comment, options = {}) {
      return run('epitope', qb.eq('comments', comment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by assay results
     * @param {string} assayResult - The assay result
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByAssayResult(assayResult, options = {}) {
      return run('epitope', qb.eq('assay_results', assayResult), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by taxon lineage ID
     * @param {string} taxonLineageId - The taxon lineage ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTaxonLineageId(taxonLineageId, options = {}) {
      return run('epitope', qb.eq('taxon_lineage_ids', taxonLineageId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by taxon lineage name
     * @param {string} taxonLineageName - The taxon lineage name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTaxonLineageName(taxonLineageName, options = {}) {
      return run('epitope', qb.eq('taxon_lineage_names', taxonLineageName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by position range
     * @param {number} minStart - Minimum start position
     * @param {number} maxEnd - Maximum end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByPositionRange(minStart, maxEnd, options = {}) {
      return run('epitope', qb.and(qb.gte('start', minStart), qb.lte('end', maxEnd)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by total assays range
     * @param {number} minAssays - Minimum number of assays
     * @param {number} maxAssays - Maximum number of assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTotalAssaysRange(minAssays, maxAssays, options = {}) {
      return run('epitope', qb.and(qb.gte('total_assays', minAssays), qb.lte('total_assays', maxAssays)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('epitope', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('epitope', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search epitopes by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('epitope', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all epitopes
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getAll(options = {}) {
      return run('epitope', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 