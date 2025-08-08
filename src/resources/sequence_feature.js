import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function sequenceFeature(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a sequence_feature data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Sequence feature data object
     */
    getById(id, options = {}) {
      return run('sequence_feature', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query sequence_feature data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('sequence_feature', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('sequence_feature', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('sequence_feature', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by genome name (case insensitive)
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('sequence_feature', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by gene name
     * @param {string} gene - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByGene(gene, options = {}) {
      return run('sequence_feature', qb.eq('gene', gene), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by product (case insensitive)
     * @param {string} product - The product name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByProduct(product, options = {}) {
      return run('sequence_feature', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('sequence_feature', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by GenBank accession
     * @param {string} genbankAccession - The GenBank accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByGenbankAccession(genbankAccession, options = {}) {
      return run('sequence_feature', qb.eq('genbank_accession', genbankAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by RefSeq locus tag
     * @param {string} refseqLocusTag - The RefSeq locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByRefseqLocusTag(refseqLocusTag, options = {}) {
      return run('sequence_feature', qb.eq('refseq_locus_tag', refseqLocusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by sequence feature category
     * @param {string} sfCategory - The sequence feature category
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySfCategory(sfCategory, options = {}) {
      return run('sequence_feature', qb.eq('sf_category', sfCategory), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by sequence feature ID
     * @param {string} sfId - The sequence feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySfId(sfId, options = {}) {
      return run('sequence_feature', qb.eq('sf_id', sfId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by sequence feature name (case insensitive)
     * @param {string} sfName - The sequence feature name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySfName(sfName, options = {}) {
      return run('sequence_feature', qb.eq('sf_name', sfName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by source
     * @param {string} source - The source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySource(source, options = {}) {
      return run('sequence_feature', qb.eq('source', source), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by source ID
     * @param {string} sourceId - The source ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySourceId(sourceId, options = {}) {
      return run('sequence_feature', qb.eq('source_id', sourceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by source strain
     * @param {string} sourceStrain - The source strain
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySourceStrain(sourceStrain, options = {}) {
      return run('sequence_feature', qb.eq('source_strain', sourceStrain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by segment
     * @param {string} segment - The segment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySegment(segment, options = {}) {
      return run('sequence_feature', qb.eq('segment', segment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by subtype
     * @param {string} subtype - The subtype
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySubtype(subtype, options = {}) {
      return run('sequence_feature', qb.eq('subtype', subtype), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('sequence_feature', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by evidence code
     * @param {string} evidenceCode - The evidence code
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByEvidenceCode(evidenceCode, options = {}) {
      return run('sequence_feature', qb.eq('evidence_code', evidenceCode), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by AA sequence MD5
     * @param {string} aaSequenceMd5 - The AA sequence MD5
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByAaSequenceMd5(aaSequenceMd5, options = {}) {
      return run('sequence_feature', qb.eq('aa_sequence_md5', aaSequenceMd5), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by AA variant
     * @param {string} aaVariant - The AA variant
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByAaVariant(aaVariant, options = {}) {
      return run('sequence_feature', qb.eq('aa_variant', aaVariant), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by sequence feature sequence MD5
     * @param {string} sfSequenceMd5 - The sequence feature sequence MD5
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySfSequenceMd5(sfSequenceMd5, options = {}) {
      return run('sequence_feature', qb.eq('sf_sequence_md5', sfSequenceMd5), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by source AA sequence
     * @param {string} sourceAaSequence - The source AA sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySourceAaSequence(sourceAaSequence, options = {}) {
      return run('sequence_feature', qb.eq('source_aa_sequence', sourceAaSequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by source sequence feature location
     * @param {string} sourceSfLocation - The source sequence feature location
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getBySourceSfLocation(sourceSfLocation, options = {}) {
      return run('sequence_feature', qb.eq('source_sf_location', sourceSfLocation), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by variant types
     * @param {string} variantTypes - The variant types
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByVariantTypes(variantTypes, options = {}) {
      return run('sequence_feature', qb.eq('variant_types', variantTypes), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by start position
     * @param {number} start - The start position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByStart(start, options = {}) {
      return run('sequence_feature', qb.eq('start', start), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by end position
     * @param {number} end - The end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByEnd(end, options = {}) {
      return run('sequence_feature', qb.eq('end', end), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by length
     * @param {number} length - The length
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByLength(length, options = {}) {
      return run('sequence_feature', qb.eq('length', length), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by position range
     * @param {number} start - Start position
     * @param {number} end - End position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByPositionRange(start, end, options = {}) {
      const filters = [
        qb.gte('start', start),
        qb.lte('end', end)
      ];
      return run('sequence_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by length range
     * @param {number} minLength - Minimum length
     * @param {number} maxLength - Maximum length
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByLengthRange(minLength, maxLength, options = {}) {
      const filters = [
        qb.gte('length', minLength),
        qb.lte('length', maxLength)
      ];
      return run('sequence_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('sequence_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence_feature data by modified date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getByModifiedDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_modified', startDate),
        qb.lt('date_modified', endDate)
      ];
      return run('sequence_feature', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search sequence_feature data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('sequence_feature', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all sequence_feature data with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of sequence_feature data objects
     */
    getAll(options = {}) {
      return run('sequence_feature', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

export default sequenceFeature; 