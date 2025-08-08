import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function protein_structure(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a protein_structure data object by pdb_id
     * @param {string} pdbId - The pdb_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Protein structure data object
     */
    getById(pdbId, options = {}) {
      return run('protein_structure', qb.eq('pdb_id', pdbId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query protein_structure data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('protein_structure', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('protein_structure', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('protein_structure', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('protein_structure', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by organism name (case insensitive)
     * @param {string} organismName - The organism name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByOrganismName(organismName, options = {}) {
      return run('protein_structure', qb.eq('organism_name', organismName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by title (case insensitive)
     * @param {string} title - The title
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByTitle(title, options = {}) {
      return run('protein_structure', qb.eq('title', title), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by resolution
     * @param {string} resolution - The resolution
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByResolution(resolution, options = {}) {
      return run('protein_structure', qb.eq('resolution', resolution), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by institution
     * @param {string} institution - The institution
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByInstitution(institution, options = {}) {
      return run('protein_structure', qb.eq('institution', institution), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by file path
     * @param {string} filePath - The file path
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByFilePath(filePath, options = {}) {
      return run('protein_structure', qb.eq('file_path', filePath), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by author
     * @param {string} author - The author name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByAuthor(author, options = {}) {
      return run('protein_structure', qb.eq('authors', author), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by method
     * @param {string} method - The method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByMethod(method, options = {}) {
      return run('protein_structure', qb.eq('method', method), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by gene
     * @param {string} gene - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByGene(gene, options = {}) {
      return run('protein_structure', qb.eq('gene', gene), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by product
     * @param {string} product - The product name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByProduct(product, options = {}) {
      return run('protein_structure', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by sequence
     * @param {string} sequence - The sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getBySequence(sequence, options = {}) {
      return run('protein_structure', qb.eq('sequence', sequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by sequence MD5
     * @param {string} sequenceMd5 - The sequence MD5 hash
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getBySequenceMd5(sequenceMd5, options = {}) {
      return run('protein_structure', qb.eq('sequence_md5', sequenceMd5), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by UniProtKB accession
     * @param {string} uniprotkbAccession - The UniProtKB accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByUniprotkbAccession(uniprotkbAccession, options = {}) {
      return run('protein_structure', qb.eq('uniprotkb_accession', uniprotkbAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by PMID
     * @param {string} pmid - The PubMed ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByPmid(pmid, options = {}) {
      return run('protein_structure', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('protein_structure', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by taxon lineage ID
     * @param {string} taxonLineageId - The taxon lineage ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByTaxonLineageId(taxonLineageId, options = {}) {
      return run('protein_structure', qb.eq('taxon_lineage_ids', taxonLineageId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by taxon lineage name
     * @param {string} taxonLineageName - The taxon lineage name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByTaxonLineageName(taxonLineageName, options = {}) {
      return run('protein_structure', qb.eq('taxon_lineage_names', taxonLineageName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by alignment
     * @param {string} alignment - The alignment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByAlignment(alignment, options = {}) {
      return run('protein_structure', qb.eq('alignments', alignment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by release date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByReleaseDateRange(startDate, endDate, options = {}) {
      return run('protein_structure', qb.and(qb.gte('release_date', startDate), qb.lte('release_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('protein_structure', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('protein_structure', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search protein structures by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('protein_structure', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all protein structures
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getAll(options = {}) {
      return run('protein_structure', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 