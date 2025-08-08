import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function protein_feature(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a protein_feature data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Protein feature data object
     */
    getById(id, options = {}) {
      return run('protein_feature', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query protein_feature data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('protein_feature', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by amino acid sequence MD5
     * @param {string} aaSequenceMd5 - The amino acid sequence MD5 hash
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByAaSequenceMd5(aaSequenceMd5, options = {}) {
      return run('protein_feature', qb.eq('aa_sequence_md5', aaSequenceMd5), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by classification
     * @param {string} classification - The classification
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByClassification(classification, options = {}) {
      return run('protein_feature', qb.eq('classification', classification), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by comment (case insensitive)
     * @param {string} comment - The comment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByComment(comment, options = {}) {
      return run('protein_feature', qb.eq('comments', comment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by description (case insensitive)
     * @param {string} description - The description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByDescription(description, options = {}) {
      return run('protein_feature', qb.eq('description', description), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by E-value
     * @param {string} eValue - The E-value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByEValue(eValue, options = {}) {
      return run('protein_feature', qb.eq('e_value', eValue), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by end position
     * @param {number} end - The end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByEnd(end, options = {}) {
      return run('protein_feature', qb.eq('end', end), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by evidence
     * @param {string} evidence - The evidence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByEvidence(evidence, options = {}) {
      return run('protein_feature', qb.eq('evidence', evidence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('protein_feature', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by feature type
     * @param {string} featureType - The feature type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByFeatureType(featureType, options = {}) {
      return run('protein_feature', qb.eq('feature_type', featureType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by gene
     * @param {string} gene - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByGene(gene, options = {}) {
      return run('protein_feature', qb.eq('gene', gene), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('protein_feature', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by genome name (case insensitive)
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('protein_feature', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by InterPro description (case insensitive)
     * @param {string} interproDescription - The InterPro description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByInterproDescription(interproDescription, options = {}) {
      return run('protein_feature', qb.eq('interpro_description', interproDescription), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by InterPro ID
     * @param {string} interproId - The InterPro ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByInterproId(interproId, options = {}) {
      return run('protein_feature', qb.eq('interpro_id', interproId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by length
     * @param {number} length - The length
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByLength(length, options = {}) {
      return run('protein_feature', qb.eq('length', length), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('protein_feature', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by product (case insensitive)
     * @param {string} product - The product name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByProduct(product, options = {}) {
      return run('protein_feature', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by publication
     * @param {string} publication - The publication
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByPublication(publication, options = {}) {
      return run('protein_feature', qb.eq('publication', publication), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by RefSeq locus tag
     * @param {string} refseqLocusTag - The RefSeq locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByRefseqLocusTag(refseqLocusTag, options = {}) {
      return run('protein_feature', qb.eq('refseq_locus_tag', refseqLocusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by score
     * @param {number} score - The score
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByScore(score, options = {}) {
      return run('protein_feature', qb.eq('score', score), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by segment
     * @param {string} segment - The segment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getBySegment(segment, options = {}) {
      return run('protein_feature', qb.eq('segments', segment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by sequence
     * @param {string} sequence - The sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getBySequence(sequence, options = {}) {
      return run('protein_feature', qb.eq('sequence', sequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by source
     * @param {string} source - The source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getBySource(source, options = {}) {
      return run('protein_feature', qb.eq('source', source), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by source ID
     * @param {string} sourceId - The source ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getBySourceId(sourceId, options = {}) {
      return run('protein_feature', qb.eq('source_id', sourceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by start position
     * @param {number} start - The start position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByStart(start, options = {}) {
      return run('protein_feature', qb.eq('start', start), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('protein_feature', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by score range
     * @param {number} minScore - Minimum score
     * @param {number} maxScore - Maximum score
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByScoreRange(minScore, maxScore, options = {}) {
      return run('protein_feature', qb.and(qb.gte('score', minScore), qb.lte('score', maxScore)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by length range
     * @param {number} minLength - Minimum length
     * @param {number} maxLength - Maximum length
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByLengthRange(minLength, maxLength, options = {}) {
      return run('protein_feature', qb.and(qb.gte('length', minLength), qb.lte('length', maxLength)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by position range
     * @param {number} minStart - Minimum start position
     * @param {number} maxEnd - Maximum end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByPositionRange(minStart, maxEnd, options = {}) {
      return run('protein_feature', qb.and(qb.gte('start', minStart), qb.lte('end', maxEnd)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('protein_feature', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein features by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('protein_feature', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search protein features by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('protein_feature', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all protein features
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein feature data objects
     */
    getAll(options = {}) {
      return run('protein_feature', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 