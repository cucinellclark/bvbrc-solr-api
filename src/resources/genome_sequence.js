import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function genomeSequence(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a genome_sequence data object by sequence_id
     * @param {string} sequenceId - The sequence_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Genome sequence data object
     */
    getById(sequenceId, options = {}) {
      return run('genome_sequence', qb.eq('sequence_id', sequenceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query genome_sequence data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('genome_sequence', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by accession
     * @param {string} accession - The accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByAccession(accession, options = {}) {
      return run('genome_sequence', qb.eq('accession', accession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by chromosome (case insensitive)
     * @param {string} chromosome - The chromosome
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByChromosome(chromosome, options = {}) {
      return run('genome_sequence', qb.eq('chromosome', chromosome), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by description (case insensitive)
     * @param {string} description - The description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByDescription(description, options = {}) {
      return run('genome_sequence', qb.eq('description', description), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by GC content
     * @param {number} gcContent - The GC content
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByGcContent(gcContent, options = {}) {
      return run('genome_sequence', qb.eq('gc_content', gcContent), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('genome_sequence', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by genome name (case insensitive)
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('genome_sequence', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by GI
     * @param {number} gi - The GI
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByGi(gi, options = {}) {
      return run('genome_sequence', qb.eq('gi', gi), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by length
     * @param {number} length - The length
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByLength(length, options = {}) {
      return run('genome_sequence', qb.eq('length', length), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by mol type (case insensitive)
     * @param {string} molType - The mol type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByMolType(molType, options = {}) {
      return run('genome_sequence', qb.eq('mol_type', molType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by owner
     * @param {string} owner - The owner
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByOwner(owner, options = {}) {
      return run('genome_sequence', qb.eq('owner', owner), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by P2 sequence ID
     * @param {number} p2SequenceId - The P2 sequence ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByP2SequenceId(p2SequenceId, options = {}) {
      return run('genome_sequence', qb.eq('p2_sequence_id', p2SequenceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by plasmid (case insensitive)
     * @param {string} plasmid - The plasmid
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByPlasmid(plasmid, options = {}) {
      return run('genome_sequence', qb.eq('plasmid', plasmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by public status
     * @param {boolean} isPublic - The public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('genome_sequence', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by segment (case insensitive)
     * @param {string} segment - The segment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getBySegment(segment, options = {}) {
      return run('genome_sequence', qb.eq('segment', segment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by sequence MD5
     * @param {string} sequenceMd5 - The sequence MD5
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getBySequenceMd5(sequenceMd5, options = {}) {
      return run('genome_sequence', qb.eq('sequence_md5', sequenceMd5), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by sequence status
     * @param {string} sequenceStatus - The sequence status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getBySequenceStatus(sequenceStatus, options = {}) {
      return run('genome_sequence', qb.eq('sequence_status', sequenceStatus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by sequence type (case insensitive)
     * @param {string} sequenceType - The sequence type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getBySequenceType(sequenceType, options = {}) {
      return run('genome_sequence', qb.eq('sequence_type', sequenceType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('genome_sequence', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by topology (case insensitive)
     * @param {string} topology - The topology
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByTopology(topology, options = {}) {
      return run('genome_sequence', qb.eq('topology', topology), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by version
     * @param {number} version - The version
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByVersion(version, options = {}) {
      return run('genome_sequence', qb.eq('version', version), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by length range
     * @param {number} minLength - Minimum length
     * @param {number} maxLength - Maximum length
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByLengthRange(minLength, maxLength, options = {}) {
      return run('genome_sequence', qb.and(qb.gte('length', minLength), qb.lte('length', maxLength)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by GC content range
     * @param {number} minGcContent - Minimum GC content
     * @param {number} maxGcContent - Maximum GC content
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByGcContentRange(minGcContent, maxGcContent, options = {}) {
      return run('genome_sequence', qb.and(qb.gte('gc_content', minGcContent), qb.lte('gc_content', maxGcContent)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('genome_sequence', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('genome_sequence', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome sequences by release date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getByReleaseDateRange(startDate, endDate, options = {}) {
      return run('genome_sequence', qb.and(qb.gte('release_date', startDate), qb.lte('release_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search genome sequences by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('genome_sequence', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all genome sequences
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome sequence data objects
     */
    getAll(options = {}) {
      return run('genome_sequence', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 