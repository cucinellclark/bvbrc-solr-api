import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function bioset(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a bioset data object by bioset_id
     * @param {string} biosetId - The bioset_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Bioset data object
     */
    getById(biosetId, options = {}) {
      return run('bioset', qb.eq('bioset_id', biosetId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query bioset data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of bioset data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('bioset', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by bioset name (case insensitive)
     * @param {string} biosetName - The bioset name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByBiosetName(biosetName, options = {}) {
      return run('bioset', qb.eq('bioset_name', biosetName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by bioset type (case insensitive)
     * @param {string} biosetType - The bioset type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByBiosetType(biosetType, options = {}) {
      return run('bioset', qb.eq('bioset_type', biosetType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by experiment ID
     * @param {string} expId - The experiment ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByExpId(expId, options = {}) {
      return run('bioset', qb.eq('exp_id', expId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by experiment name (case insensitive)
     * @param {string} expName - The experiment name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByExpName(expName, options = {}) {
      return run('bioset', qb.eq('exp_name', expName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by experiment type (case insensitive)
     * @param {string} expType - The experiment type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByExpType(expType, options = {}) {
      return run('bioset', qb.eq('exp_type', expType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by organism (case insensitive)
     * @param {string} organism - The organism name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByOrganism(organism, options = {}) {
      return run('bioset', qb.eq('organism', organism), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by strain (case insensitive)
     * @param {string} strain - The strain name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByStrain(strain, options = {}) {
      return run('bioset', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('bioset', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by entity type (case insensitive)
     * @param {string} entityType - The entity type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByEntityType(entityType, options = {}) {
      return run('bioset', qb.eq('entity_type', entityType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by result type (case insensitive)
     * @param {string} resultType - The result type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByResultType(resultType, options = {}) {
      return run('bioset', qb.eq('result_type', resultType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by analysis method (case insensitive)
     * @param {string} analysisMethod - The analysis method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByAnalysisMethod(analysisMethod, options = {}) {
      return run('bioset', qb.eq('analysis_method', analysisMethod), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by analysis group 1 (case insensitive)
     * @param {string} analysisGroup1 - The analysis group 1
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByAnalysisGroup1(analysisGroup1, options = {}) {
      return run('bioset', qb.eq('analysis_group_1', analysisGroup1), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by analysis group 2 (case insensitive)
     * @param {string} analysisGroup2 - The analysis group 2
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByAnalysisGroup2(analysisGroup2, options = {}) {
      return run('bioset', qb.eq('analysis_group_2', analysisGroup2), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by treatment type (case insensitive)
     * @param {string} treatmentType - The treatment type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByTreatmentType(treatmentType, options = {}) {
      return run('bioset', qb.eq('treatment_type', treatmentType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by treatment name (case insensitive)
     * @param {string} treatmentName - The treatment name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByTreatmentName(treatmentName, options = {}) {
      return run('bioset', qb.eq('treatment_name', treatmentName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by study name (case insensitive)
     * @param {string} studyName - The study name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByStudyName(studyName, options = {}) {
      return run('bioset', qb.eq('study_name', studyName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by study PI (case insensitive)
     * @param {string} studyPi - The study PI
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByStudyPi(studyPi, options = {}) {
      return run('bioset', qb.eq('study_pi', studyPi), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by study institution (case insensitive)
     * @param {string} studyInstitution - The study institution
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByStudyInstitution(studyInstitution, options = {}) {
      return run('bioset', qb.eq('study_institution', studyInstitution), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('bioset', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('bioset', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get biosets by modified date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getByModifiedDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_modified', startDate),
        qb.lt('date_modified', endDate)
      ];
      return run('bioset', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search biosets by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of bioset data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('bioset', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all biosets with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of bioset data objects
     */
    getAll(options = {}) {
      return run('bioset', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

export default bioset; 