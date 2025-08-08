import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function spGeneRef(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a sp_gene_ref data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Specialty gene ref data object
     */
    getById(id, options = {}) {
      return run('sp_gene_ref', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query sp_gene_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('sp_gene_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by antibiotics
     * @param {string} antibiotics - The antibiotics
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByAntibiotics(antibiotics, options = {}) {
      return run('sp_gene_ref', qb.eq('antibiotics', antibiotics), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by antibiotics class
     * @param {string} antibioticsClass - The antibiotics class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByAntibioticsClass(antibioticsClass, options = {}) {
      return run('sp_gene_ref', qb.eq('antibiotics_class', antibioticsClass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by assertion
     * @param {string} assertion - The assertion
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByAssertion(assertion, options = {}) {
      return run('sp_gene_ref', qb.eq('assertion', assertion), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by classification
     * @param {string} classification - The classification
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByClassification(classification, options = {}) {
      return run('sp_gene_ref', qb.eq('classification', classification), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by function
     * @param {string} functionName - The function
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByFunction(functionName, options = {}) {
      return run('sp_gene_ref', qb.eq('function', functionName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by gene ID
     * @param {string} geneId - The gene ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByGeneId(geneId, options = {}) {
      return run('sp_gene_ref', qb.eq('gene_id', geneId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by gene name
     * @param {string} geneName - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByGeneName(geneName, options = {}) {
      return run('sp_gene_ref', qb.eq('gene_name', geneName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by genus
     * @param {string} genus - The genus
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByGenus(genus, options = {}) {
      return run('sp_gene_ref', qb.eq('genus', genus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by GI
     * @param {string} gi - The GI
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByGi(gi, options = {}) {
      return run('sp_gene_ref', qb.eq('gi', gi), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by locus tag
     * @param {string} locusTag - The locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByLocusTag(locusTag, options = {}) {
      return run('sp_gene_ref', qb.eq('locus_tag', locusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by organism
     * @param {string} organism - The organism
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByOrganism(organism, options = {}) {
      return run('sp_gene_ref', qb.eq('organism', organism), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by PMID
     * @param {string} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByPmid(pmid, options = {}) {
      return run('sp_gene_ref', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by product
     * @param {string} product - The product
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByProduct(product, options = {}) {
      return run('sp_gene_ref', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by property
     * @param {string} property - The property
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByProperty(property, options = {}) {
      return run('sp_gene_ref', qb.eq('property', property), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by source
     * @param {string} source - The source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getBySource(source, options = {}) {
      return run('sp_gene_ref', qb.eq('source', source), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by source ID
     * @param {string} sourceId - The source ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getBySourceId(sourceId, options = {}) {
      return run('sp_gene_ref', qb.eq('source_id', sourceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by species
     * @param {string} species - The species
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getBySpecies(species, options = {}) {
      return run('sp_gene_ref', qb.eq('species', species), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('sp_gene_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('sp_gene_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search specialty gene refs by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('sp_gene_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all specialty gene refs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getAll(options = {}) {
      return run('sp_gene_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 