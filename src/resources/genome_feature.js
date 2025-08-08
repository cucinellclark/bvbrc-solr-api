import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function genomeFeature(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a genome_feature data object by feature_id
     * @param {string} featureId - The feature_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Genome feature data object
     */
    getById(featureId, options = {}) {
      return run('genome_feature', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query genome_feature data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('genome_feature', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('genome_feature', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by genome name (case insensitive)
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('genome_feature', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by gene name (case insensitive)
     * @param {string} geneName - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByGene(geneName, options = {}) {
      return run('genome_feature', qb.eq('gene', geneName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by product name (case insensitive)
     * @param {string} productName - The product name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByProduct(productName, options = {}) {
      return run('genome_feature', qb.eq('product', productName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by feature type
     * @param {string} featureType - The feature type (e.g., 'CDS', 'tRNA', 'rRNA')
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByFeatureType(featureType, options = {}) {
      return run('genome_feature', qb.eq('feature_type', featureType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by annotation type
     * @param {string} annotationType - The annotation type (e.g., 'PATRIC', 'RefSeq')
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByAnnotation(annotationType, options = {}) {
      return run('genome_feature', qb.eq('annotation', annotationType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('genome_feature', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by protein ID
     * @param {string} proteinId - The protein ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByProteinId(proteinId, options = {}) {
      return run('genome_feature', qb.eq('protein_id', proteinId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by accession
     * @param {string} accession - The accession number
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByAccession(accession, options = {}) {
      return run('genome_feature', qb.eq('accession', accession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by UniProtKB accession
     * @param {string} uniprotAccession - The UniProtKB accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByUniprotAccession(uniprotAccession, options = {}) {
      return run('genome_feature', qb.eq('uniprotkb_accession', uniprotAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by FIGfam ID
     * @param {string} figfamId - The FIGfam ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByFigfamId(figfamId, options = {}) {
      return run('genome_feature', qb.eq('figfam_id', figfamId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by PGFam ID
     * @param {string} pgfamId - The PGFam ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByPgfamId(pgfamId, options = {}) {
      return run('genome_feature', qb.eq('pgfam_id', pgfamId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by PLfam ID
     * @param {string} plfamId - The PLfam ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByPlfamId(plfamId, options = {}) {
      return run('genome_feature', qb.eq('plfam_id', plfamId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by GO term (case insensitive)
     * @param {string} goTerm - The GO term
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByGoTerm(goTerm, options = {}) {
      return run('genome_feature', qb.eq('go', goTerm), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by strand
     * @param {string} strand - The strand ('+' or '-')
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByStrand(strand, options = {}) {
      return run('genome_feature', qb.eq('strand', strand), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by location range
     * @param {number} start - Start position
     * @param {number} end - End position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByLocationRange(start, end, options = {}) {
      const filters = [
        qb.gt('start', start),
        qb.lt('end', end)
      ];
      return run('genome_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by sequence length range
     * @param {number} minLength - Minimum sequence length
     * @param {number} maxLength - Maximum sequence length
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getBySequenceLengthRange(minLength, maxLength, options = {}) {
      const filters = [
        qb.gt('na_length', minLength),
        qb.lt('na_length', maxLength)
      ];
      return run('genome_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by protein length range
     * @param {number} minLength - Minimum protein length
     * @param {number} maxLength - Maximum protein length
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByProteinLengthRange(minLength, maxLength, options = {}) {
      const filters = [
        qb.gt('aa_length', minLength),
        qb.lt('aa_length', maxLength)
      ];
      return run('genome_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by classifier score range
     * @param {number} minScore - Minimum classifier score
     * @param {number} maxScore - Maximum classifier score
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByClassifierScoreRange(minScore, maxScore, options = {}) {
      const filters = [
        qb.gt('classifier_score', minScore),
        qb.lt('classifier_score', maxScore)
      ];
      return run('genome_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('genome_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by public status
     * @param {boolean} isPublic - Public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('genome_feature', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('genome_feature', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome features by sequence ID
     * @param {string} sequenceId - The sequence ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getBySequenceId(sequenceId, options = {}) {
      return run('genome_feature', qb.eq('sequence_id', sequenceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all genome features with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of genome feature data objects
     */
    getAll(options = {}) {
      return run('genome_feature', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

export default genomeFeature;

