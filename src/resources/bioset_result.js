import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function bioset_result(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a bioset_result data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Bioset result data object
     */
    getById(id, options = {}) {
      return run('bioset_result', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query bioset_result data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('bioset_result', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by bioset ID
     * @param {string} biosetId - The bioset ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByBiosetId(biosetId, options = {}) {
      return run('bioset_result', qb.eq('bioset_id', biosetId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by bioset name (case insensitive)
     * @param {string} biosetName - The bioset name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByBiosetName(biosetName, options = {}) {
      return run('bioset_result', qb.eq('bioset_name', biosetName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by bioset description (case insensitive)
     * @param {string} biosetDescription - The bioset description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByBiosetDescription(biosetDescription, options = {}) {
      return run('bioset_result', qb.eq('bioset_description', biosetDescription), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by bioset type (case insensitive)
     * @param {string} biosetType - The bioset type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByBiosetType(biosetType, options = {}) {
      return run('bioset_result', qb.eq('bioset_type', biosetType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by entity ID
     * @param {string} entityId - The entity ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByEntityId(entityId, options = {}) {
      return run('bioset_result', qb.eq('entity_id', entityId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by entity name
     * @param {string} entityName - The entity name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByEntityName(entityName, options = {}) {
      return run('bioset_result', qb.eq('entity_name', entityName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by entity type (case insensitive)
     * @param {string} entityType - The entity type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByEntityType(entityType, options = {}) {
      return run('bioset_result', qb.eq('entity_type', entityType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by experiment ID
     * @param {string} expId - The experiment ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByExpId(expId, options = {}) {
      return run('bioset_result', qb.eq('exp_id', expId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by experiment name (case insensitive)
     * @param {string} expName - The experiment name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByExpName(expName, options = {}) {
      return run('bioset_result', qb.eq('exp_name', expName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by experiment title (case insensitive)
     * @param {string} expTitle - The experiment title
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByExpTitle(expTitle, options = {}) {
      return run('bioset_result', qb.eq('exp_title', expTitle), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by experiment type (case insensitive)
     * @param {string} expType - The experiment type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByExpType(expType, options = {}) {
      return run('bioset_result', qb.eq('exp_type', expType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('bioset_result', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by gene (case insensitive)
     * @param {string} gene - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByGene(gene, options = {}) {
      return run('bioset_result', qb.eq('gene', gene), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by gene ID
     * @param {string} geneId - The gene ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByGeneId(geneId, options = {}) {
      return run('bioset_result', qb.eq('gene_id', geneId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('bioset_result', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by locus tag
     * @param {string} locusTag - The locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByLocusTag(locusTag, options = {}) {
      return run('bioset_result', qb.eq('locus_tag', locusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by organism (case insensitive)
     * @param {string} organism - The organism name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByOrganism(organism, options = {}) {
      return run('bioset_result', qb.eq('organism', organism), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('bioset_result', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by product (case insensitive)
     * @param {string} product - The product name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByProduct(product, options = {}) {
      return run('bioset_result', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by protein ID
     * @param {string} proteinId - The protein ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByProteinId(proteinId, options = {}) {
      return run('bioset_result', qb.eq('protein_id', proteinId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by result type (case insensitive)
     * @param {string} resultType - The result type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByResultType(resultType, options = {}) {
      return run('bioset_result', qb.eq('result_type', resultType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by strain (case insensitive)
     * @param {string} strain - The strain name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByStrain(strain, options = {}) {
      return run('bioset_result', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('bioset_result', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by UniProt ID
     * @param {string} uniprotId - The UniProt ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByUniprotId(uniprotId, options = {}) {
      return run('bioset_result', qb.eq('uniprot_id', uniprotId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by other ID
     * @param {string} otherId - The other ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByOtherId(otherId, options = {}) {
      return run('bioset_result', qb.eq('other_ids', otherId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by treatment name (case insensitive)
     * @param {string} treatmentName - The treatment name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByTreatmentName(treatmentName, options = {}) {
      return run('bioset_result', qb.eq('treatment_name', treatmentName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by treatment type (case insensitive)
     * @param {string} treatmentType - The treatment type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByTreatmentType(treatmentType, options = {}) {
      return run('bioset_result', qb.eq('treatment_type', treatmentType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by treatment amount (case insensitive)
     * @param {string} treatmentAmount - The treatment amount
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByTreatmentAmount(treatmentAmount, options = {}) {
      return run('bioset_result', qb.eq('treatment_amount', treatmentAmount), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by treatment duration (case insensitive)
     * @param {string} treatmentDuration - The treatment duration
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByTreatmentDuration(treatmentDuration, options = {}) {
      return run('bioset_result', qb.eq('treatment_duration', treatmentDuration), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by counts range
     * @param {number} minCounts - Minimum counts
     * @param {number} maxCounts - Maximum counts
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByCountsRange(minCounts, maxCounts, options = {}) {
      return run('bioset_result', qb.and(qb.gte('counts', minCounts), qb.lte('counts', maxCounts)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by FPKM range
     * @param {number} minFpkm - Minimum FPKM
     * @param {number} maxFpkm - Maximum FPKM
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByFpkmRange(minFpkm, maxFpkm, options = {}) {
      return run('bioset_result', qb.and(qb.gte('fpkm', minFpkm), qb.lte('fpkm', maxFpkm)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by log2 fold change range
     * @param {number} minLog2Fc - Minimum log2 fold change
     * @param {number} maxLog2Fc - Maximum log2 fold change
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByLog2FcRange(minLog2Fc, maxLog2Fc, options = {}) {
      return run('bioset_result', qb.and(qb.gte('log2_fc', minLog2Fc), qb.lte('log2_fc', maxLog2Fc)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by p-value range
     * @param {number} minPValue - Minimum p-value
     * @param {number} maxPValue - Maximum p-value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByPValueRange(minPValue, maxPValue, options = {}) {
      return run('bioset_result', qb.and(qb.gte('p_value', minPValue), qb.lte('p_value', maxPValue)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by TPM range
     * @param {number} minTpm - Minimum TPM
     * @param {number} maxTpm - Maximum TPM
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByTpmRange(minTpm, maxTpm, options = {}) {
      return run('bioset_result', qb.and(qb.gte('tpm', minTpm), qb.lte('tpm', maxTpm)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by other value range
     * @param {number} minValue - Minimum other value
     * @param {number} maxValue - Maximum other value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByOtherValueRange(minValue, maxValue, options = {}) {
      return run('bioset_result', qb.and(qb.gte('other_value', minValue), qb.lte('other_value', maxValue)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by z-score range
     * @param {number} minZScore - Minimum z-score
     * @param {number} maxZScore - Maximum z-score
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByZScoreRange(minZScore, maxZScore, options = {}) {
      return run('bioset_result', qb.and(qb.gte('z_score', minZScore), qb.lte('z_score', maxZScore)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by version
     * @param {number} version - The version number
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByVersion(version, options = {}) {
      return run('bioset_result', qb.eq('_version_', version), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('bioset_result', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get bioset results by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('bioset_result', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search bioset results by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('bioset_result', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all bioset results
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset result data objects
     */
    getAll(options = {}) {
      return run('bioset_result', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 