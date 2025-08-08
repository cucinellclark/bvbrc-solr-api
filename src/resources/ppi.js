import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function ppi(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a ppi data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} PPI data object
     */
    getById(id, options = {}) {
      return run('ppi', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query ppi data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of PPI data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('ppi', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by category
     * @param {string} category - The category
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByCategory(category, options = {}) {
      return run('ppi', qb.eq('category', category), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by detection method
     * @param {string} detectionMethod - The detection method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByDetectionMethod(detectionMethod, options = {}) {
      return run('ppi', qb.eq('detection_method', detectionMethod), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by domain A
     * @param {string} domainA - The domain A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByDomainA(domainA, options = {}) {
      return run('ppi', qb.eq('domain_a', domainA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by domain B
     * @param {string} domainB - The domain B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByDomainB(domainB, options = {}) {
      return run('ppi', qb.eq('domain_b', domainB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by evidence
     * @param {string} evidence - The evidence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByEvidence(evidence, options = {}) {
      return run('ppi', qb.eq('evidence', evidence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by feature ID A
     * @param {string} featureIdA - The feature ID A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByFeatureIdA(featureIdA, options = {}) {
      return run('ppi', qb.eq('feature_id_a', featureIdA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by feature ID B
     * @param {string} featureIdB - The feature ID B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByFeatureIdB(featureIdB, options = {}) {
      return run('ppi', qb.eq('feature_id_b', featureIdB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by gene A
     * @param {string} geneA - The gene A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGeneA(geneA, options = {}) {
      return run('ppi', qb.eq('gene_a', geneA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by gene B
     * @param {string} geneB - The gene B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGeneB(geneB, options = {}) {
      return run('ppi', qb.eq('gene_b', geneB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by genome ID A
     * @param {string} genomeIdA - The genome ID A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGenomeIdA(genomeIdA, options = {}) {
      return run('ppi', qb.eq('genome_id_a', genomeIdA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by genome ID B
     * @param {string} genomeIdB - The genome ID B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGenomeIdB(genomeIdB, options = {}) {
      return run('ppi', qb.eq('genome_id_b', genomeIdB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by genome name A (case insensitive)
     * @param {string} genomeNameA - The genome name A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGenomeNameA(genomeNameA, options = {}) {
      return run('ppi', qb.eq('genome_name_a', genomeNameA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by genome name B (case insensitive)
     * @param {string} genomeNameB - The genome name B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGenomeNameB(genomeNameB, options = {}) {
      return run('ppi', qb.eq('genome_name_b', genomeNameB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interaction type
     * @param {string} interactionType - The interaction type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractionType(interactionType, options = {}) {
      return run('ppi', qb.eq('interaction_type', interactionType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor A
     * @param {string} interactorA - The interactor A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorA(interactorA, options = {}) {
      return run('ppi', qb.eq('interactor_a', interactorA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor B
     * @param {string} interactorB - The interactor B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorB(interactorB, options = {}) {
      return run('ppi', qb.eq('interactor_b', interactorB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor description A (case insensitive)
     * @param {string} interactorDescA - The interactor description A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorDescA(interactorDescA, options = {}) {
      return run('ppi', qb.eq('interactor_desc_a', interactorDescA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor description B (case insensitive)
     * @param {string} interactorDescB - The interactor description B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorDescB(interactorDescB, options = {}) {
      return run('ppi', qb.eq('interactor_desc_b', interactorDescB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor type A
     * @param {string} interactorTypeA - The interactor type A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorTypeA(interactorTypeA, options = {}) {
      return run('ppi', qb.eq('interactor_type_a', interactorTypeA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor type B
     * @param {string} interactorTypeB - The interactor type B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorTypeB(interactorTypeB, options = {}) {
      return run('ppi', qb.eq('interactor_type_b', interactorTypeB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by PMID
     * @param {string} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByPmid(pmid, options = {}) {
      return run('ppi', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by RefSeq locus tag A
     * @param {string} refseqLocusTagA - The RefSeq locus tag A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByRefseqLocusTagA(refseqLocusTagA, options = {}) {
      return run('ppi', qb.eq('refseq_locus_tag_a', refseqLocusTagA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by RefSeq locus tag B
     * @param {string} refseqLocusTagB - The RefSeq locus tag B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByRefseqLocusTagB(refseqLocusTagB, options = {}) {
      return run('ppi', qb.eq('refseq_locus_tag_b', refseqLocusTagB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by score
     * @param {string} score - The score
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByScore(score, options = {}) {
      return run('ppi', qb.eq('score', score), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by source database
     * @param {string} sourceDb - The source database
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getBySourceDb(sourceDb, options = {}) {
      return run('ppi', qb.eq('source_db', sourceDb), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by source ID
     * @param {string} sourceId - The source ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getBySourceId(sourceId, options = {}) {
      return run('ppi', qb.eq('source_id', sourceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by taxon ID A
     * @param {number} taxonIdA - The taxon ID A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByTaxonIdA(taxonIdA, options = {}) {
      return run('ppi', qb.eq('taxon_id_a', taxonIdA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by taxon ID B
     * @param {number} taxonIdB - The taxon ID B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByTaxonIdB(taxonIdB, options = {}) {
      return run('ppi', qb.eq('taxon_id_b', taxonIdB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('ppi', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('ppi', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search PPIs by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('ppi', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all PPIs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getAll(options = {}) {
      return run('ppi', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 