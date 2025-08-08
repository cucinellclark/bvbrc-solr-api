import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function antibiotics(context) {
  const ctx = context;

  return {
    /**
     * Retrieve antibiotics data by pubchem_cid
     * @param {string} pubchemCid - The pubchem_cid to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Antibiotics data object
     */
    getByPubchemCid(pubchemCid, options = {}) {
      return run('antibiotics', qb.eq('pubchem_cid', pubchemCid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query antibiotics data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('antibiotics', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search antibiotics by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('antibiotics', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get antibiotics by antibiotic name
     * @param {string} antibioticName - Name of the antibiotic
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    getByAntibioticName(antibioticName, options = {}) {
      return run('antibiotics', qb.eq('antibiotic_name', antibioticName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get antibiotics by CAS ID
     * @param {string} casId - CAS ID of the antibiotic
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    getByCasId(casId, options = {}) {
      return run('antibiotics', qb.eq('cas_id', casId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get antibiotics by molecular formula
     * @param {string} molecularFormula - Molecular formula
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    getByMolecularFormula(molecularFormula, options = {}) {
      return run('antibiotics', qb.eq('molecular_formula', molecularFormula), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get antibiotics by ATC classification
     * @param {string} atcClassification - ATC classification code
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    getByAtcClassification(atcClassification, options = {}) {
      return run('antibiotics', qb.eq('atc_classification', atcClassification), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get antibiotics by mechanism of action
     * @param {string} mechanismOfAction - Mechanism of action
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    getByMechanismOfAction(mechanismOfAction, options = {}) {
      return run('antibiotics', qb.eq('mechanism_of_action', mechanismOfAction), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get antibiotics by pharmacological class
     * @param {string} pharmacologicalClass - Pharmacological class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    getByPharmacologicalClass(pharmacologicalClass, options = {}) {
      return run('antibiotics', qb.eq('pharmacological_classes', pharmacologicalClass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get antibiotics by synonym
     * @param {string} synonym - Synonym of the antibiotic
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    getBySynonym(synonym, options = {}) {
      return run('antibiotics', qb.eq('synonyms', synonym), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get antibiotics by molecular weight range
     * @param {number} minWeight - Minimum molecular weight
     * @param {number} maxWeight - Maximum molecular weight
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    getByMolecularWeightRange(minWeight, maxWeight, options = {}) {
      const filters = [
        qb.gt('molecular_weight', minWeight),
        qb.lt('molecular_weight', maxWeight)
      ];
      return run('antibiotics', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get antibiotics by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('antibiotics', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all antibiotics with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of antibiotics data objects
     */
    getAll(options = {}) {
      return run('antibiotics', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

export default antibiotics;

