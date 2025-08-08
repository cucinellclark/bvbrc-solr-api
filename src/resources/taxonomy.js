import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function taxonomy(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a taxonomy data object by taxon_id
     * @param {string} taxonId - The taxon_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Taxonomy data object
     */
    getById(taxonId, options = {}) {
      return run('taxonomy', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query taxonomy data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('taxonomy', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by CDS mean
     * @param {number} cdsMean - The CDS mean
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByCdsMean(cdsMean, options = {}) {
      return run('taxonomy', qb.eq('cds_mean', cdsMean), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by CDS standard deviation
     * @param {number} cdsSd - The CDS standard deviation
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByCdsSd(cdsSd, options = {}) {
      return run('taxonomy', qb.eq('cds_sd', cdsSd), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by core families count
     * @param {number} coreFamilies - The core families count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByCoreFamilies(coreFamilies, options = {}) {
      return run('taxonomy', qb.eq('core_families', coreFamilies), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by core family IDs
     * @param {string} coreFamilyIds - The core family IDs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByCoreFamilyIds(coreFamilyIds, options = {}) {
      return run('taxonomy', qb.eq('core_family_ids', coreFamilyIds), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by description
     * @param {string} description - The description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByDescription(description, options = {}) {
      return run('taxonomy', qb.eq('description', description), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by division
     * @param {string} division - The division
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByDivision(division, options = {}) {
      return run('taxonomy', qb.eq('division', division), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by genetic code
     * @param {number} geneticCode - The genetic code
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByGeneticCode(geneticCode, options = {}) {
      return run('taxonomy', qb.eq('genetic_code', geneticCode), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by genome count
     * @param {number} genomeCount - The genome count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByGenomeCount(genomeCount, options = {}) {
      return run('taxonomy', qb.eq('genome_count', genomeCount), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by genome length mean
     * @param {number} genomeLengthMean - The genome length mean
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByGenomeLengthMean(genomeLengthMean, options = {}) {
      return run('taxonomy', qb.eq('genome_length_mean', genomeLengthMean), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by genome length standard deviation
     * @param {number} genomeLengthSd - The genome length standard deviation
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByGenomeLengthSd(genomeLengthSd, options = {}) {
      return run('taxonomy', qb.eq('genome_length_sd', genomeLengthSd), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by genomes count
     * @param {number} genomes - The genomes count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByGenomes(genomes, options = {}) {
      return run('taxonomy', qb.eq('genomes', genomes), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by genomes F
     * @param {string} genomesF - The genomes F
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByGenomesF(genomesF, options = {}) {
      return run('taxonomy', qb.eq('genomes_f', genomesF), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by hypothetical CDS ratio mean
     * @param {number} hypotheticalCdsRatioMean - The hypothetical CDS ratio mean
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByHypotheticalCdsRatioMean(hypotheticalCdsRatioMean, options = {}) {
      return run('taxonomy', qb.eq('hypothetical_cds_ratio_mean', hypotheticalCdsRatioMean), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by hypothetical CDS ratio standard deviation
     * @param {number} hypotheticalCdsRatioSd - The hypothetical CDS ratio standard deviation
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByHypotheticalCdsRatioSd(hypotheticalCdsRatioSd, options = {}) {
      return run('taxonomy', qb.eq('hypothetical_cds_ratio_sd', hypotheticalCdsRatioSd), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by lineage
     * @param {string} lineage - The lineage
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByLineage(lineage, options = {}) {
      return run('taxonomy', qb.eq('lineage', lineage), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by lineage IDs
     * @param {string} lineageIds - The lineage IDs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByLineageIds(lineageIds, options = {}) {
      return run('taxonomy', qb.eq('lineage_ids', lineageIds), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by lineage names
     * @param {string} lineageNames - The lineage names
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByLineageNames(lineageNames, options = {}) {
      return run('taxonomy', qb.eq('lineage_names', lineageNames), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by lineage ranks
     * @param {string} lineageRanks - The lineage ranks
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByLineageRanks(lineageRanks, options = {}) {
      return run('taxonomy', qb.eq('lineage_ranks', lineageRanks), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by other names (case insensitive)
     * @param {string} otherNames - The other names
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByOtherNames(otherNames, options = {}) {
      return run('taxonomy', qb.eq('other_names', otherNames), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by parent ID
     * @param {number} parentId - The parent ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByParentId(parentId, options = {}) {
      return run('taxonomy', qb.eq('parent_id', parentId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by PLFAM CDS ratio mean
     * @param {number} plfamCdsRatioMean - The PLFAM CDS ratio mean
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByPlfamCdsRatioMean(plfamCdsRatioMean, options = {}) {
      return run('taxonomy', qb.eq('plfam_cds_ratio_mean', plfamCdsRatioMean), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by PLFAM CDS ratio standard deviation
     * @param {number} plfamCdsRatioSd - The PLFAM CDS ratio standard deviation
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByPlfamCdsRatioSd(plfamCdsRatioSd, options = {}) {
      return run('taxonomy', qb.eq('plfam_cds_ratio_sd', plfamCdsRatioSd), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by taxon ID integer
     * @param {number} taxonIdI - The taxon ID integer
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByTaxonIdI(taxonIdI, options = {}) {
      return run('taxonomy', qb.eq('taxon_id_i', taxonIdI), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by taxon name (case insensitive)
     * @param {string} taxonName - The taxon name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByTaxonName(taxonName, options = {}) {
      return run('taxonomy', qb.eq('taxon_name', taxonName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by taxon rank
     * @param {string} taxonRank - The taxon rank
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByTaxonRank(taxonRank, options = {}) {
      return run('taxonomy', qb.eq('taxon_rank', taxonRank), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by CDS mean range
     * @param {number} minCdsMean - Minimum CDS mean
     * @param {number} maxCdsMean - Maximum CDS mean
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByCdsMeanRange(minCdsMean, maxCdsMean, options = {}) {
      return run('taxonomy', qb.and(qb.gte('cds_mean', minCdsMean), qb.lte('cds_mean', maxCdsMean)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by core families range
     * @param {number} minCoreFamilies - Minimum core families
     * @param {number} maxCoreFamilies - Maximum core families
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByCoreFamiliesRange(minCoreFamilies, maxCoreFamilies, options = {}) {
      return run('taxonomy', qb.and(qb.gte('core_families', minCoreFamilies), qb.lte('core_families', maxCoreFamilies)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by genetic code range
     * @param {number} minGeneticCode - Minimum genetic code
     * @param {number} maxGeneticCode - Maximum genetic code
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByGeneticCodeRange(minGeneticCode, maxGeneticCode, options = {}) {
      return run('taxonomy', qb.and(qb.gte('genetic_code', minGeneticCode), qb.lte('genetic_code', maxGeneticCode)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by genome count range
     * @param {number} minGenomeCount - Minimum genome count
     * @param {number} maxGenomeCount - Maximum genome count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByGenomeCountRange(minGenomeCount, maxGenomeCount, options = {}) {
      return run('taxonomy', qb.and(qb.gte('genome_count', minGenomeCount), qb.lte('genome_count', maxGenomeCount)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by genome length mean range
     * @param {number} minGenomeLengthMean - Minimum genome length mean
     * @param {number} maxGenomeLengthMean - Maximum genome length mean
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByGenomeLengthMeanRange(minGenomeLengthMean, maxGenomeLengthMean, options = {}) {
      return run('taxonomy', qb.and(qb.gte('genome_length_mean', minGenomeLengthMean), qb.lte('genome_length_mean', maxGenomeLengthMean)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by genomes range
     * @param {number} minGenomes - Minimum genomes
     * @param {number} maxGenomes - Maximum genomes
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByGenomesRange(minGenomes, maxGenomes, options = {}) {
      return run('taxonomy', qb.and(qb.gte('genomes', minGenomes), qb.lte('genomes', maxGenomes)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by hypothetical CDS ratio mean range
     * @param {number} minHypotheticalCdsRatioMean - Minimum hypothetical CDS ratio mean
     * @param {number} maxHypotheticalCdsRatioMean - Maximum hypothetical CDS ratio mean
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByHypotheticalCdsRatioMeanRange(minHypotheticalCdsRatioMean, maxHypotheticalCdsRatioMean, options = {}) {
      return run('taxonomy', qb.and(qb.gte('hypothetical_cds_ratio_mean', minHypotheticalCdsRatioMean), qb.lte('hypothetical_cds_ratio_mean', maxHypotheticalCdsRatioMean)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by parent ID range
     * @param {number} minParentId - Minimum parent ID
     * @param {number} maxParentId - Maximum parent ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByParentIdRange(minParentId, maxParentId, options = {}) {
      return run('taxonomy', qb.and(qb.gte('parent_id', minParentId), qb.lte('parent_id', maxParentId)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by PLFAM CDS ratio mean range
     * @param {number} minPlfamCdsRatioMean - Minimum PLFAM CDS ratio mean
     * @param {number} maxPlfamCdsRatioMean - Maximum PLFAM CDS ratio mean
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByPlfamCdsRatioMeanRange(minPlfamCdsRatioMean, maxPlfamCdsRatioMean, options = {}) {
      return run('taxonomy', qb.and(qb.gte('plfam_cds_ratio_mean', minPlfamCdsRatioMean), qb.lte('plfam_cds_ratio_mean', maxPlfamCdsRatioMean)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get taxonomy entries by taxon ID integer range
     * @param {number} minTaxonIdI - Minimum taxon ID integer
     * @param {number} maxTaxonIdI - Maximum taxon ID integer
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getByTaxonIdIRange(minTaxonIdI, maxTaxonIdI, options = {}) {
      return run('taxonomy', qb.and(qb.gte('taxon_id_i', minTaxonIdI), qb.lte('taxon_id_i', maxTaxonIdI)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search taxonomy data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('taxonomy', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all taxonomy data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of taxonomy data objects
     */
    getAll(options = {}) {
      return run('taxonomy', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 