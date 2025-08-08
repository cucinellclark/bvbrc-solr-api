import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function pathway(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a pathway data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Pathway data object
     */
    getById(id, options = {}) {
      return run('pathway', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query pathway data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of pathway data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('pathway', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by accession (case insensitive)
     * @param {string} accession - The accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByAccession(accession, options = {}) {
      return run('pathway', qb.eq('accession', accession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by alternative locus tag
     * @param {string} altLocusTag - The alternative locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByAltLocusTag(altLocusTag, options = {}) {
      return run('pathway', qb.eq('alt_locus_tag', altLocusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by annotation (case insensitive)
     * @param {string} annotation - The annotation
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByAnnotation(annotation, options = {}) {
      return run('pathway', qb.eq('annotation', annotation), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by EC description (case insensitive)
     * @param {string} ecDescription - The EC description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByEcDescription(ecDescription, options = {}) {
      return run('pathway', qb.eq('ec_description', ecDescription), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by EC number
     * @param {string} ecNumber - The EC number
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByEcNumber(ecNumber, options = {}) {
      return run('pathway', qb.eq('ec_number', ecNumber), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('pathway', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by gene (case insensitive)
     * @param {string} gene - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByGene(gene, options = {}) {
      return run('pathway', qb.eq('gene', gene), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by genome EC
     * @param {string} genomeEc - The genome EC
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByGenomeEc(genomeEc, options = {}) {
      return run('pathway', qb.eq('genome_ec', genomeEc), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('pathway', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by genome name (case insensitive)
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('pathway', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by owner
     * @param {string} owner - The owner
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByOwner(owner, options = {}) {
      return run('pathway', qb.eq('owner', owner), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by pathway class (case insensitive)
     * @param {string} pathwayClass - The pathway class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByPathwayClass(pathwayClass, options = {}) {
      return run('pathway', qb.eq('pathway_class', pathwayClass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by pathway EC
     * @param {string} pathwayEc - The pathway EC
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByPathwayEc(pathwayEc, options = {}) {
      return run('pathway', qb.eq('pathway_ec', pathwayEc), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by pathway ID
     * @param {string} pathwayId - The pathway ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByPathwayId(pathwayId, options = {}) {
      return run('pathway', qb.eq('pathway_id', pathwayId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by pathway name (case insensitive)
     * @param {string} pathwayName - The pathway name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByPathwayName(pathwayName, options = {}) {
      return run('pathway', qb.eq('pathway_name', pathwayName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('pathway', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by product (case insensitive)
     * @param {string} product - The product name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByProduct(product, options = {}) {
      return run('pathway', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by public status
     * @param {boolean} isPublic - The public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('pathway', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by RefSeq locus tag
     * @param {string} refseqLocusTag - The RefSeq locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByRefseqLocusTag(refseqLocusTag, options = {}) {
      return run('pathway', qb.eq('refseq_locus_tag', refseqLocusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by sequence ID
     * @param {string} sequenceId - The sequence ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getBySequenceId(sequenceId, options = {}) {
      return run('pathway', qb.eq('sequence_id', sequenceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('pathway', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by user read permission
     * @param {string} userRead - The user read permission
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByUserRead(userRead, options = {}) {
      return run('pathway', qb.eq('user_read', userRead), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by user write permission
     * @param {string} userWrite - The user write permission
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByUserWrite(userWrite, options = {}) {
      return run('pathway', qb.eq('user_write', userWrite), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by version
     * @param {number} version - The version number
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByVersion(version, options = {}) {
      return run('pathway', qb.eq('_version_', version), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('pathway', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathways by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('pathway', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search pathways by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('pathway', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all pathways
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway data objects
     */
    getAll(options = {}) {
      return run('pathway', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 