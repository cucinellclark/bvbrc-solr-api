import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function experiment(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a experiment data object by exp_id
     * @param {string} expId - The exp_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Experiment data object
     */
    getById(expId, options = {}) {
      return run('experiment', qb.eq('exp_id', expId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query experiment data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of experiment data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('experiment', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by additional data
     * @param {string} additionalData - The additional data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByAdditionalData(additionalData, options = {}) {
      return run('experiment', qb.eq('additional_data', additionalData), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by additional metadata (case insensitive)
     * @param {string} additionalMetadata - The additional metadata
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByAdditionalMetadata(additionalMetadata, options = {}) {
      return run('experiment', qb.eq('additional_metadata', additionalMetadata), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by biosets count
     * @param {number} biosets - The biosets count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByBiosets(biosets, options = {}) {
      return run('experiment', qb.eq('biosets', biosets), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by detection instrument (case insensitive)
     * @param {string} detectionInstrument - The detection instrument
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByDetectionInstrument(detectionInstrument, options = {}) {
      return run('experiment', qb.eq('detection_instrument', detectionInstrument), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by DOI
     * @param {string} doi - The DOI
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByDoi(doi, options = {}) {
      return run('experiment', qb.eq('doi', doi), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by experiment description (case insensitive)
     * @param {string} expDescription - The experiment description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByExpDescription(expDescription, options = {}) {
      return run('experiment', qb.eq('exp_description', expDescription), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by experiment name (case insensitive)
     * @param {string} expName - The experiment name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByExpName(expName, options = {}) {
      return run('experiment', qb.eq('exp_name', expName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by experiment POC (case insensitive)
     * @param {string} expPoc - The experiment POC
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByExpPoc(expPoc, options = {}) {
      return run('experiment', qb.eq('exp_poc', expPoc), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by experiment protocol (case insensitive)
     * @param {string} expProtocol - The experiment protocol
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByExpProtocol(expProtocol, options = {}) {
      return run('experiment', qb.eq('exp_protocol', expProtocol), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by experiment title (case insensitive)
     * @param {string} expTitle - The experiment title
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByExpTitle(expTitle, options = {}) {
      return run('experiment', qb.eq('exp_title', expTitle), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by experiment type (case insensitive)
     * @param {string} expType - The experiment type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByExpType(expType, options = {}) {
      return run('experiment', qb.eq('exp_type', expType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by experimenters (case insensitive)
     * @param {string} experimenters - The experimenters
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByExperimenters(experimenters, options = {}) {
      return run('experiment', qb.eq('experimenters', experimenters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('experiment', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by measurement technique (case insensitive)
     * @param {string} measurementTechnique - The measurement technique
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByMeasurementTechnique(measurementTechnique, options = {}) {
      return run('experiment', qb.eq('measurement_technique', measurementTechnique), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by organism (case insensitive)
     * @param {string} organism - The organism
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByOrganism(organism, options = {}) {
      return run('experiment', qb.eq('organism', organism), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by PMID
     * @param {string} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByPmid(pmid, options = {}) {
      return run('experiment', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by public identifier
     * @param {string} publicIdentifier - The public identifier
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByPublicIdentifier(publicIdentifier, options = {}) {
      return run('experiment', qb.eq('public_identifier', publicIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by public repository
     * @param {string} publicRepository - The public repository
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByPublicRepository(publicRepository, options = {}) {
      return run('experiment', qb.eq('public_repository', publicRepository), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by samples count
     * @param {number} samples - The samples count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getBySamples(samples, options = {}) {
      return run('experiment', qb.eq('samples', samples), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by strain (case insensitive)
     * @param {string} strain - The strain
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByStrain(strain, options = {}) {
      return run('experiment', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by study description (case insensitive)
     * @param {string} studyDescription - The study description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByStudyDescription(studyDescription, options = {}) {
      return run('experiment', qb.eq('study_description', studyDescription), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by study institution (case insensitive)
     * @param {string} studyInstitution - The study institution
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByStudyInstitution(studyInstitution, options = {}) {
      return run('experiment', qb.eq('study_institution', studyInstitution), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by study name (case insensitive)
     * @param {string} studyName - The study name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByStudyName(studyName, options = {}) {
      return run('experiment', qb.eq('study_name', studyName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by study PI (case insensitive)
     * @param {string} studyPi - The study PI
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByStudyPi(studyPi, options = {}) {
      return run('experiment', qb.eq('study_pi', studyPi), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by study title (case insensitive)
     * @param {string} studyTitle - The study title
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByStudyTitle(studyTitle, options = {}) {
      return run('experiment', qb.eq('study_title', studyTitle), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('experiment', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by taxon lineage IDs
     * @param {string} taxonLineageIds - The taxon lineage IDs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByTaxonLineageIds(taxonLineageIds, options = {}) {
      return run('experiment', qb.eq('taxon_lineage_ids', taxonLineageIds), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by treatment amount (case insensitive)
     * @param {string} treatmentAmount - The treatment amount
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByTreatmentAmount(treatmentAmount, options = {}) {
      return run('experiment', qb.eq('treatment_amount', treatmentAmount), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by treatment duration (case insensitive)
     * @param {string} treatmentDuration - The treatment duration
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByTreatmentDuration(treatmentDuration, options = {}) {
      return run('experiment', qb.eq('treatment_duration', treatmentDuration), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by treatment name (case insensitive)
     * @param {string} treatmentName - The treatment name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByTreatmentName(treatmentName, options = {}) {
      return run('experiment', qb.eq('treatment_name', treatmentName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by treatment type (case insensitive)
     * @param {string} treatmentType - The treatment type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByTreatmentType(treatmentType, options = {}) {
      return run('experiment', qb.eq('treatment_type', treatmentType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('experiment', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('experiment', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by biosets range
     * @param {number} minBiosets - Minimum biosets count
     * @param {number} maxBiosets - Maximum biosets count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getByBiosetsRange(minBiosets, maxBiosets, options = {}) {
      return run('experiment', qb.and(qb.gte('biosets', minBiosets), qb.lte('biosets', maxBiosets)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get experiments by samples range
     * @param {number} minSamples - Minimum samples count
     * @param {number} maxSamples - Maximum samples count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getBySamplesRange(minSamples, maxSamples, options = {}) {
      return run('experiment', qb.and(qb.gte('samples', minSamples), qb.lte('samples', maxSamples)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search experiment data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('experiment', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all experiment data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of experiment data objects
     */
    getAll(options = {}) {
      return run('experiment', '', options, ctx.baseUrl, ctx.headers);
    }
  };
} 