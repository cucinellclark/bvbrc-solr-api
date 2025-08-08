import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function epitopeAssay(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a epitope_assay data object by assay_id
     * @param {string} assayId - The assay_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Epitope assay data object
     */
    getById(assayId, options = {}) {
      return run('epitope_assay', qb.eq('assay_id', assayId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query epitope_assay data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('epitope_assay', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay group
     * @param {string} assayGroup - The assay group
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayGroup(assayGroup, options = {}) {
      return run('epitope_assay', qb.eq('assay_group', assayGroup), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay measurement
     * @param {string} assayMeasurement - The assay measurement
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayMeasurement(assayMeasurement, options = {}) {
      return run('epitope_assay', qb.eq('assay_measurement', assayMeasurement), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay measurement unit
     * @param {string} assayMeasurementUnit - The assay measurement unit
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayMeasurementUnit(assayMeasurementUnit, options = {}) {
      return run('epitope_assay', qb.eq('assay_measurement_unit', assayMeasurementUnit), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay method
     * @param {string} assayMethod - The assay method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayMethod(assayMethod, options = {}) {
      return run('epitope_assay', qb.eq('assay_method', assayMethod), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay result
     * @param {string} assayResult - The assay result
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayResult(assayResult, options = {}) {
      return run('epitope_assay', qb.eq('assay_result', assayResult), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay type
     * @param {string} assayType - The assay type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayType(assayType, options = {}) {
      return run('epitope_assay', qb.eq('assay_type', assayType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by authors
     * @param {string} authors - The authors
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAuthors(authors, options = {}) {
      return run('epitope_assay', qb.eq('authors', authors), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by epitope ID
     * @param {string} epitopeId - The epitope ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByEpitopeId(epitopeId, options = {}) {
      return run('epitope_assay', qb.eq('epitope_id', epitopeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by epitope sequence
     * @param {string} epitopeSequence - The epitope sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByEpitopeSequence(epitopeSequence, options = {}) {
      return run('epitope_assay', qb.eq('epitope_sequence', epitopeSequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by epitope type
     * @param {string} epitopeType - The epitope type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByEpitopeType(epitopeType, options = {}) {
      return run('epitope_assay', qb.eq('epitope_type', epitopeType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by host name (case insensitive)
     * @param {string} hostName - The host name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByHostName(hostName, options = {}) {
      return run('epitope_assay', qb.eq('host_name', hostName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by host taxon ID
     * @param {string} hostTaxonId - The host taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByHostTaxonId(hostTaxonId, options = {}) {
      return run('epitope_assay', qb.eq('host_taxon_id', hostTaxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by MHC allele
     * @param {string} mhcAllele - The MHC allele
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByMhcAllele(mhcAllele, options = {}) {
      return run('epitope_assay', qb.eq('mhc_allele', mhcAllele), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by MHC allele class
     * @param {string} mhcAlleleClass - The MHC allele class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByMhcAlleleClass(mhcAlleleClass, options = {}) {
      return run('epitope_assay', qb.eq('mhc_allele_class', mhcAlleleClass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by organism (case insensitive)
     * @param {string} organism - The organism name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByOrganism(organism, options = {}) {
      return run('epitope_assay', qb.eq('organism', organism), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by PDB ID
     * @param {string} pdbId - The PDB ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByPdbId(pdbId, options = {}) {
      return run('epitope_assay', qb.eq('pdb_id', pdbId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by PMID
     * @param {string} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByPmid(pmid, options = {}) {
      return run('epitope_assay', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by protein accession
     * @param {string} proteinAccession - The protein accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByProteinAccession(proteinAccession, options = {}) {
      return run('epitope_assay', qb.eq('protein_accession', proteinAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by protein ID
     * @param {string} proteinId - The protein ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByProteinId(proteinId, options = {}) {
      return run('epitope_assay', qb.eq('protein_id', proteinId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by protein name (case insensitive)
     * @param {string} proteinName - The protein name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByProteinName(proteinName, options = {}) {
      return run('epitope_assay', qb.eq('protein_name', proteinName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by start position
     * @param {number} start - The start position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByStart(start, options = {}) {
      return run('epitope_assay', qb.eq('start', start), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by end position
     * @param {number} end - The end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByEnd(end, options = {}) {
      return run('epitope_assay', qb.eq('end', end), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('epitope_assay', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by taxon lineage ID
     * @param {string} taxonLineageId - The taxon lineage ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByTaxonLineageId(taxonLineageId, options = {}) {
      return run('epitope_assay', qb.eq('taxon_lineage_ids', taxonLineageId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by taxon lineage name
     * @param {string} taxonLineageName - The taxon lineage name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByTaxonLineageName(taxonLineageName, options = {}) {
      return run('epitope_assay', qb.eq('taxon_lineage_names', taxonLineageName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by title (case insensitive)
     * @param {string} title - The title
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByTitle(title, options = {}) {
      return run('epitope_assay', qb.eq('title', title), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by position range
     * @param {number} minStart - Minimum start position
     * @param {number} maxEnd - Maximum end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByPositionRange(minStart, maxEnd, options = {}) {
      return run('epitope_assay', qb.and(qb.gte('start', minStart), qb.lte('end', maxEnd)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('epitope_assay', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('epitope_assay', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search epitope assays by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('epitope_assay', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all epitope assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getAll(options = {}) {
      return run('epitope_assay', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 