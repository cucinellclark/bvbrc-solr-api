// Runtime configuration system
let runtimeConfig = {
  auth_token: null
};

// Try to load from config.json in development (Node.js environment)
function loadConfigFile() {
  try {
    // Only try to load from file in Node.js environment
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
      const fs = require('fs');
      const path = require('path');
      const configPath = path.join(process.cwd(), 'config.json');
      const configData = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(configData);
    }
  } catch (error) {
    // Silently fail in browser or if file doesn't exist
  }
  return { auth_token: null };
}

// Initialize with file config if available
const fileConfig = loadConfigFile();
runtimeConfig.auth_token = fileConfig.auth_token;

function setAuthToken(token) {
  runtimeConfig.auth_token = token;
}

function getAuthToken() {
  return runtimeConfig.auth_token || null;
}

function getConfig() {
  return { ...runtimeConfig };
}

function setConfig(config) {
  runtimeConfig = { ...runtimeConfig, ...config };
}

const DEFAULT_BASE_URL = 'https://www.bv-brc.org/api';
const DEFAULT_HEADERS = { 
  Accept: 'application/json',
  'Content-Type': 'application/rqlquery+x-www-form-urlencoded'
};

function createContext(overrides = {}) {
  const { baseUrl, headers } = overrides;
  
  // Get auth token from config
  const authToken = getAuthToken();
  const authHeaders = authToken ? { Authorization: authToken } : {};
  
  return {
    baseUrl: baseUrl || DEFAULT_BASE_URL,
    headers: { ...DEFAULT_HEADERS, ...authHeaders, ...(headers || {}) },
  };
}

async function run(coreName, filter, options = {}, baseUrl, headers) {
  const { select, sort, limit, http_download = false } = options || {};

  // Validate that sort is provided when http_download is true
  if (http_download && !sort) {
    throw new Error('sort parameter is required when http_download is true');
  }

  // Set default limit to 1000 if not provided
  const finalLimit = Number.isInteger(limit) ? limit : 1000;

  const params = [];
  if (filter) params.push(filter);
  if (select && select.length) params.push(`select(${select.join(',')})`);
  if (sort) params.push(`sort(${sort})`);
  if (Number.isInteger(finalLimit)) params.push(`limit(${finalLimit})`);
  if (http_download) params.push('http_download=true');

  const url = `${(baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '')}/${coreName}/`;
  const body = params.join('&');
  
  // Ensure headers include authentication if not provided
  const finalHeaders = headers || DEFAULT_HEADERS;
  if (!finalHeaders.Authorization) {
    const authToken = getAuthToken();
    if (authToken) {
      finalHeaders.Authorization = authToken;
    }
  }
  
  console.log(url);
  console.log(finalHeaders);
  console.log('Request body:', body);
  const response = await fetch(url, { 
    method: 'POST',
    headers: finalHeaders,
    body: body
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

const encode = (value) => {
  // Special handling for strand field - wrap + and - in backslash quotes
  if (typeof value === 'string' && (value === '+' || value === '-')) {
    return encodeURIComponent(`\"${value}\"`);
  }
  return encodeURIComponent(value);
};

function eq(fieldName, value) {
  return `eq(${fieldName},${encode(value)})`;
}


function gt(fieldName, value) {
  return `gt(${fieldName},${encode(value)})`;
}

function lt(fieldName, value) {
  return `lt(${fieldName},${encode(value)})`;
}

function andFilters(...parts) {
  const cleaned = parts.filter((p) => Boolean(p));
  return cleaned.length ? `and(${cleaned.join(',')})` : '';
}

function orFilters(...parts) {
  const cleaned = parts.filter((p) => Boolean(p));
  return cleaned.length ? `or(${cleaned.join(',')})` : '';
}

function inFilters(fieldName, values) {
  return values.length ? `in(${fieldName},${values.map(encode).join(',')})` : '';
}

function select(fields) {
  return fields && fields.length ? `select(${fields.join(',')})` : '';
}

function sort(sortExpr) {
  return sortExpr ? `sort(${sortExpr})` : '';
}

function limit(limitValue) {
  return Number.isInteger(limitValue) ? `limit(${limitValue})` : '';
}

function httpDownload(enable = false) {
  return enable ? 'http_download=true' : '';
}

function objToEq(filters = {}) {
  return Object.entries(filters).map(([key, value]) => eq(key, value));
}

function buildAndFrom(filters = {}) {
  return andFilters(...objToEq(filters));
}

const qb = {
  eq,
  gt,
  lt,
  and: andFilters,
  or: orFilters,
  in: inFilters,
  select,
  sort,
  limit,
  httpDownload,
  objToEq,
  buildAndFrom,
};

function antibiotics(context) {
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

function bioset(context) {
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

function bioset_result(context) {
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

function enzyme_class_ref(context) {
  const ctx = context;

  return {
    /**
     * Retrieve an enzyme_class_ref data object by ec_number
     * @param {string} ecNumber - The ec_number to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Enzyme class reference data object
     */
    getById(ecNumber, options = {}) {
      return run('enzyme_class_ref', qb.eq('ec_number', ecNumber), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query enzyme_class_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('enzyme_class_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get enzyme class references by EC description
     * @param {string} ecDescription - The EC description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getByEcDescription(ecDescription, options = {}) {
      return run('enzyme_class_ref', qb.eq('ec_description', ecDescription), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get enzyme class references by GO term (case insensitive)
     * @param {string} goTerm - The GO term
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getByGo(goTerm, options = {}) {
      return run('enzyme_class_ref', qb.eq('go', goTerm), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get enzyme class references by version
     * @param {number} version - The version number
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getByVersion(version, options = {}) {
      return run('enzyme_class_ref', qb.eq('_version_', version), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get enzyme class references by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('enzyme_class_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get enzyme class references by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('enzyme_class_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search enzyme class references by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('enzyme_class_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all enzyme class references
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of enzyme class reference data objects
     */
    getAll(options = {}) {
      return run('enzyme_class_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function epitope(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a epitope data object by epitope_id
     * @param {string} epitopeId - The epitope_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Epitope data object
     */
    getById(epitopeId, options = {}) {
      return run('epitope', qb.eq('epitope_id', epitopeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query epitope data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of epitope data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('epitope', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by epitope sequence
     * @param {string} epitopeSequence - The epitope sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByEpitopeSequence(epitopeSequence, options = {}) {
      return run('epitope', qb.eq('epitope_sequence', epitopeSequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by epitope type
     * @param {string} epitopeType - The epitope type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByEpitopeType(epitopeType, options = {}) {
      return run('epitope', qb.eq('epitope_type', epitopeType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by host name (case insensitive)
     * @param {string} hostName - The host name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByHostName(hostName, options = {}) {
      return run('epitope', qb.eq('host_name', hostName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by organism (case insensitive)
     * @param {string} organism - The organism name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByOrganism(organism, options = {}) {
      return run('epitope', qb.eq('organism', organism), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by protein accession
     * @param {string} proteinAccession - The protein accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByProteinAccession(proteinAccession, options = {}) {
      return run('epitope', qb.eq('protein_accession', proteinAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by protein ID
     * @param {string} proteinId - The protein ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByProteinId(proteinId, options = {}) {
      return run('epitope', qb.eq('protein_id', proteinId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by protein name (case insensitive)
     * @param {string} proteinName - The protein name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByProteinName(proteinName, options = {}) {
      return run('epitope', qb.eq('protein_name', proteinName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by start position
     * @param {number} start - The start position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByStart(start, options = {}) {
      return run('epitope', qb.eq('start', start), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by end position
     * @param {number} end - The end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByEnd(end, options = {}) {
      return run('epitope', qb.eq('end', end), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('epitope', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by B-cell assays
     * @param {string} bcellAssays - The B-cell assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByBcellAssays(bcellAssays, options = {}) {
      return run('epitope', qb.eq('bcell_assays', bcellAssays), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by MHC assays
     * @param {string} mhcAssays - The MHC assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByMhcAssays(mhcAssays, options = {}) {
      return run('epitope', qb.eq('mhc_assays', mhcAssays), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by T-cell assays
     * @param {string} tcellAssays - The T-cell assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTcellAssays(tcellAssays, options = {}) {
      return run('epitope', qb.eq('tcell_assays', tcellAssays), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by total assays
     * @param {number} totalAssays - The total number of assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTotalAssays(totalAssays, options = {}) {
      return run('epitope', qb.eq('total_assays', totalAssays), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by comment (case insensitive)
     * @param {string} comment - The comment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByComment(comment, options = {}) {
      return run('epitope', qb.eq('comments', comment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by assay results
     * @param {string} assayResult - The assay result
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByAssayResult(assayResult, options = {}) {
      return run('epitope', qb.eq('assay_results', assayResult), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by taxon lineage ID
     * @param {string} taxonLineageId - The taxon lineage ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTaxonLineageId(taxonLineageId, options = {}) {
      return run('epitope', qb.eq('taxon_lineage_ids', taxonLineageId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by taxon lineage name
     * @param {string} taxonLineageName - The taxon lineage name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTaxonLineageName(taxonLineageName, options = {}) {
      return run('epitope', qb.eq('taxon_lineage_names', taxonLineageName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by position range
     * @param {number} minStart - Minimum start position
     * @param {number} maxEnd - Maximum end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByPositionRange(minStart, maxEnd, options = {}) {
      return run('epitope', qb.and(qb.gte('start', minStart), qb.lte('end', maxEnd)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by total assays range
     * @param {number} minAssays - Minimum number of assays
     * @param {number} maxAssays - Maximum number of assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByTotalAssaysRange(minAssays, maxAssays, options = {}) {
      return run('epitope', qb.and(qb.gte('total_assays', minAssays), qb.lte('total_assays', maxAssays)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('epitope', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitopes by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('epitope', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search epitopes by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('epitope', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all epitopes
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope data objects
     */
    getAll(options = {}) {
      return run('epitope', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function epitopeAssay(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a epitope_assay data object by assay_id
     * @param {string} assayId - The assay_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Epitope assay data object
     */
    getById(assayId, options = {}) {
      return run('epitope_assay', qb.eq('assay_id', assayId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query epitope_assay data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('epitope_assay', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay group
     * @param {string} assayGroup - The assay group
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayGroup(assayGroup, options = {}) {
      return run('epitope_assay', qb.eq('assay_group', assayGroup), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay measurement
     * @param {string} assayMeasurement - The assay measurement
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayMeasurement(assayMeasurement, options = {}) {
      return run('epitope_assay', qb.eq('assay_measurement', assayMeasurement), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay measurement unit
     * @param {string} assayMeasurementUnit - The assay measurement unit
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayMeasurementUnit(assayMeasurementUnit, options = {}) {
      return run('epitope_assay', qb.eq('assay_measurement_unit', assayMeasurementUnit), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay method
     * @param {string} assayMethod - The assay method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayMethod(assayMethod, options = {}) {
      return run('epitope_assay', qb.eq('assay_method', assayMethod), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay result
     * @param {string} assayResult - The assay result
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayResult(assayResult, options = {}) {
      return run('epitope_assay', qb.eq('assay_result', assayResult), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by assay type
     * @param {string} assayType - The assay type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAssayType(assayType, options = {}) {
      return run('epitope_assay', qb.eq('assay_type', assayType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by authors
     * @param {string} authors - The authors
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByAuthors(authors, options = {}) {
      return run('epitope_assay', qb.eq('authors', authors), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by epitope ID
     * @param {string} epitopeId - The epitope ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByEpitopeId(epitopeId, options = {}) {
      return run('epitope_assay', qb.eq('epitope_id', epitopeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by epitope sequence
     * @param {string} epitopeSequence - The epitope sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByEpitopeSequence(epitopeSequence, options = {}) {
      return run('epitope_assay', qb.eq('epitope_sequence', epitopeSequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by epitope type
     * @param {string} epitopeType - The epitope type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByEpitopeType(epitopeType, options = {}) {
      return run('epitope_assay', qb.eq('epitope_type', epitopeType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by host name (case insensitive)
     * @param {string} hostName - The host name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByHostName(hostName, options = {}) {
      return run('epitope_assay', qb.eq('host_name', hostName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by host taxon ID
     * @param {string} hostTaxonId - The host taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByHostTaxonId(hostTaxonId, options = {}) {
      return run('epitope_assay', qb.eq('host_taxon_id', hostTaxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by MHC allele
     * @param {string} mhcAllele - The MHC allele
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByMhcAllele(mhcAllele, options = {}) {
      return run('epitope_assay', qb.eq('mhc_allele', mhcAllele), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by MHC allele class
     * @param {string} mhcAlleleClass - The MHC allele class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByMhcAlleleClass(mhcAlleleClass, options = {}) {
      return run('epitope_assay', qb.eq('mhc_allele_class', mhcAlleleClass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by organism (case insensitive)
     * @param {string} organism - The organism name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByOrganism(organism, options = {}) {
      return run('epitope_assay', qb.eq('organism', organism), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by PDB ID
     * @param {string} pdbId - The PDB ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByPdbId(pdbId, options = {}) {
      return run('epitope_assay', qb.eq('pdb_id', pdbId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by PMID
     * @param {string} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByPmid(pmid, options = {}) {
      return run('epitope_assay', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by protein accession
     * @param {string} proteinAccession - The protein accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByProteinAccession(proteinAccession, options = {}) {
      return run('epitope_assay', qb.eq('protein_accession', proteinAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by protein ID
     * @param {string} proteinId - The protein ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByProteinId(proteinId, options = {}) {
      return run('epitope_assay', qb.eq('protein_id', proteinId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by protein name (case insensitive)
     * @param {string} proteinName - The protein name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByProteinName(proteinName, options = {}) {
      return run('epitope_assay', qb.eq('protein_name', proteinName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by start position
     * @param {number} start - The start position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByStart(start, options = {}) {
      return run('epitope_assay', qb.eq('start', start), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by end position
     * @param {number} end - The end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByEnd(end, options = {}) {
      return run('epitope_assay', qb.eq('end', end), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('epitope_assay', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by taxon lineage ID
     * @param {string} taxonLineageId - The taxon lineage ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByTaxonLineageId(taxonLineageId, options = {}) {
      return run('epitope_assay', qb.eq('taxon_lineage_ids', taxonLineageId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by taxon lineage name
     * @param {string} taxonLineageName - The taxon lineage name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByTaxonLineageName(taxonLineageName, options = {}) {
      return run('epitope_assay', qb.eq('taxon_lineage_names', taxonLineageName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by title (case insensitive)
     * @param {string} title - The title
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByTitle(title, options = {}) {
      return run('epitope_assay', qb.eq('title', title), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by position range
     * @param {number} minStart - Minimum start position
     * @param {number} maxEnd - Maximum end position
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByPositionRange(minStart, maxEnd, options = {}) {
      return run('epitope_assay', qb.and(qb.gte('start', minStart), qb.lte('end', maxEnd)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('epitope_assay', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get epitope assays by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('epitope_assay', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search epitope assays by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('epitope_assay', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all epitope assays
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of epitope assay data objects
     */
    getAll(options = {}) {
      return run('epitope_assay', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function experiment(context) {
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

function gene_ontology_ref(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a gene_ontology_ref data object by go_id
     * @param {string} goId - The go_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Gene ontology reference data object
     */
    getById(goId, options = {}) {
      return run('gene_ontology_ref', qb.eq('go_id', goId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query gene_ontology_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('gene_ontology_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get gene ontology references by GO name
     * @param {string} goName - The GO name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getByGoName(goName, options = {}) {
      return run('gene_ontology_ref', qb.eq('go_name', goName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get gene ontology references by definition
     * @param {string} definition - The definition
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getByDefinition(definition, options = {}) {
      return run('gene_ontology_ref', qb.eq('definition', definition), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get gene ontology references by ontology
     * @param {string} ontology - The ontology
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getByOntology(ontology, options = {}) {
      return run('gene_ontology_ref', qb.eq('ontology', ontology), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get gene ontology references by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('gene_ontology_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get gene ontology references by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('gene_ontology_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search gene ontology references by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('gene_ontology_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all gene ontology references
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of gene ontology reference data objects
     */
    getAll(options = {}) {
      return run('gene_ontology_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function genome(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a genome data object by genome_id
     * @param {string} genomeId - The genome_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Genome data object
     */
    getById(genomeId, options = {}) {
      return run('genome', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query genome data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of genome data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('genome', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('genome', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by organism name (case insensitive)
     * @param {string} organismName - The organism name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByOrganismName(organismName, options = {}) {
      return run('genome', qb.eq('organism_name', organismName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by genome name (case insensitive)
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('genome', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by strain name (case insensitive)
     * @param {string} strain - The strain name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByStrain(strain, options = {}) {
      return run('genome', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by species (case insensitive)
     * @param {string} species - The species name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getBySpecies(species, options = {}) {
      return run('genome', qb.eq('species', species), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by genus (case insensitive)
     * @param {string} genus - The genus name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByGenus(genus, options = {}) {
      return run('genome', qb.eq('genus', genus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by family (case insensitive)
     * @param {string} family - The family name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByFamily(family, options = {}) {
      return run('genome', qb.eq('family', family), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by order (case insensitive)
     * @param {string} order - The order name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByOrder(order, options = {}) {
      return run('genome', qb.eq('order', order), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by class (case insensitive)
     * @param {string} className - The class name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByClass(className, options = {}) {
      return run('genome', qb.eq('class', className), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by phylum (case insensitive)
     * @param {string} phylum - The phylum name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByPhylum(phylum, options = {}) {
      return run('genome', qb.eq('phylum', phylum), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by kingdom (case insensitive)
     * @param {string} kingdom - The kingdom name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByKingdom(kingdom, options = {}) {
      return run('genome', qb.eq('kingdom', kingdom), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by superkingdom (case insensitive)
     * @param {string} superkingdom - The superkingdom name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getBySuperkingdom(superkingdom, options = {}) {
      return run('genome', qb.eq('superkingdom', superkingdom), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by genome status (case insensitive)
     * @param {string} genomeStatus - The genome status (e.g., 'Complete', 'Draft')
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByGenomeStatus(genomeStatus, options = {}) {
      return run('genome', qb.eq('genome_status', genomeStatus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by genome quality (case insensitive)
     * @param {string} genomeQuality - The genome quality
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByGenomeQuality(genomeQuality, options = {}) {
      return run('genome', qb.eq('genome_quality', genomeQuality), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by assembly accession
     * @param {string} assemblyAccession - The assembly accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByAssemblyAccession(assemblyAccession, options = {}) {
      return run('genome', qb.eq('assembly_accession', assemblyAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by bioproject accession
     * @param {string} bioprojectAccession - The bioproject accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByBioprojectAccession(bioprojectAccession, options = {}) {
      return run('genome', qb.eq('bioproject_accession', bioprojectAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by biosample accession
     * @param {string} biosampleAccession - The biosample accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByBiosampleAccession(biosampleAccession, options = {}) {
      return run('genome', qb.eq('biosample_accession', biosampleAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by SRA accession
     * @param {string} sraAccession - The SRA accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getBySraAccession(sraAccession, options = {}) {
      return run('genome', qb.eq('sra_accession', sraAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by refseq accessions (case insensitive)
     * @param {string} refseqAccessions - The refseq accessions
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByRefseqAccessions(refseqAccessions, options = {}) {
      return run('genome', qb.eq('refseq_accessions', refseqAccessions), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by genbank accessions (case insensitive)
     * @param {string} genbankAccessions - The genbank accessions
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByGenbankAccessions(genbankAccessions, options = {}) {
      return run('genome', qb.eq('genbank_accessions', genbankAccessions), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by gram stain (case insensitive)
     * @param {string} gramStain - The gram stain (e.g., 'positive', 'negative')
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByGramStain(gramStain, options = {}) {
      return run('genome', qb.eq('gram_stain', gramStain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by motility (case insensitive)
     * @param {string} motility - The motility type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByMotility(motility, options = {}) {
      return run('genome', qb.eq('motility', motility), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by oxygen requirement (case insensitive)
     * @param {string} oxygenRequirement - The oxygen requirement
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByOxygenRequirement(oxygenRequirement, options = {}) {
      return run('genome', qb.eq('oxygen_requirement', oxygenRequirement), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by habitat (case insensitive)
     * @param {string} habitat - The habitat
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByHabitat(habitat, options = {}) {
      return run('genome', qb.eq('habitat', habitat), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by isolation country (case insensitive)
     * @param {string} isolationCountry - The isolation country
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByIsolationCountry(isolationCountry, options = {}) {
      return run('genome', qb.eq('isolation_country', isolationCountry), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by isolation source (case insensitive)
     * @param {string} isolationSource - The isolation source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByIsolationSource(isolationSource, options = {}) {
      return run('genome', qb.eq('isolation_source', isolationSource), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by geographic location (case insensitive)
     * @param {string} geographicLocation - The geographic location
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByGeographicLocation(geographicLocation, options = {}) {
      return run('genome', qb.eq('geographic_location', geographicLocation), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by geographic group (case insensitive)
     * @param {string} geographicGroup - The geographic group
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByGeographicGroup(geographicGroup, options = {}) {
      return run('genome', qb.eq('geographic_group', geographicGroup), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by cell shape (case insensitive)
     * @param {string} cellShape - The cell shape
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByCellShape(cellShape, options = {}) {
      return run('genome', qb.eq('cell_shape', cellShape), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by sporulation (case insensitive)
     * @param {string} sporulation - The sporulation type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getBySporulation(sporulation, options = {}) {
      return run('genome', qb.eq('sporulation', sporulation), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by optimal temperature (case insensitive)
     * @param {string} optimalTemperature - The optimal temperature
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByOptimalTemperature(optimalTemperature, options = {}) {
      return run('genome', qb.eq('optimal_temperature', optimalTemperature), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by temperature range (case insensitive)
     * @param {string} temperatureRange - The temperature range
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByTemperatureRange(temperatureRange, options = {}) {
      return run('genome', qb.eq('temperature_range', temperatureRange), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by salinity (case insensitive)
     * @param {string} salinity - The salinity
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getBySalinity(salinity, options = {}) {
      return run('genome', qb.eq('salinity', salinity), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by depth (case insensitive)
     * @param {string} depth - The depth
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByDepth(depth, options = {}) {
      return run('genome', qb.eq('depth', depth), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by altitude (case insensitive)
     * @param {string} altitude - The altitude
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByAltitude(altitude, options = {}) {
      return run('genome', qb.eq('altitude', altitude), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by type strain (case insensitive)
     * @param {string} typeStrain - The type strain
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByTypeStrain(typeStrain, options = {}) {
      return run('genome', qb.eq('type_strain', typeStrain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by serovar (case insensitive)
     * @param {string} serovar - The serovar
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getBySerovar(serovar, options = {}) {
      return run('genome', qb.eq('serovar', serovar), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by pathovar (case insensitive)
     * @param {string} pathovar - The pathovar
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByPathovar(pathovar, options = {}) {
      return run('genome', qb.eq('pathovar', pathovar), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by biovar (case insensitive)
     * @param {string} biovar - The biovar
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByBiovar(biovar, options = {}) {
      return run('genome', qb.eq('biovar', biovar), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by clade
     * @param {string} clade - The clade
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByClade(clade, options = {}) {
      return run('genome', qb.eq('clade', clade), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by subclade
     * @param {string} subclade - The subclade
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getBySubclade(subclade, options = {}) {
      return run('genome', qb.eq('subclade', subclade), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by subtype
     * @param {string} subtype - The subtype
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getBySubtype(subtype, options = {}) {
      return run('genome', qb.eq('subtype', subtype), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by lineage
     * @param {string} lineage - The lineage
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByLineage(lineage, options = {}) {
      return run('genome', qb.eq('lineage', lineage), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by MLST (case insensitive)
     * @param {string} mlst - The MLST type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByMlst(mlst, options = {}) {
      return run('genome', qb.eq('mlst', mlst), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by sequencing platform (case insensitive)
     * @param {string} sequencingPlatform - The sequencing platform
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getBySequencingPlatform(sequencingPlatform, options = {}) {
      return run('genome', qb.eq('sequencing_platform', sequencingPlatform), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by assembly method (case insensitive)
     * @param {string} assemblyMethod - The assembly method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByAssemblyMethod(assemblyMethod, options = {}) {
      return run('genome', qb.eq('assembly_method', assemblyMethod), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by genome length range
     * @param {number} minLength - Minimum genome length
     * @param {number} maxLength - Maximum genome length
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByGenomeLengthRange(minLength, maxLength, options = {}) {
      const filters = [
        qb.gt('genome_length', minLength),
        qb.lt('genome_length', maxLength)
      ];
      return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by GC content range
     * @param {number} minGc - Minimum GC content
     * @param {number} maxGc - Maximum GC content
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByGcContentRange(minGc, maxGc, options = {}) {
      const filters = [
        qb.gt('gc_content', minGc),
        qb.lt('gc_content', maxGc)
      ];
      return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by CDS count range
     * @param {number} minCds - Minimum CDS count
     * @param {number} maxCds - Maximum CDS count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByCdsCountRange(minCds, maxCds, options = {}) {
      const filters = [
        qb.gt('cds', minCds),
        qb.lt('cds', maxCds)
      ];
      return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by contig count range
     * @param {number} minContigs - Minimum contig count
     * @param {number} maxContigs - Maximum contig count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByContigCountRange(minContigs, maxContigs, options = {}) {
      const filters = [
        qb.gt('contigs', minContigs),
        qb.lt('contigs', maxContigs)
      ];
      return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by collection year range
     * @param {number} startYear - Start year
     * @param {number} endYear - End year
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByCollectionYearRange(startYear, endYear, options = {}) {
      const filters = [
        qb.gt('collection_year', startYear),
        qb.lt('collection_year', endYear)
      ];
      return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('genome', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genomes by public status
     * @param {boolean} isPublic - Public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('genome', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all genomes with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of genome data objects
     */
    getAll(options = {}) {
      return run('genome', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function genomeAmr(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a genome_amr data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Genome AMR data object
     */
    getById(id, options = {}) {
      return run('genome_amr', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query genome_amr data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('genome_amr', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by antibiotic (case insensitive)
     * @param {string} antibiotic - The antibiotic name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByAntibiotic(antibiotic, options = {}) {
      return run('genome_amr', qb.eq('antibiotic', antibiotic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by computational method (case insensitive)
     * @param {string} computationalMethod - The computational method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByComputationalMethod(computationalMethod, options = {}) {
      return run('genome_amr', qb.eq('computational_method', computationalMethod), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by computational method version
     * @param {string} computationalMethodVersion - The computational method version
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByComputationalMethodVersion(computationalMethodVersion, options = {}) {
      return run('genome_amr', qb.eq('computational_method_version', computationalMethodVersion), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by evidence (case insensitive)
     * @param {string} evidence - The evidence type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByEvidence(evidence, options = {}) {
      return run('genome_amr', qb.eq('evidence', evidence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('genome_amr', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by genome name (case insensitive)
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('genome_amr', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by laboratory typing method (case insensitive)
     * @param {string} laboratoryTypingMethod - The laboratory typing method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByLaboratoryTypingMethod(laboratoryTypingMethod, options = {}) {
      return run('genome_amr', qb.eq('laboratory_typing_method', laboratoryTypingMethod), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by laboratory typing method version
     * @param {string} laboratoryTypingMethodVersion - The laboratory typing method version
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByLaboratoryTypingMethodVersion(laboratoryTypingMethodVersion, options = {}) {
      return run('genome_amr', qb.eq('laboratory_typing_method_version', laboratoryTypingMethodVersion), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by laboratory typing platform (case insensitive)
     * @param {string} laboratoryTypingPlatform - The laboratory typing platform
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByLaboratoryTypingPlatform(laboratoryTypingPlatform, options = {}) {
      return run('genome_amr', qb.eq('laboratory_typing_platform', laboratoryTypingPlatform), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by measurement
     * @param {string} measurement - The measurement
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByMeasurement(measurement, options = {}) {
      return run('genome_amr', qb.eq('measurement', measurement), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by measurement sign
     * @param {string} measurementSign - The measurement sign
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByMeasurementSign(measurementSign, options = {}) {
      return run('genome_amr', qb.eq('measurement_sign', measurementSign), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by measurement unit
     * @param {string} measurementUnit - The measurement unit
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByMeasurementUnit(measurementUnit, options = {}) {
      return run('genome_amr', qb.eq('measurement_unit', measurementUnit), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by measurement value
     * @param {string} measurementValue - The measurement value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByMeasurementValue(measurementValue, options = {}) {
      return run('genome_amr', qb.eq('measurement_value', measurementValue), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by owner
     * @param {string} owner - The owner
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByOwner(owner, options = {}) {
      return run('genome_amr', qb.eq('owner', owner), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by PMID
     * @param {number} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByPmid(pmid, options = {}) {
      return run('genome_amr', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by public status
     * @param {boolean} isPublic - The public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('genome_amr', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by resistant phenotype
     * @param {string} resistantPhenotype - The resistant phenotype
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByResistantPhenotype(resistantPhenotype, options = {}) {
      return run('genome_amr', qb.eq('resistant_phenotype', resistantPhenotype), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by source (case insensitive)
     * @param {string} source - The source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getBySource(source, options = {}) {
      return run('genome_amr', qb.eq('source', source), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('genome_amr', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by testing standard (case insensitive)
     * @param {string} testingStandard - The testing standard
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByTestingStandard(testingStandard, options = {}) {
      return run('genome_amr', qb.eq('testing_standard', testingStandard), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by testing standard year
     * @param {number} testingStandardYear - The testing standard year
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByTestingStandardYear(testingStandardYear, options = {}) {
      return run('genome_amr', qb.eq('testing_standard_year', testingStandardYear), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by vendor (case insensitive)
     * @param {string} vendor - The vendor
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByVendor(vendor, options = {}) {
      return run('genome_amr', qb.eq('vendor', vendor), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('genome_amr', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get genome_amr data by modified date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getByModifiedDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_modified', startDate),
        qb.lt('date_modified', endDate)
      ];
      return run('genome_amr', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search genome_amr data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('genome_amr', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all genome_amr data with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of genome_amr data objects
     */
    getAll(options = {}) {
      return run('genome_amr', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function genomeFeature(context) {
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

function genomeSequence(context) {
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

function idRef(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a id_ref data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} ID reference data object
     */
    getById(id, options = {}) {
      return run('id_ref', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query id_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('id_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get id_ref entries by ID type
     * @param {string} idType - The ID type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getByIdType(idType, options = {}) {
      return run('id_ref', qb.eq('id_type', idType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get id_ref entries by ID value
     * @param {string} idValue - The ID value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getByIdValue(idValue, options = {}) {
      return run('id_ref', qb.eq('id_value', idValue), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get id_ref entries by UniProtKB accession
     * @param {string} uniprotkbAccession - The UniProtKB accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getByUniprotkbAccession(uniprotkbAccession, options = {}) {
      return run('id_ref', qb.eq('uniprotkb_accession', uniprotkbAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get id_ref entries by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('id_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get id_ref entries by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('id_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search id_ref data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('id_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all id_ref data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of id_ref data objects
     */
    getAll(options = {}) {
      return run('id_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function miscNiaidSgc(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a misc_niaid_sgc data object by target_id
     * @param {string} targetId - The target_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Misc NIAID SGC data object
     */
    getById(targetId, options = {}) {
      return run('misc_niaid_sgc', qb.eq('target_id', targetId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query misc_niaid_sgc data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('misc_niaid_sgc', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by genus
     * @param {string} genus - The genus name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByGenus(genus, options = {}) {
      return run('misc_niaid_sgc', qb.eq('genus', genus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by species
     * @param {string} species - The species name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getBySpecies(species, options = {}) {
      return run('misc_niaid_sgc', qb.eq('species', species), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by strain
     * @param {string} strain - The strain name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByStrain(strain, options = {}) {
      return run('misc_niaid_sgc', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by target status
     * @param {string} targetStatus - The target status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByTargetStatus(targetStatus, options = {}) {
      return run('misc_niaid_sgc', qb.eq('target_status', targetStatus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by has clones
     * @param {string} hasClones - The has clones value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByHasClones(hasClones, options = {}) {
      return run('misc_niaid_sgc', qb.eq('has_clones', hasClones), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by has proteins
     * @param {string} hasProteins - The has proteins value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByHasProteins(hasProteins, options = {}) {
      return run('misc_niaid_sgc', qb.eq('has_proteins', hasProteins), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by selection criteria
     * @param {string} selectionCriteria - The selection criteria
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getBySelectionCriteria(selectionCriteria, options = {}) {
      return run('misc_niaid_sgc', qb.eq('selection_criteria', selectionCriteria), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by gene symbol collection
     * @param {string} geneSymbol - The gene symbol to search for in the collection
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByGeneSymbol(geneSymbol, options = {}) {
      return run('misc_niaid_sgc', qb.eq('gene_symbol_collection', geneSymbol), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('misc_niaid_sgc', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get misc_niaid_sgc data by modified date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getByModifiedDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_modified', startDate),
        qb.lt('date_modified', endDate)
      ];
      return run('misc_niaid_sgc', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search misc_niaid_sgc data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('misc_niaid_sgc', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all misc_niaid_sgc data with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of misc_niaid_sgc data objects
     */
    getAll(options = {}) {
      return run('misc_niaid_sgc', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function pathway(context) {
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

function pathway_ref(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a pathway_ref data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Pathway reference data object
     */
    getById(id, options = {}) {
      return run('pathway_ref', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query pathway_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('pathway_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by EC number
     * @param {string} ecNumber - The EC number
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByEcNumber(ecNumber, options = {}) {
      return run('pathway_ref', qb.eq('ec_number', ecNumber), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by EC description
     * @param {string} ecDescription - The EC description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByEcDescription(ecDescription, options = {}) {
      return run('pathway_ref', qb.eq('ec_description', ecDescription), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by map location
     * @param {string} mapLocation - The map location
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByMapLocation(mapLocation, options = {}) {
      return run('pathway_ref', qb.eq('map_location', mapLocation), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by map name
     * @param {string} mapName - The map name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByMapName(mapName, options = {}) {
      return run('pathway_ref', qb.eq('map_name', mapName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by map type
     * @param {string} mapType - The map type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByMapType(mapType, options = {}) {
      return run('pathway_ref', qb.eq('map_type', mapType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by occurrence
     * @param {number} occurrence - The occurrence count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByOccurrence(occurrence, options = {}) {
      return run('pathway_ref', qb.eq('occurrence', occurrence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by pathway class
     * @param {string} pathwayClass - The pathway class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByPathwayClass(pathwayClass, options = {}) {
      return run('pathway_ref', qb.eq('pathway_class', pathwayClass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by pathway ID
     * @param {string} pathwayId - The pathway ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByPathwayId(pathwayId, options = {}) {
      return run('pathway_ref', qb.eq('pathway_id', pathwayId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by pathway name
     * @param {string} pathwayName - The pathway name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByPathwayName(pathwayName, options = {}) {
      return run('pathway_ref', qb.eq('pathway_name', pathwayName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by occurrence range
     * @param {number} minOccurrence - Minimum occurrence count
     * @param {number} maxOccurrence - Maximum occurrence count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByOccurrenceRange(minOccurrence, maxOccurrence, options = {}) {
      return run('pathway_ref', qb.and(qb.gte('occurrence', minOccurrence), qb.lte('occurrence', maxOccurrence)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('pathway_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get pathway references by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('pathway_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search pathway references by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('pathway_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all pathway references
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of pathway reference data objects
     */
    getAll(options = {}) {
      return run('pathway_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function ppi(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a ppi data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} PPI data object
     */
    getById(id, options = {}) {
      return run('ppi', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query ppi data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of PPI data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('ppi', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by category
     * @param {string} category - The category
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByCategory(category, options = {}) {
      return run('ppi', qb.eq('category', category), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by detection method
     * @param {string} detectionMethod - The detection method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByDetectionMethod(detectionMethod, options = {}) {
      return run('ppi', qb.eq('detection_method', detectionMethod), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by domain A
     * @param {string} domainA - The domain A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByDomainA(domainA, options = {}) {
      return run('ppi', qb.eq('domain_a', domainA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by domain B
     * @param {string} domainB - The domain B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByDomainB(domainB, options = {}) {
      return run('ppi', qb.eq('domain_b', domainB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by evidence
     * @param {string} evidence - The evidence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByEvidence(evidence, options = {}) {
      return run('ppi', qb.eq('evidence', evidence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by feature ID A
     * @param {string} featureIdA - The feature ID A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByFeatureIdA(featureIdA, options = {}) {
      return run('ppi', qb.eq('feature_id_a', featureIdA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by feature ID B
     * @param {string} featureIdB - The feature ID B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByFeatureIdB(featureIdB, options = {}) {
      return run('ppi', qb.eq('feature_id_b', featureIdB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by gene A
     * @param {string} geneA - The gene A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGeneA(geneA, options = {}) {
      return run('ppi', qb.eq('gene_a', geneA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by gene B
     * @param {string} geneB - The gene B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGeneB(geneB, options = {}) {
      return run('ppi', qb.eq('gene_b', geneB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by genome ID A
     * @param {string} genomeIdA - The genome ID A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGenomeIdA(genomeIdA, options = {}) {
      return run('ppi', qb.eq('genome_id_a', genomeIdA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by genome ID B
     * @param {string} genomeIdB - The genome ID B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGenomeIdB(genomeIdB, options = {}) {
      return run('ppi', qb.eq('genome_id_b', genomeIdB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by genome name A (case insensitive)
     * @param {string} genomeNameA - The genome name A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGenomeNameA(genomeNameA, options = {}) {
      return run('ppi', qb.eq('genome_name_a', genomeNameA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by genome name B (case insensitive)
     * @param {string} genomeNameB - The genome name B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByGenomeNameB(genomeNameB, options = {}) {
      return run('ppi', qb.eq('genome_name_b', genomeNameB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interaction type
     * @param {string} interactionType - The interaction type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractionType(interactionType, options = {}) {
      return run('ppi', qb.eq('interaction_type', interactionType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor A
     * @param {string} interactorA - The interactor A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorA(interactorA, options = {}) {
      return run('ppi', qb.eq('interactor_a', interactorA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor B
     * @param {string} interactorB - The interactor B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorB(interactorB, options = {}) {
      return run('ppi', qb.eq('interactor_b', interactorB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor description A (case insensitive)
     * @param {string} interactorDescA - The interactor description A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorDescA(interactorDescA, options = {}) {
      return run('ppi', qb.eq('interactor_desc_a', interactorDescA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor description B (case insensitive)
     * @param {string} interactorDescB - The interactor description B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorDescB(interactorDescB, options = {}) {
      return run('ppi', qb.eq('interactor_desc_b', interactorDescB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor type A
     * @param {string} interactorTypeA - The interactor type A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorTypeA(interactorTypeA, options = {}) {
      return run('ppi', qb.eq('interactor_type_a', interactorTypeA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by interactor type B
     * @param {string} interactorTypeB - The interactor type B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByInteractorTypeB(interactorTypeB, options = {}) {
      return run('ppi', qb.eq('interactor_type_b', interactorTypeB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by PMID
     * @param {string} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByPmid(pmid, options = {}) {
      return run('ppi', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by RefSeq locus tag A
     * @param {string} refseqLocusTagA - The RefSeq locus tag A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByRefseqLocusTagA(refseqLocusTagA, options = {}) {
      return run('ppi', qb.eq('refseq_locus_tag_a', refseqLocusTagA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by RefSeq locus tag B
     * @param {string} refseqLocusTagB - The RefSeq locus tag B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByRefseqLocusTagB(refseqLocusTagB, options = {}) {
      return run('ppi', qb.eq('refseq_locus_tag_b', refseqLocusTagB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by score
     * @param {string} score - The score
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByScore(score, options = {}) {
      return run('ppi', qb.eq('score', score), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by source database
     * @param {string} sourceDb - The source database
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getBySourceDb(sourceDb, options = {}) {
      return run('ppi', qb.eq('source_db', sourceDb), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by source ID
     * @param {string} sourceId - The source ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getBySourceId(sourceId, options = {}) {
      return run('ppi', qb.eq('source_id', sourceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by taxon ID A
     * @param {number} taxonIdA - The taxon ID A
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByTaxonIdA(taxonIdA, options = {}) {
      return run('ppi', qb.eq('taxon_id_a', taxonIdA), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by taxon ID B
     * @param {number} taxonIdB - The taxon ID B
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByTaxonIdB(taxonIdB, options = {}) {
      return run('ppi', qb.eq('taxon_id_b', taxonIdB), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('ppi', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get PPIs by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('ppi', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search PPIs by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('ppi', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all PPIs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of PPI data objects
     */
    getAll(options = {}) {
      return run('ppi', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function protein_feature(context) {
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

function proteinFamilyRef(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a protein_family_ref data object by family_id
     * @param {string} familyId - The family_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Protein family reference data object
     */
    getById(familyId, options = {}) {
      return run('protein_family_ref', qb.eq('family_id', familyId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query protein_family_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('protein_family_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein family references by family product
     * @param {string} familyProduct - The family product
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    getByFamilyProduct(familyProduct, options = {}) {
      return run('protein_family_ref', qb.eq('family_product', familyProduct), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein family references by family type
     * @param {string} familyType - The family type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    getByFamilyType(familyType, options = {}) {
      return run('protein_family_ref', qb.eq('family_type', familyType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein family references by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('protein_family_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein family references by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('protein_family_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search protein_family_ref data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('protein_family_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all protein_family_ref data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein_family_ref data objects
     */
    getAll(options = {}) {
      return run('protein_family_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function protein_structure(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a protein_structure data object by pdb_id
     * @param {string} pdbId - The pdb_id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Protein structure data object
     */
    getById(pdbId, options = {}) {
      return run('protein_structure', qb.eq('pdb_id', pdbId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query protein_structure data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('protein_structure', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('protein_structure', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('protein_structure', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('protein_structure', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by organism name (case insensitive)
     * @param {string} organismName - The organism name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByOrganismName(organismName, options = {}) {
      return run('protein_structure', qb.eq('organism_name', organismName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by title (case insensitive)
     * @param {string} title - The title
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByTitle(title, options = {}) {
      return run('protein_structure', qb.eq('title', title), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by resolution
     * @param {string} resolution - The resolution
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByResolution(resolution, options = {}) {
      return run('protein_structure', qb.eq('resolution', resolution), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by institution
     * @param {string} institution - The institution
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByInstitution(institution, options = {}) {
      return run('protein_structure', qb.eq('institution', institution), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by file path
     * @param {string} filePath - The file path
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByFilePath(filePath, options = {}) {
      return run('protein_structure', qb.eq('file_path', filePath), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by author
     * @param {string} author - The author name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByAuthor(author, options = {}) {
      return run('protein_structure', qb.eq('authors', author), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by method
     * @param {string} method - The method
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByMethod(method, options = {}) {
      return run('protein_structure', qb.eq('method', method), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by gene
     * @param {string} gene - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByGene(gene, options = {}) {
      return run('protein_structure', qb.eq('gene', gene), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by product
     * @param {string} product - The product name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByProduct(product, options = {}) {
      return run('protein_structure', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by sequence
     * @param {string} sequence - The sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getBySequence(sequence, options = {}) {
      return run('protein_structure', qb.eq('sequence', sequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by sequence MD5
     * @param {string} sequenceMd5 - The sequence MD5 hash
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getBySequenceMd5(sequenceMd5, options = {}) {
      return run('protein_structure', qb.eq('sequence_md5', sequenceMd5), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by UniProtKB accession
     * @param {string} uniprotkbAccession - The UniProtKB accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByUniprotkbAccession(uniprotkbAccession, options = {}) {
      return run('protein_structure', qb.eq('uniprotkb_accession', uniprotkbAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by PMID
     * @param {string} pmid - The PubMed ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByPmid(pmid, options = {}) {
      return run('protein_structure', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('protein_structure', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by taxon lineage ID
     * @param {string} taxonLineageId - The taxon lineage ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByTaxonLineageId(taxonLineageId, options = {}) {
      return run('protein_structure', qb.eq('taxon_lineage_ids', taxonLineageId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by taxon lineage name
     * @param {string} taxonLineageName - The taxon lineage name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByTaxonLineageName(taxonLineageName, options = {}) {
      return run('protein_structure', qb.eq('taxon_lineage_names', taxonLineageName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by alignment
     * @param {string} alignment - The alignment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByAlignment(alignment, options = {}) {
      return run('protein_structure', qb.eq('alignments', alignment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by release date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByReleaseDateRange(startDate, endDate, options = {}) {
      return run('protein_structure', qb.and(qb.gte('release_date', startDate), qb.lte('release_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('protein_structure', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get protein structures by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('protein_structure', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search protein structures by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('protein_structure', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all protein structures
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of protein structure data objects
     */
    getAll(options = {}) {
      return run('protein_structure', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function sequenceFeature(context) {
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

function sequence_feature_vt(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a sequence_feature_vt data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Sequence feature variant data object
     */
    getById(id, options = {}) {
      return run('sequence_feature_vt', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query sequence_feature_vt data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('sequence_feature_vt', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SF category
     * @param {string} sfCategory - The SF category
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfCategory(sfCategory, options = {}) {
      return run('sequence_feature_vt', qb.eq('sf_category', sfCategory), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SF ID
     * @param {string} sfId - The SF ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfId(sfId, options = {}) {
      return run('sequence_feature_vt', qb.eq('sf_id', sfId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SF name (case insensitive)
     * @param {string} sfName - The SF name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfName(sfName, options = {}) {
      return run('sequence_feature_vt', qb.eq('sf_name', sfName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SF sequence
     * @param {string} sfSequence - The SF sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfSequence(sfSequence, options = {}) {
      return run('sequence_feature_vt', qb.eq('sf_sequence', sfSequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SF sequence MD5
     * @param {string} sfSequenceMd5 - The SF sequence MD5 hash
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfSequenceMd5(sfSequenceMd5, options = {}) {
      return run('sequence_feature_vt', qb.eq('sf_sequence_md5', sfSequenceMd5), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT genome count
     * @param {string} sfvtGenomeCount - The SFVT genome count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtGenomeCount(sfvtGenomeCount, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_genome_count', sfvtGenomeCount), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT genome ID
     * @param {string} sfvtGenomeId - The SFVT genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtGenomeId(sfvtGenomeId, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_genome_ids', sfvtGenomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT ID
     * @param {string} sfvtId - The SFVT ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtId(sfvtId, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_id', sfvtId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT sequence
     * @param {string} sfvtSequence - The SFVT sequence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtSequence(sfvtSequence, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_sequence', sfvtSequence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT sequence MD5
     * @param {string} sfvtSequenceMd5 - The SFVT sequence MD5 hash
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtSequenceMd5(sfvtSequenceMd5, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_sequence_md5', sfvtSequenceMd5), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by SFVT variations
     * @param {string} sfvtVariations - The SFVT variations
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getBySfvtVariations(sfvtVariations, options = {}) {
      return run('sequence_feature_vt', qb.eq('sfvt_variations', sfvtVariations), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by additional metadata (case insensitive)
     * @param {string} additionalMetadata - The additional metadata
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getByAdditionalMetadata(additionalMetadata, options = {}) {
      return run('sequence_feature_vt', qb.eq('additional_metadata', additionalMetadata), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by comments (case insensitive)
     * @param {string} comment - The comment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getByComment(comment, options = {}) {
      return run('sequence_feature_vt', qb.eq('comments', comment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('sequence_feature_vt', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get sequence feature variants by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('sequence_feature_vt', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search sequence feature variants by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('sequence_feature_vt', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all sequence feature variants
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of sequence feature variant data objects
     */
    getAll(options = {}) {
      return run('sequence_feature_vt', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function serology(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a serology data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Serology data object
     */
    getById(id, options = {}) {
      return run('serology', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query serology data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of serology data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('serology', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by additional metadata
     * @param {string} additionalMetadata - The additional metadata
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByAdditionalMetadata(additionalMetadata, options = {}) {
      return run('serology', qb.eq('additional_metadata', additionalMetadata), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by collection city (case insensitive)
     * @param {string} collectionCity - The collection city
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByCollectionCity(collectionCity, options = {}) {
      return run('serology', qb.eq('collection_city', collectionCity), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by collection country (case insensitive)
     * @param {string} collectionCountry - The collection country
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByCollectionCountry(collectionCountry, options = {}) {
      return run('serology', qb.eq('collection_country', collectionCountry), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by collection state (case insensitive)
     * @param {string} collectionState - The collection state
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByCollectionState(collectionState, options = {}) {
      return run('serology', qb.eq('collection_state', collectionState), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by collection year (case insensitive)
     * @param {string} collectionYear - The collection year
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByCollectionYear(collectionYear, options = {}) {
      return run('serology', qb.eq('collection_year', collectionYear), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by comments
     * @param {string} comments - The comments
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByComments(comments, options = {}) {
      return run('serology', qb.eq('comments', comments), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by contributing institution (case insensitive)
     * @param {string} contributingInstitution - The contributing institution
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByContributingInstitution(contributingInstitution, options = {}) {
      return run('serology', qb.eq('contributing_institution', contributingInstitution), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by GenBank accession
     * @param {string} genbankAccession - The GenBank accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByGenbankAccession(genbankAccession, options = {}) {
      return run('serology', qb.eq('genbank_accession', genbankAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by geographic group (case insensitive)
     * @param {string} geographicGroup - The geographic group
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByGeographicGroup(geographicGroup, options = {}) {
      return run('serology', qb.eq('geographic_group', geographicGroup), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host age (case insensitive)
     * @param {string} hostAge - The host age
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostAge(hostAge, options = {}) {
      return run('serology', qb.eq('host_age', hostAge), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host age group (case insensitive)
     * @param {string} hostAgeGroup - The host age group
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostAgeGroup(hostAgeGroup, options = {}) {
      return run('serology', qb.eq('host_age_group', hostAgeGroup), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host common name (case insensitive)
     * @param {string} hostCommonName - The host common name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostCommonName(hostCommonName, options = {}) {
      return run('serology', qb.eq('host_common_name', hostCommonName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host health (case insensitive)
     * @param {string} hostHealth - The host health
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostHealth(hostHealth, options = {}) {
      return run('serology', qb.eq('host_health', hostHealth), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host identifier
     * @param {string} hostIdentifier - The host identifier
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostIdentifier(hostIdentifier, options = {}) {
      return run('serology', qb.eq('host_identifier', hostIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host sex (case insensitive)
     * @param {string} hostSex - The host sex
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostSex(hostSex, options = {}) {
      return run('serology', qb.eq('host_sex', hostSex), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host species (case insensitive)
     * @param {string} hostSpecies - The host species
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostSpecies(hostSpecies, options = {}) {
      return run('serology', qb.eq('host_species', hostSpecies), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by host type
     * @param {string} hostType - The host type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByHostType(hostType, options = {}) {
      return run('serology', qb.eq('host_type', hostType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by positive definition (case insensitive)
     * @param {string} positiveDefinition - The positive definition
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByPositiveDefinition(positiveDefinition, options = {}) {
      return run('serology', qb.eq('positive_definition', positiveDefinition), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by project identifier
     * @param {string} projectIdentifier - The project identifier
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByProjectIdentifier(projectIdentifier, options = {}) {
      return run('serology', qb.eq('project_identifier', projectIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by sample accession
     * @param {string} sampleAccession - The sample accession
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getBySampleAccession(sampleAccession, options = {}) {
      return run('serology', qb.eq('sample_accession', sampleAccession), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by sample identifier
     * @param {string} sampleIdentifier - The sample identifier
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getBySampleIdentifier(sampleIdentifier, options = {}) {
      return run('serology', qb.eq('sample_identifier', sampleIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by serotype
     * @param {string} serotype - The serotype
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getBySerotype(serotype, options = {}) {
      return run('serology', qb.eq('serotype', serotype), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by strain (case insensitive)
     * @param {string} strain - The strain
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByStrain(strain, options = {}) {
      return run('serology', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by taxon lineage ID
     * @param {string} taxonLineageId - The taxon lineage ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTaxonLineageId(taxonLineageId, options = {}) {
      return run('serology', qb.eq('taxon_lineage_ids', taxonLineageId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by test antigen (case insensitive)
     * @param {string} testAntigen - The test antigen
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTestAntigen(testAntigen, options = {}) {
      return run('serology', qb.eq('test_antigen', testAntigen), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by test interpretation (case insensitive)
     * @param {string} testInterpretation - The test interpretation
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTestInterpretation(testInterpretation, options = {}) {
      return run('serology', qb.eq('test_interpretation', testInterpretation), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by test pathogen (case insensitive)
     * @param {string} testPathogen - The test pathogen
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTestPathogen(testPathogen, options = {}) {
      return run('serology', qb.eq('test_pathogen', testPathogen), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by test result (case insensitive)
     * @param {string} testResult - The test result
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTestResult(testResult, options = {}) {
      return run('serology', qb.eq('test_result', testResult), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by test type (case insensitive)
     * @param {string} testType - The test type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByTestType(testType, options = {}) {
      return run('serology', qb.eq('test_type', testType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by virus identifier (case insensitive)
     * @param {string} virusIdentifier - The virus identifier
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByVirusIdentifier(virusIdentifier, options = {}) {
      return run('serology', qb.eq('virus_identifier', virusIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by collection date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByCollectionDateRange(startDate, endDate, options = {}) {
      return run('serology', qb.and(qb.gte('collection_date', startDate), qb.lte('collection_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('serology', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get serology data by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('serology', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search serology data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('serology', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all serology data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of serology data objects
     */
    getAll(options = {}) {
      return run('serology', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function sp_gene(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a sp_gene data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Specialty gene data object
     */
    getById(id, options = {}) {
      return run('sp_gene', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query sp_gene data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('sp_gene', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by alt locus tag
     * @param {string} altLocusTag - The alt locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByAltLocusTag(altLocusTag, options = {}) {
      return run('sp_gene', qb.eq('alt_locus_tag', altLocusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by antibiotic
     * @param {string} antibiotic - The antibiotic
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByAntibiotic(antibiotic, options = {}) {
      return run('sp_gene', qb.eq('antibiotics', antibiotic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by antibiotics class
     * @param {string} antibioticsClass - The antibiotics class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByAntibioticsClass(antibioticsClass, options = {}) {
      return run('sp_gene', qb.eq('antibiotics_class', antibioticsClass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by classification
     * @param {string} classification - The classification
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByClassification(classification, options = {}) {
      return run('sp_gene', qb.eq('classification', classification), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by E-value
     * @param {string} eValue - The E-value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByEValue(eValue, options = {}) {
      return run('sp_gene', qb.eq('e_value', eValue), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by evidence
     * @param {string} evidence - The evidence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByEvidence(evidence, options = {}) {
      return run('sp_gene', qb.eq('evidence', evidence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('sp_gene', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by function
     * @param {string} function - The function
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByFunction(function_, options = {}) {
      return run('sp_gene', qb.eq('function', function_), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by gene
     * @param {string} gene - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByGene(gene, options = {}) {
      return run('sp_gene', qb.eq('gene', gene), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('sp_gene', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by genome name
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('sp_gene', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by identity
     * @param {number} identity - The identity value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByIdentity(identity, options = {}) {
      return run('sp_gene', qb.eq('identity', identity), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by organism
     * @param {string} organism - The organism name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByOrganism(organism, options = {}) {
      return run('sp_gene', qb.eq('organism', organism), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by owner
     * @param {string} owner - The owner
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByOwner(owner, options = {}) {
      return run('sp_gene', qb.eq('owner', owner), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('sp_gene', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by PMID
     * @param {string} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByPmid(pmid, options = {}) {
      return run('sp_gene', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by product
     * @param {string} product - The product name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByProduct(product, options = {}) {
      return run('sp_gene', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by property
     * @param {string} property - The property
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByProperty(property, options = {}) {
      return run('sp_gene', qb.eq('property', property), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by property source
     * @param {string} propertySource - The property source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByPropertySource(propertySource, options = {}) {
      return run('sp_gene', qb.eq('property_source', propertySource), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by public status
     * @param {boolean} isPublic - The public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('sp_gene', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by query coverage
     * @param {number} queryCoverage - The query coverage
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByQueryCoverage(queryCoverage, options = {}) {
      return run('sp_gene', qb.eq('query_coverage', queryCoverage), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by RefSeq locus tag
     * @param {string} refseqLocusTag - The RefSeq locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByRefseqLocusTag(refseqLocusTag, options = {}) {
      return run('sp_gene', qb.eq('refseq_locus_tag', refseqLocusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by same genome count
     * @param {number} sameGenome - The same genome count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getBySameGenome(sameGenome, options = {}) {
      return run('sp_gene', qb.eq('same_genome', sameGenome), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by same genus count
     * @param {number} sameGenus - The same genus count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getBySameGenus(sameGenus, options = {}) {
      return run('sp_gene', qb.eq('same_genus', sameGenus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by same species count
     * @param {number} sameSpecies - The same species count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getBySameSpecies(sameSpecies, options = {}) {
      return run('sp_gene', qb.eq('same_species', sameSpecies), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by source
     * @param {string} source - The source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getBySource(source, options = {}) {
      return run('sp_gene', qb.eq('source', source), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by source ID
     * @param {string} sourceId - The source ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getBySourceId(sourceId, options = {}) {
      return run('sp_gene', qb.eq('source_id', sourceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by subject coverage
     * @param {number} subjectCoverage - The subject coverage
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getBySubjectCoverage(subjectCoverage, options = {}) {
      return run('sp_gene', qb.eq('subject_coverage', subjectCoverage), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('sp_gene', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by user read
     * @param {string} userRead - The user read
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByUserRead(userRead, options = {}) {
      return run('sp_gene', qb.eq('user_read', userRead), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by user write
     * @param {string} userWrite - The user write
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByUserWrite(userWrite, options = {}) {
      return run('sp_gene', qb.eq('user_write', userWrite), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by identity range
     * @param {number} minIdentity - Minimum identity value
     * @param {number} maxIdentity - Maximum identity value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByIdentityRange(minIdentity, maxIdentity, options = {}) {
      return run('sp_gene', qb.and(qb.gte('identity', minIdentity), qb.lte('identity', maxIdentity)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by query coverage range
     * @param {number} minQueryCoverage - Minimum query coverage
     * @param {number} maxQueryCoverage - Maximum query coverage
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByQueryCoverageRange(minQueryCoverage, maxQueryCoverage, options = {}) {
      return run('sp_gene', qb.and(qb.gte('query_coverage', minQueryCoverage), qb.lte('query_coverage', maxQueryCoverage)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by subject coverage range
     * @param {number} minSubjectCoverage - Minimum subject coverage
     * @param {number} maxSubjectCoverage - Maximum subject coverage
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getBySubjectCoverageRange(minSubjectCoverage, maxSubjectCoverage, options = {}) {
      return run('sp_gene', qb.and(qb.gte('subject_coverage', minSubjectCoverage), qb.lte('subject_coverage', maxSubjectCoverage)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by same genome range
     * @param {number} minSameGenome - Minimum same genome count
     * @param {number} maxSameGenome - Maximum same genome count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getBySameGenomeRange(minSameGenome, maxSameGenome, options = {}) {
      return run('sp_gene', qb.and(qb.gte('same_genome', minSameGenome), qb.lte('same_genome', maxSameGenome)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by same genus range
     * @param {number} minSameGenus - Minimum same genus count
     * @param {number} maxSameGenus - Maximum same genus count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getBySameGenusRange(minSameGenus, maxSameGenus, options = {}) {
      return run('sp_gene', qb.and(qb.gte('same_genus', minSameGenus), qb.lte('same_genus', maxSameGenus)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by same species range
     * @param {number} minSameSpecies - Minimum same species count
     * @param {number} maxSameSpecies - Maximum same species count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getBySameSpeciesRange(minSameSpecies, maxSameSpecies, options = {}) {
      return run('sp_gene', qb.and(qb.gte('same_species', minSameSpecies), qb.lte('same_species', maxSameSpecies)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('sp_gene', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty genes by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('sp_gene', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search specialty genes by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('sp_gene', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all specialty genes
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene data objects
     */
    getAll(options = {}) {
      return run('sp_gene', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function spGeneRef(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a sp_gene_ref data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Specialty gene ref data object
     */
    getById(id, options = {}) {
      return run('sp_gene_ref', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query sp_gene_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('sp_gene_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by antibiotics
     * @param {string} antibiotics - The antibiotics
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByAntibiotics(antibiotics, options = {}) {
      return run('sp_gene_ref', qb.eq('antibiotics', antibiotics), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by antibiotics class
     * @param {string} antibioticsClass - The antibiotics class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByAntibioticsClass(antibioticsClass, options = {}) {
      return run('sp_gene_ref', qb.eq('antibiotics_class', antibioticsClass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by assertion
     * @param {string} assertion - The assertion
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByAssertion(assertion, options = {}) {
      return run('sp_gene_ref', qb.eq('assertion', assertion), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by classification
     * @param {string} classification - The classification
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByClassification(classification, options = {}) {
      return run('sp_gene_ref', qb.eq('classification', classification), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by function
     * @param {string} functionName - The function
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByFunction(functionName, options = {}) {
      return run('sp_gene_ref', qb.eq('function', functionName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by gene ID
     * @param {string} geneId - The gene ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByGeneId(geneId, options = {}) {
      return run('sp_gene_ref', qb.eq('gene_id', geneId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by gene name
     * @param {string} geneName - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByGeneName(geneName, options = {}) {
      return run('sp_gene_ref', qb.eq('gene_name', geneName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by genus
     * @param {string} genus - The genus
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByGenus(genus, options = {}) {
      return run('sp_gene_ref', qb.eq('genus', genus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by GI
     * @param {string} gi - The GI
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByGi(gi, options = {}) {
      return run('sp_gene_ref', qb.eq('gi', gi), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by locus tag
     * @param {string} locusTag - The locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByLocusTag(locusTag, options = {}) {
      return run('sp_gene_ref', qb.eq('locus_tag', locusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by organism
     * @param {string} organism - The organism
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByOrganism(organism, options = {}) {
      return run('sp_gene_ref', qb.eq('organism', organism), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by PMID
     * @param {string} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByPmid(pmid, options = {}) {
      return run('sp_gene_ref', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by product
     * @param {string} product - The product
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByProduct(product, options = {}) {
      return run('sp_gene_ref', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by property
     * @param {string} property - The property
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByProperty(property, options = {}) {
      return run('sp_gene_ref', qb.eq('property', property), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by source
     * @param {string} source - The source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getBySource(source, options = {}) {
      return run('sp_gene_ref', qb.eq('source', source), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by source ID
     * @param {string} sourceId - The source ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getBySourceId(sourceId, options = {}) {
      return run('sp_gene_ref', qb.eq('source_id', sourceId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by species
     * @param {string} species - The species
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getBySpecies(species, options = {}) {
      return run('sp_gene_ref', qb.eq('species', species), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('sp_gene_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get specialty gene refs by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('sp_gene_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search specialty gene refs by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('sp_gene_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all specialty gene refs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of specialty gene ref data objects
     */
    getAll(options = {}) {
      return run('sp_gene_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function spikeLineage(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a spike_lineage data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Spike lineage data object
     */
    getById(id, options = {}) {
      return run('spike_lineage', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query spike_lineage data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('spike_lineage', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by country (case insensitive)
     * @param {string} country - The country
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByCountry(country, options = {}) {
      return run('spike_lineage', qb.eq('country', country), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by growth rate
     * @param {number} growthRate - The growth rate
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByGrowthRate(growthRate, options = {}) {
      return run('spike_lineage', qb.eq('growth_rate', growthRate), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by lineage
     * @param {string} lineage - The lineage
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByLineage(lineage, options = {}) {
      return run('spike_lineage', qb.eq('lineage', lineage), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by lineage count
     * @param {number} lineageCount - The lineage count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByLineageCount(lineageCount, options = {}) {
      return run('spike_lineage', qb.eq('lineage_count', lineageCount), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by lineage of concern
     * @param {string} lineageOfConcern - The lineage of concern
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByLineageOfConcern(lineageOfConcern, options = {}) {
      return run('spike_lineage', qb.eq('lineage_of_concern', lineageOfConcern), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by month
     * @param {string} month - The month
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByMonth(month, options = {}) {
      return run('spike_lineage', qb.eq('month', month), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by prevalence
     * @param {number} prevalence - The prevalence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByPrevalence(prevalence, options = {}) {
      return run('spike_lineage', qb.eq('prevalence', prevalence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by region (case insensitive)
     * @param {string} region - The region
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByRegion(region, options = {}) {
      return run('spike_lineage', qb.eq('region', region), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by sequence features
     * @param {string} sequenceFeatures - The sequence features
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getBySequenceFeatures(sequenceFeatures, options = {}) {
      return run('spike_lineage', qb.eq('sequence_features', sequenceFeatures), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by total isolates
     * @param {number} totalIsolates - The total isolates
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByTotalIsolates(totalIsolates, options = {}) {
      return run('spike_lineage', qb.eq('total_isolates', totalIsolates), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by growth rate range
     * @param {number} minGrowthRate - Minimum growth rate
     * @param {number} maxGrowthRate - Maximum growth rate
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByGrowthRateRange(minGrowthRate, maxGrowthRate, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('growth_rate', minGrowthRate), qb.lte('growth_rate', maxGrowthRate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by lineage count range
     * @param {number} minLineageCount - Minimum lineage count
     * @param {number} maxLineageCount - Maximum lineage count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByLineageCountRange(minLineageCount, maxLineageCount, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('lineage_count', minLineageCount), qb.lte('lineage_count', maxLineageCount)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by prevalence range
     * @param {number} minPrevalence - Minimum prevalence
     * @param {number} maxPrevalence - Maximum prevalence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByPrevalenceRange(minPrevalence, maxPrevalence, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('prevalence', minPrevalence), qb.lte('prevalence', maxPrevalence)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by total isolates range
     * @param {number} minTotalIsolates - Minimum total isolates
     * @param {number} maxTotalIsolates - Maximum total isolates
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByTotalIsolatesRange(minTotalIsolates, maxTotalIsolates, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('total_isolates', minTotalIsolates), qb.lte('total_isolates', maxTotalIsolates)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike lineages by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('spike_lineage', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search spike_lineage data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('spike_lineage', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all spike_lineage data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_lineage data objects
     */
    getAll(options = {}) {
      return run('spike_lineage', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function spikeVariant(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a spike_variant data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Spike variant data object
     */
    getById(id, options = {}) {
      return run('spike_variant', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query spike_variant data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('spike_variant', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by AA variant
     * @param {string} aaVariant - The AA variant
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByAaVariant(aaVariant, options = {}) {
      return run('spike_variant', qb.eq('aa_variant', aaVariant), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by country (case insensitive)
     * @param {string} country - The country name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByCountry(country, options = {}) {
      return run('spike_variant', qb.eq('country', country), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by region (case insensitive)
     * @param {string} region - The region name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByRegion(region, options = {}) {
      return run('spike_variant', qb.eq('region', region), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by month
     * @param {string} month - The month
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByMonth(month, options = {}) {
      return run('spike_variant', qb.eq('month', month), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by sequence feature
     * @param {string} sequenceFeature - The sequence feature to search for in the array
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getBySequenceFeature(sequenceFeature, options = {}) {
      return run('spike_variant', qb.eq('sequence_features', sequenceFeature), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by growth rate
     * @param {number} growthRate - The growth rate
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByGrowthRate(growthRate, options = {}) {
      return run('spike_variant', qb.eq('growth_rate', growthRate), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by prevalence
     * @param {number} prevalence - The prevalence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByPrevalence(prevalence, options = {}) {
      return run('spike_variant', qb.eq('prevalence', prevalence), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by lineage count
     * @param {number} lineageCount - The lineage count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByLineageCount(lineageCount, options = {}) {
      return run('spike_variant', qb.eq('lineage_count', lineageCount), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by total isolates
     * @param {number} totalIsolates - The total isolates count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByTotalIsolates(totalIsolates, options = {}) {
      return run('spike_variant', qb.eq('total_isolates', totalIsolates), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by growth rate range
     * @param {number} minGrowthRate - Minimum growth rate
     * @param {number} maxGrowthRate - Maximum growth rate
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByGrowthRateRange(minGrowthRate, maxGrowthRate, options = {}) {
      const filters = [
        qb.gte('growth_rate', minGrowthRate),
        qb.lte('growth_rate', maxGrowthRate)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by prevalence range
     * @param {number} minPrevalence - Minimum prevalence
     * @param {number} maxPrevalence - Maximum prevalence
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByPrevalenceRange(minPrevalence, maxPrevalence, options = {}) {
      const filters = [
        qb.gte('prevalence', minPrevalence),
        qb.lte('prevalence', maxPrevalence)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by lineage count range
     * @param {number} minLineageCount - Minimum lineage count
     * @param {number} maxLineageCount - Maximum lineage count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByLineageCountRange(minLineageCount, maxLineageCount, options = {}) {
      const filters = [
        qb.gte('lineage_count', minLineageCount),
        qb.lte('lineage_count', maxLineageCount)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by total isolates range
     * @param {number} minTotalIsolates - Minimum total isolates
     * @param {number} maxTotalIsolates - Maximum total isolates
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByTotalIsolatesRange(minTotalIsolates, maxTotalIsolates, options = {}) {
      const filters = [
        qb.gte('total_isolates', minTotalIsolates),
        qb.lte('total_isolates', maxTotalIsolates)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_inserted', startDate),
        qb.lt('date_inserted', endDate)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get spike_variant data by modified date range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getByModifiedDateRange(startDate, endDate, options = {}) {
      const filters = [
        qb.gt('date_modified', startDate),
        qb.lt('date_modified', endDate)
      ];
      return run('spike_variant', qb.and(...filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search spike_variant data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('spike_variant', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all spike_variant data with pagination
     * @param {Object} options - Options including limit and offset
     * @returns {Promise<Array>} Array of spike_variant data objects
     */
    getAll(options = {}) {
      return run('spike_variant', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function strain(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a strain data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Strain data object
     */
    getById(id, options = {}) {
      return run('strain', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query strain data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of strain data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('strain', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by 1_pb2
     * @param {string} pb2 - The 1_pb2 value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBy1Pb2(pb2, options = {}) {
      return run('strain', qb.eq('1_pb2', pb2), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by 2_pb1
     * @param {string} pb1 - The 2_pb1 value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBy2Pb1(pb1, options = {}) {
      return run('strain', qb.eq('2_pb1', pb1), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by 3_pa
     * @param {string} pa - The 3_pa value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBy3Pa(pa, options = {}) {
      return run('strain', qb.eq('3_pa', pa), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by 4_ha
     * @param {string} ha - The 4_ha value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBy4Ha(ha, options = {}) {
      return run('strain', qb.eq('4_ha', ha), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by 5_np
     * @param {string} np - The 5_np value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBy5Np(np, options = {}) {
      return run('strain', qb.eq('5_np', np), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by 6_na
     * @param {string} na - The 6_na value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBy6Na(na, options = {}) {
      return run('strain', qb.eq('6_na', na), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by 7_mp
     * @param {string} mp - The 7_mp value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBy7Mp(mp, options = {}) {
      return run('strain', qb.eq('7_mp', mp), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by 8_ns
     * @param {string} ns - The 8_ns value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBy8Ns(ns, options = {}) {
      return run('strain', qb.eq('8_ns', ns), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by collection date
     * @param {string} collectionDate - The collection date
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByCollectionDate(collectionDate, options = {}) {
      return run('strain', qb.eq('collection_date', collectionDate), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by collection year
     * @param {number} collectionYear - The collection year
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByCollectionYear(collectionYear, options = {}) {
      return run('strain', qb.eq('collection_year', collectionYear), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by family (case insensitive)
     * @param {string} family - The family
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByFamily(family, options = {}) {
      return run('strain', qb.eq('family', family), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by GenBank accessions
     * @param {string} genbankAccessions - The GenBank accessions
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByGenbankAccessions(genbankAccessions, options = {}) {
      return run('strain', qb.eq('genbank_accessions', genbankAccessions), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by genome IDs
     * @param {string} genomeIds - The genome IDs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByGenomeIds(genomeIds, options = {}) {
      return run('strain', qb.eq('genome_ids', genomeIds), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by genus (case insensitive)
     * @param {string} genus - The genus
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByGenus(genus, options = {}) {
      return run('strain', qb.eq('genus', genus), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by geographic group (case insensitive)
     * @param {string} geographicGroup - The geographic group
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByGeographicGroup(geographicGroup, options = {}) {
      return run('strain', qb.eq('geographic_group', geographicGroup), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by H type
     * @param {number} hType - The H type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByHType(hType, options = {}) {
      return run('strain', qb.eq('h_type', hType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by host common name (case insensitive)
     * @param {string} hostCommonName - The host common name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByHostCommonName(hostCommonName, options = {}) {
      return run('strain', qb.eq('host_common_name', hostCommonName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by host group (case insensitive)
     * @param {string} hostGroup - The host group
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByHostGroup(hostGroup, options = {}) {
      return run('strain', qb.eq('host_group', hostGroup), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by host name (case insensitive)
     * @param {string} hostName - The host name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByHostName(hostName, options = {}) {
      return run('strain', qb.eq('host_name', hostName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by isolation country (case insensitive)
     * @param {string} isolationCountry - The isolation country
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByIsolationCountry(isolationCountry, options = {}) {
      return run('strain', qb.eq('isolation_country', isolationCountry), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by L segments
     * @param {string} l - The L segments
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByL(l, options = {}) {
      return run('strain', qb.eq('l', l), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by lab host (case insensitive)
     * @param {string} labHost - The lab host
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByLabHost(labHost, options = {}) {
      return run('strain', qb.eq('lab_host', labHost), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by M segments
     * @param {string} m - The M segments
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByM(m, options = {}) {
      return run('strain', qb.eq('m', m), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by N type
     * @param {number} nType - The N type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByNType(nType, options = {}) {
      return run('strain', qb.eq('n_type', nType), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by other segments
     * @param {string} otherSegments - The other segments
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByOtherSegments(otherSegments, options = {}) {
      return run('strain', qb.eq('other_segments', otherSegments), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by owner
     * @param {string} owner - The owner
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByOwner(owner, options = {}) {
      return run('strain', qb.eq('owner', owner), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by passage (case insensitive)
     * @param {string} passage - The passage
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByPassage(passage, options = {}) {
      return run('strain', qb.eq('passage', passage), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by public status
     * @param {boolean} isPublic - The public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByPublic(isPublic, options = {}) {
      return run('strain', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by S segments
     * @param {string} s - The S segments
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByS(s, options = {}) {
      return run('strain', qb.eq('s', s), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by season
     * @param {string} season - The season
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBySeason(season, options = {}) {
      return run('strain', qb.eq('season', season), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by segment count
     * @param {number} segmentCount - The segment count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBySegmentCount(segmentCount, options = {}) {
      return run('strain', qb.eq('segment_count', segmentCount), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by species (case insensitive)
     * @param {string} species - The species
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBySpecies(species, options = {}) {
      return run('strain', qb.eq('species', species), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by status
     * @param {string} status - The status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByStatus(status, options = {}) {
      return run('strain', qb.eq('status', status), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by strain name (case insensitive)
     * @param {string} strain - The strain name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByStrain(strain, options = {}) {
      return run('strain', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by subtype
     * @param {string} subtype - The subtype
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBySubtype(subtype, options = {}) {
      return run('strain', qb.eq('subtype', subtype), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('strain', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by taxon lineage IDs
     * @param {string} taxonLineageIds - The taxon lineage IDs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByTaxonLineageIds(taxonLineageIds, options = {}) {
      return run('strain', qb.eq('taxon_lineage_ids', taxonLineageIds), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by taxon lineage names
     * @param {string} taxonLineageNames - The taxon lineage names
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByTaxonLineageNames(taxonLineageNames, options = {}) {
      return run('strain', qb.eq('taxon_lineage_names', taxonLineageNames), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by user read permissions
     * @param {string} userRead - The user read permissions
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByUserRead(userRead, options = {}) {
      return run('strain', qb.eq('user_read', userRead), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by user write permissions
     * @param {string} userWrite - The user write permissions
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByUserWrite(userWrite, options = {}) {
      return run('strain', qb.eq('user_write', userWrite), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by collection year range
     * @param {number} startYear - Start year
     * @param {number} endYear - End year
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByCollectionYearRange(startYear, endYear, options = {}) {
      return run('strain', qb.and(qb.gte('collection_year', startYear), qb.lte('collection_year', endYear)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('strain', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('strain', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by H type range
     * @param {number} minHType - Minimum H type
     * @param {number} maxHType - Maximum H type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByHTypeRange(minHType, maxHType, options = {}) {
      return run('strain', qb.and(qb.gte('h_type', minHType), qb.lte('h_type', maxHType)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by N type range
     * @param {number} minNType - Minimum N type
     * @param {number} maxNType - Maximum N type
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByNTypeRange(minNType, maxNType, options = {}) {
      return run('strain', qb.and(qb.gte('n_type', minNType), qb.lte('n_type', maxNType)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by segment count range
     * @param {number} minSegmentCount - Minimum segment count
     * @param {number} maxSegmentCount - Maximum segment count
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getBySegmentCountRange(minSegmentCount, maxSegmentCount, options = {}) {
      return run('strain', qb.and(qb.gte('segment_count', minSegmentCount), qb.lte('segment_count', maxSegmentCount)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get strains by taxon ID range
     * @param {number} minTaxonId - Minimum taxon ID
     * @param {number} maxTaxonId - Maximum taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getByTaxonIdRange(minTaxonId, maxTaxonId, options = {}) {
      return run('strain', qb.and(qb.gte('taxon_id', minTaxonId), qb.lte('taxon_id', maxTaxonId)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search strain data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('strain', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all strain data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of strain data objects
     */
    getAll(options = {}) {
      return run('strain', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function structured_assertion(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a structured_assertion data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Structured assertion data object
     */
    getById(id, options = {}) {
      return run('structured_assertion', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query structured_assertion data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('structured_assertion', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by comment
     * @param {string} comment - The comment
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByComment(comment, options = {}) {
      return run('structured_assertion', qb.eq('comment', comment), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by evidence code
     * @param {string} evidenceCode - The evidence code
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByEvidenceCode(evidenceCode, options = {}) {
      return run('structured_assertion', qb.eq('evidence_code', evidenceCode), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('structured_assertion', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by owner
     * @param {string} owner - The owner
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByOwner(owner, options = {}) {
      return run('structured_assertion', qb.eq('owner', owner), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('structured_assertion', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by PMID
     * @param {string} pmid - The PubMed ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByPmid(pmid, options = {}) {
      return run('structured_assertion', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by property
     * @param {string} property - The property
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByProperty(property, options = {}) {
      return run('structured_assertion', qb.eq('property', property), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by public status
     * @param {boolean} isPublic - The public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('structured_assertion', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by RefSeq locus tag
     * @param {string} refseqLocusTag - The RefSeq locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByRefseqLocusTag(refseqLocusTag, options = {}) {
      return run('structured_assertion', qb.eq('refseq_locus_tag', refseqLocusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by score
     * @param {string} score - The score
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByScore(score, options = {}) {
      return run('structured_assertion', qb.eq('score', score), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by source
     * @param {string} source - The source
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getBySource(source, options = {}) {
      return run('structured_assertion', qb.eq('source', source), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by value
     * @param {string} value - The value
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByValue(value, options = {}) {
      return run('structured_assertion', qb.eq('value', value), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by user read permission
     * @param {string} userRead - The user read permission
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByUserRead(userRead, options = {}) {
      return run('structured_assertion', qb.eq('user_read', userRead), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by user write permission
     * @param {string} userWrite - The user write permission
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByUserWrite(userWrite, options = {}) {
      return run('structured_assertion', qb.eq('user_write', userWrite), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by version
     * @param {number} version - The version number
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByVersion(version, options = {}) {
      return run('structured_assertion', qb.eq('_version_', version), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('structured_assertion', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get structured assertions by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('structured_assertion', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search structured assertions by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('structured_assertion', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all structured assertions
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of structured assertion data objects
     */
    getAll(options = {}) {
      return run('structured_assertion', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function subsystem(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a subsystem data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Subsystem data object
     */
    getById(id, options = {}) {
      return run('subsystem', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query subsystem data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('subsystem', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by active status
     * @param {string} active - The active status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByActive(active, options = {}) {
      return run('subsystem', qb.eq('active', active), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by class
     * @param {string} class_ - The class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByClass(class_, options = {}) {
      return run('subsystem', qb.eq('class', class_), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by feature ID
     * @param {string} featureId - The feature ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByFeatureId(featureId, options = {}) {
      return run('subsystem', qb.eq('feature_id', featureId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by gene
     * @param {string} gene - The gene name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByGene(gene, options = {}) {
      return run('subsystem', qb.eq('gene', gene), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by genome ID
     * @param {string} genomeId - The genome ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByGenomeId(genomeId, options = {}) {
      return run('subsystem', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by genome name (case insensitive)
     * @param {string} genomeName - The genome name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByGenomeName(genomeName, options = {}) {
      return run('subsystem', qb.eq('genome_name', genomeName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by owner
     * @param {string} owner - The owner
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByOwner(owner, options = {}) {
      return run('subsystem', qb.eq('owner', owner), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by PATRIC ID
     * @param {string} patricId - The PATRIC ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByPatricId(patricId, options = {}) {
      return run('subsystem', qb.eq('patric_id', patricId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by product
     * @param {string} product - The product name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByProduct(product, options = {}) {
      return run('subsystem', qb.eq('product', product), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by public status
     * @param {boolean} isPublic - The public status
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByPublicStatus(isPublic, options = {}) {
      return run('subsystem', qb.eq('public', isPublic), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by RefSeq locus tag
     * @param {string} refseqLocusTag - The RefSeq locus tag
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByRefseqLocusTag(refseqLocusTag, options = {}) {
      return run('subsystem', qb.eq('refseq_locus_tag', refseqLocusTag), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by role ID
     * @param {string} roleId - The role ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByRoleId(roleId, options = {}) {
      return run('subsystem', qb.eq('role_id', roleId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by role name
     * @param {string} roleName - The role name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByRoleName(roleName, options = {}) {
      return run('subsystem', qb.eq('role_name', roleName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by subclass
     * @param {string} subclass - The subclass
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getBySubclass(subclass, options = {}) {
      return run('subsystem', qb.eq('subclass', subclass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by subsystem ID
     * @param {string} subsystemId - The subsystem ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getBySubsystemId(subsystemId, options = {}) {
      return run('subsystem', qb.eq('subsystem_id', subsystemId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by subsystem name
     * @param {string} subsystemName - The subsystem name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getBySubsystemName(subsystemName, options = {}) {
      return run('subsystem', qb.eq('subsystem_name', subsystemName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by superclass
     * @param {string} superclass - The superclass
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getBySuperclass(superclass, options = {}) {
      return run('subsystem', qb.eq('superclass', superclass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by taxon ID
     * @param {number} taxonId - The taxon ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByTaxonId(taxonId, options = {}) {
      return run('subsystem', qb.eq('taxon_id', taxonId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by user read
     * @param {string} userRead - The user read
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByUserRead(userRead, options = {}) {
      return run('subsystem', qb.eq('user_read', userRead), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by user write
     * @param {string} userWrite - The user write
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByUserWrite(userWrite, options = {}) {
      return run('subsystem', qb.eq('user_write', userWrite), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('subsystem', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystems by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('subsystem', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search subsystems by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('subsystem', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all subsystems
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem data objects
     */
    getAll(options = {}) {
      return run('subsystem', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function subsystemRef(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a subsystem_ref data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Subsystem ref data object
     */
    getById(id, options = {}) {
      return run('subsystem_ref', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query subsystem_ref data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('subsystem_ref', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by class
     * @param {string} className - The class
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByClass(className, options = {}) {
      return run('subsystem_ref', qb.eq('class', className), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by description
     * @param {string} description - The description
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByDescription(description, options = {}) {
      return run('subsystem_ref', qb.eq('description', description), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by notes
     * @param {string} notes - The notes
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByNotes(notes, options = {}) {
      return run('subsystem_ref', qb.eq('notes', notes), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by PMID
     * @param {string} pmid - The PMID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByPmid(pmid, options = {}) {
      return run('subsystem_ref', qb.eq('pmid', pmid), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by role ID
     * @param {string} roleId - The role ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByRoleId(roleId, options = {}) {
      return run('subsystem_ref', qb.eq('role_id', roleId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by role name
     * @param {string} roleName - The role name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByRoleName(roleName, options = {}) {
      return run('subsystem_ref', qb.eq('role_name', roleName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by subclass
     * @param {string} subclass - The subclass
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getBySubclass(subclass, options = {}) {
      return run('subsystem_ref', qb.eq('subclass', subclass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by subsystem ID
     * @param {string} subsystemId - The subsystem ID
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getBySubsystemId(subsystemId, options = {}) {
      return run('subsystem_ref', qb.eq('subsystem_id', subsystemId), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by subsystem name
     * @param {string} subsystemName - The subsystem name
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getBySubsystemName(subsystemName, options = {}) {
      return run('subsystem_ref', qb.eq('subsystem_name', subsystemName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by superclass
     * @param {string} superclass - The superclass
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getBySuperclass(superclass, options = {}) {
      return run('subsystem_ref', qb.eq('superclass', superclass), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by date inserted range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('subsystem_ref', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get subsystem refs by date modified range
     * @param {string} startDate - Start date (YYYY-MM-DD format)
     * @param {string} endDate - End date (YYYY-MM-DD format)
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('subsystem_ref', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search subsystem refs by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('subsystem_ref', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all subsystem refs
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of subsystem ref data objects
     */
    getAll(options = {}) {
      return run('subsystem_ref', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function surveillance(context) {
  const ctx = context;

  return {
    /**
     * Retrieve a surveillance data object by id
     * @param {string} id - The id to search for
     * @param {Object} options - Additional options for the request
     * @returns {Promise<Object>} Surveillance data object
     */
    getById(id, options = {}) {
      return run('surveillance', qb.eq('id', id), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Query surveillance data with filters
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Additional options (select, sort, limit, etc.)
     * @returns {Promise<Array>} Array of surveillance data objects
     */
    queryBy(filters = {}, options = {}) {
      return run('surveillance', qb.buildAndFrom(filters), options, ctx.baseUrl, ctx.headers);
    },

    // Host-related methods
    getByHostIdentifier(hostIdentifier, options = {}) {
      return run('surveillance', qb.eq('host_identifier', hostIdentifier), options, ctx.baseUrl, ctx.headers);
    },
    getByHostSpecies(hostSpecies, options = {}) {
      return run('surveillance', qb.eq('host_species', hostSpecies), options, ctx.baseUrl, ctx.headers);
    },
    getByHostSex(hostSex, options = {}) {
      return run('surveillance', qb.eq('host_sex', hostSex), options, ctx.baseUrl, ctx.headers);
    },
    getByHostAge(hostAge, options = {}) {
      return run('surveillance', qb.eq('host_age', hostAge), options, ctx.baseUrl, ctx.headers);
    },
    getByHostCommonName(hostCommonName, options = {}) {
      return run('surveillance', qb.eq('host_common_name', hostCommonName), options, ctx.baseUrl, ctx.headers);
    },
    getByHostGroup(hostGroup, options = {}) {
      return run('surveillance', qb.eq('host_group', hostGroup), options, ctx.baseUrl, ctx.headers);
    },
    getByHostHealth(hostHealth, options = {}) {
      return run('surveillance', qb.eq('host_health', hostHealth), options, ctx.baseUrl, ctx.headers);
    },
    getByHostHabitat(hostHabitat, options = {}) {
      return run('surveillance', qb.eq('host_habitat', hostHabitat), options, ctx.baseUrl, ctx.headers);
    },
    getByHostNaturalState(hostNaturalState, options = {}) {
      return run('surveillance', qb.eq('host_natural_state', hostNaturalState), options, ctx.baseUrl, ctx.headers);
    },
    getByHostCaptureStatus(hostCaptureStatus, options = {}) {
      return run('surveillance', qb.eq('host_capture_status', hostCaptureStatus), options, ctx.baseUrl, ctx.headers);
    },
    getByHostIdType(hostIdType, options = {}) {
      return run('surveillance', qb.eq('host_id_type', hostIdType), options, ctx.baseUrl, ctx.headers);
    },
    getByHostWeight(hostWeight, options = {}) {
      return run('surveillance', qb.eq('host_weight', hostWeight), options, ctx.baseUrl, ctx.headers);
    },
    getByHostHeight(hostHeight, options = {}) {
      return run('surveillance', qb.eq('host_height', hostHeight), options, ctx.baseUrl, ctx.headers);
    },
    getByHostEthnicity(hostEthnicity, options = {}) {
      return run('surveillance', qb.eq('host_ethnicity', hostEthnicity), options, ctx.baseUrl, ctx.headers);
    },
    getByHostRace(hostRace, options = {}) {
      return run('surveillance', qb.eq('host_race', hostRace), options, ctx.baseUrl, ctx.headers);
    },

    // Sample-related methods
    getBySampleIdentifier(sampleIdentifier, options = {}) {
      return run('surveillance', qb.eq('sample_identifier', sampleIdentifier), options, ctx.baseUrl, ctx.headers);
    },
    getBySampleAccession(sampleAccession, options = {}) {
      return run('surveillance', qb.eq('sample_accession', sampleAccession), options, ctx.baseUrl, ctx.headers);
    },
    getBySampleMaterial(sampleMaterial, options = {}) {
      return run('surveillance', qb.eq('sample_material', sampleMaterial), options, ctx.baseUrl, ctx.headers);
    },
    getBySampleTransportMedium(sampleTransportMedium, options = {}) {
      return run('surveillance', qb.eq('sample_transport_medium', sampleTransportMedium), options, ctx.baseUrl, ctx.headers);
    },
    getBySampleReceiptDate(sampleReceiptDate, options = {}) {
      return run('surveillance', qb.eq('sample_receipt_date', sampleReceiptDate), options, ctx.baseUrl, ctx.headers);
    },

    // Collection-related methods
    getByCollectionCity(collectionCity, options = {}) {
      return run('surveillance', qb.eq('collection_city', collectionCity), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionCountry(collectionCountry, options = {}) {
      return run('surveillance', qb.eq('collection_country', collectionCountry), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionStateProvince(collectionStateProvince, options = {}) {
      return run('surveillance', qb.eq('collection_state_province', collectionStateProvince), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionPoi(collectionPoi, options = {}) {
      return run('surveillance', qb.eq('collection_poi', collectionPoi), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionSeason(collectionSeason, options = {}) {
      return run('surveillance', qb.eq('collection_season', collectionSeason), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionYear(collectionYear, options = {}) {
      return run('surveillance', qb.eq('collection_year', collectionYear), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectorInstitution(collectorInstitution, options = {}) {
      return run('surveillance', qb.eq('collector_institution', collectorInstitution), options, ctx.baseUrl, ctx.headers);
    },
    getByContributingInstitution(contributingInstitution, options = {}) {
      return run('surveillance', qb.eq('contributing_institution', contributingInstitution), options, ctx.baseUrl, ctx.headers);
    },
    getByContactEmailAddress(contactEmailAddress, options = {}) {
      return run('surveillance', qb.eq('contact_email_address', contactEmailAddress), options, ctx.baseUrl, ctx.headers);
    },
    getByProjectIdentifier(projectIdentifier, options = {}) {
      return run('surveillance', qb.eq('project_identifier', projectIdentifier), options, ctx.baseUrl, ctx.headers);
    },

    // Pathogen-related methods
    getBySpecies(species, options = {}) {
      return run('surveillance', qb.eq('species', species), options, ctx.baseUrl, ctx.headers);
    },
    getByStrain(strain, options = {}) {
      return run('surveillance', qb.eq('strain', strain), options, ctx.baseUrl, ctx.headers);
    },
    getBySubtype(subtype, options = {}) {
      return run('surveillance', qb.eq('subtype', subtype), options, ctx.baseUrl, ctx.headers);
    },
    getByPathogenType(pathogenType, options = {}) {
      return run('surveillance', qb.eq('pathogen_type', pathogenType), options, ctx.baseUrl, ctx.headers);
    },
    getByGenomeId(genomeId, options = {}) {
      return run('surveillance', qb.eq('genome_id', genomeId), options, ctx.baseUrl, ctx.headers);
    },
    getBySequenceAccession(sequenceAccession, options = {}) {
      return run('surveillance', qb.eq('sequence_accession', sequenceAccession), options, ctx.baseUrl, ctx.headers);
    },
    getByTaxonLineageId(taxonLineageId, options = {}) {
      return run('surveillance', qb.eq('taxon_lineage_ids', taxonLineageId), options, ctx.baseUrl, ctx.headers);
    },

    // Disease-related methods
    getByDiseaseStatus(diseaseStatus, options = {}) {
      return run('surveillance', qb.eq('disease_status', diseaseStatus), options, ctx.baseUrl, ctx.headers);
    },
    getByDiseaseSeverity(diseaseSeverity, options = {}) {
      return run('surveillance', qb.eq('disease_severity', diseaseSeverity), options, ctx.baseUrl, ctx.headers);
    },
    getByDiagnosis(diagnosis, options = {}) {
      return run('surveillance', qb.eq('diagnosis', diagnosis), options, ctx.baseUrl, ctx.headers);
    },
    getBySymptoms(symptoms, options = {}) {
      return run('surveillance', qb.eq('symptoms', symptoms), options, ctx.baseUrl, ctx.headers);
    },
    getBySuddenOnset(suddenOnset, options = {}) {
      return run('surveillance', qb.eq('sudden_onset', suddenOnset), options, ctx.baseUrl, ctx.headers);
    },
    getByOnsetHours(onsetHours, options = {}) {
      return run('surveillance', qb.eq('onset_hours', onsetHours), options, ctx.baseUrl, ctx.headers);
    },

    // Treatment-related methods
    getByTreatment(treatment, options = {}) {
      return run('surveillance', qb.eq('treatment', treatment), options, ctx.baseUrl, ctx.headers);
    },
    getByTreatmentType(treatmentType, options = {}) {
      return run('surveillance', qb.eq('treatment_type', treatmentType), options, ctx.baseUrl, ctx.headers);
    },
    getByTreatmentDosage(treatmentDosage, options = {}) {
      return run('surveillance', qb.eq('treatment_dosage', treatmentDosage), options, ctx.baseUrl, ctx.headers);
    },
    getByDurationOfTreatment(durationOfTreatment, options = {}) {
      return run('surveillance', qb.eq('duration_of_treatment', durationOfTreatment), options, ctx.baseUrl, ctx.headers);
    },
    getByInitiationOfTreatment(initiationOfTreatment, options = {}) {
      return run('surveillance', qb.eq('initiation_of_treatment', initiationOfTreatment), options, ctx.baseUrl, ctx.headers);
    },
    getByPreVisitMedications(preVisitMedications, options = {}) {
      return run('surveillance', qb.eq('pre_visit_medications', preVisitMedications), options, ctx.baseUrl, ctx.headers);
    },
    getByPostVisitMedications(postVisitMedications, options = {}) {
      return run('surveillance', qb.eq('post_visit_medications', postVisitMedications), options, ctx.baseUrl, ctx.headers);
    },
    getByMaintenanceMedication(maintenanceMedication, options = {}) {
      return run('surveillance', qb.eq('maintenance_medication', maintenanceMedication), options, ctx.baseUrl, ctx.headers);
    },

    // Hospitalization-related methods
    getByHospitalized(hospitalized, options = {}) {
      return run('surveillance', qb.eq('hospitalized', hospitalized), options, ctx.baseUrl, ctx.headers);
    },
    getByHospitalizationDuration(hospitalizationDuration, options = {}) {
      return run('surveillance', qb.eq('hospitalization_duration', hospitalizationDuration), options, ctx.baseUrl, ctx.headers);
    },
    getByIntensiveCareUnit(intensiveCareUnit, options = {}) {
      return run('surveillance', qb.eq('intensive_care_unit', intensiveCareUnit), options, ctx.baseUrl, ctx.headers);
    },
    getByEcmo(ecmo, options = {}) {
      return run('surveillance', qb.eq('ecmo', ecmo), options, ctx.baseUrl, ctx.headers);
    },
    getByVentilation(ventilation, options = {}) {
      return run('surveillance', qb.eq('ventilation', ventilation), options, ctx.baseUrl, ctx.headers);
    },
    getByOxygenSaturation(oxygenSaturation, options = {}) {
      return run('surveillance', qb.eq('oxygen_saturation', oxygenSaturation), options, ctx.baseUrl, ctx.headers);
    },

    // Vaccination-related methods
    getByVaccinationType(vaccinationType, options = {}) {
      return run('surveillance', qb.eq('vaccination_type', vaccinationType), options, ctx.baseUrl, ctx.headers);
    },
    getByVaccineDosage(vaccineDosage, options = {}) {
      return run('surveillance', qb.eq('vaccine_dosage', vaccineDosage), options, ctx.baseUrl, ctx.headers);
    },
    getByVaccineLotNumber(vaccineLotNumber, options = {}) {
      return run('surveillance', qb.eq('vaccine_lot_number', vaccineLotNumber), options, ctx.baseUrl, ctx.headers);
    },
    getByVaccineManufacturer(vaccineManufacturer, options = {}) {
      return run('surveillance', qb.eq('vaccine_manufacturer', vaccineManufacturer), options, ctx.baseUrl, ctx.headers);
    },
    getByDaysElapsedToVaccination(daysElapsedToVaccination, options = {}) {
      return run('surveillance', qb.eq('days_elapsed_to_vaccination', daysElapsedToVaccination), options, ctx.baseUrl, ctx.headers);
    },
    getBySourceOfVaccineInformation(sourceOfVaccineInformation, options = {}) {
      return run('surveillance', qb.eq('source_of_vaccine_information', sourceOfVaccineInformation), options, ctx.baseUrl, ctx.headers);
    },
    getByOtherVaccinations(otherVaccinations, options = {}) {
      return run('surveillance', qb.eq('other_vaccinations', otherVaccinations), options, ctx.baseUrl, ctx.headers);
    },

    // Exposure-related methods
    getByExposure(exposure, options = {}) {
      return run('surveillance', qb.eq('exposure', exposure), options, ctx.baseUrl, ctx.headers);
    },
    getByExposureType(exposureType, options = {}) {
      return run('surveillance', qb.eq('exposure_type', exposureType), options, ctx.baseUrl, ctx.headers);
    },
    getByDurationOfExposure(durationOfExposure, options = {}) {
      return run('surveillance', qb.eq('duration_of_exposure', durationOfExposure), options, ctx.baseUrl, ctx.headers);
    },
    getByUseOfPersonalProtectiveEquipment(useOfPersonalProtectiveEquipment, options = {}) {
      return run('surveillance', qb.eq('use_of_personal_protective_equipment', useOfPersonalProtectiveEquipment), options, ctx.baseUrl, ctx.headers);
    },

    // Lifestyle and health-related methods
    getByTobaccoUse(tobaccoUse, options = {}) {
      return run('surveillance', qb.eq('tobacco_use', tobaccoUse), options, ctx.baseUrl, ctx.headers);
    },
    getByPacksPerDayForHowManyYears(packsPerDayForHowManyYears, options = {}) {
      return run('surveillance', qb.eq('packs_per_day_for_how_many_years', packsPerDayForHowManyYears), options, ctx.baseUrl, ctx.headers);
    },
    getByAlcoholOrOtherDrugDependence(alcoholOrOtherDrugDependence, options = {}) {
      return run('surveillance', qb.eq('alcohol_or_other_drug_dependence', alcoholOrOtherDrugDependence), options, ctx.baseUrl, ctx.headers);
    },
    getByBreastfeeding(breastfeeding, options = {}) {
      return run('surveillance', qb.eq('breastfeeding', breastfeeding), options, ctx.baseUrl, ctx.headers);
    },
    getByPregnancy(pregnancy, options = {}) {
      return run('surveillance', qb.eq('pregnancy', pregnancy), options, ctx.baseUrl, ctx.headers);
    },
    getByTrimesterOfPregnancy(trimesterOfPregnancy, options = {}) {
      return run('surveillance', qb.eq('trimester_of_pregnancy', trimesterOfPregnancy), options, ctx.baseUrl, ctx.headers);
    },
    getByDaycareAttendance(daycareAttendance, options = {}) {
      return run('surveillance', qb.eq('daycare_attendance', daycareAttendance), options, ctx.baseUrl, ctx.headers);
    },
    getByNursingHomeResidence(nursingHomeResidence, options = {}) {
      return run('surveillance', qb.eq('nursing_home_residence', nursingHomeResidence), options, ctx.baseUrl, ctx.headers);
    },
    getByPrimaryLivingSituation(primaryLivingSituation, options = {}) {
      return run('surveillance', qb.eq('primary_living_situation', primaryLivingSituation), options, ctx.baseUrl, ctx.headers);
    },
    getByEducation(education, options = {}) {
      return run('surveillance', qb.eq('education', education), options, ctx.baseUrl, ctx.headers);
    },
    getByProfession(profession, options = {}) {
      return run('surveillance', qb.eq('profession', profession), options, ctx.baseUrl, ctx.headers);
    },
    getByChronicConditions(chronicConditions, options = {}) {
      return run('surveillance', qb.eq('chronic_conditions', chronicConditions), options, ctx.baseUrl, ctx.headers);
    },
    getByInfectionsWithinFiveYears(infectionsWithinFiveYears, options = {}) {
      return run('surveillance', qb.eq('infections_within_five_years', infectionsWithinFiveYears), options, ctx.baseUrl, ctx.headers);
    },
    getByInfluenzaLikeIllnessOverThePastYear(influenzaLikeIllnessOverThePastYear, options = {}) {
      return run('surveillance', qb.eq('influenza_like_illness_over_the_past_year', influenzaLikeIllnessOverThePastYear), options, ctx.baseUrl, ctx.headers);
    },
    getByTypesOfAllergies(typesOfAllergies, options = {}) {
      return run('surveillance', qb.eq('types_of_allergies', typesOfAllergies), options, ctx.baseUrl, ctx.headers);
    },
    getByDialysis(dialysis, options = {}) {
      return run('surveillance', qb.eq('dialysis', dialysis), options, ctx.baseUrl, ctx.headers);
    },
    getByHumanLeukocyteAntigens(humanLeukocyteAntigens, options = {}) {
      return run('surveillance', qb.eq('human_leukocyte_antigens', humanLeukocyteAntigens), options, ctx.baseUrl, ctx.headers);
    },
    getByLongitudinalStudy(longitudinalStudy, options = {}) {
      return run('surveillance', qb.eq('longitudinal_study', longitudinalStudy), options, ctx.baseUrl, ctx.headers);
    },
    getByTravelHistory(travelHistory, options = {}) {
      return run('surveillance', qb.eq('travel_history', travelHistory), options, ctx.baseUrl, ctx.headers);
    },
    getByGeographicGroup(geographicGroup, options = {}) {
      return run('surveillance', qb.eq('geographic_group', geographicGroup), options, ctx.baseUrl, ctx.headers);
    },

    // Test-related methods
    getByPathogenTestType(pathogenTestType, options = {}) {
      return run('surveillance', qb.eq('pathogen_test_type', pathogenTestType), options, ctx.baseUrl, ctx.headers);
    },
    getByPathogenTestResult(pathogenTestResult, options = {}) {
      return run('surveillance', qb.eq('pathogen_test_result', pathogenTestResult), options, ctx.baseUrl, ctx.headers);
    },
    getByPathogenTestInterpretation(pathogenTestInterpretation, options = {}) {
      return run('surveillance', qb.eq('pathogen_test_interpretation', pathogenTestInterpretation), options, ctx.baseUrl, ctx.headers);
    },
    getByChestImagingInterpretation(chestImagingInterpretation, options = {}) {
      return run('surveillance', qb.eq('chest_imaging_interpretation', chestImagingInterpretation), options, ctx.baseUrl, ctx.headers);
    },

    // Date range methods
    getByCollectionDateRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('collection_date', startDate), qb.lte('collection_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },
    getBySubmissionDateRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('submission_date', startDate), qb.lte('submission_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },
    getByLastUpdateDateRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('last_update_date', startDate), qb.lte('last_update_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },
    getByEmbargoEndDateRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('embargo_end_date', startDate), qb.lte('embargo_end_date', endDate)), options, ctx.baseUrl, ctx.headers);
    },
    getByDateInsertedRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('date_inserted', startDate), qb.lte('date_inserted', endDate)), options, ctx.baseUrl, ctx.headers);
    },
    getByDateModifiedRange(startDate, endDate, options = {}) {
      return run('surveillance', qb.and(qb.gte('date_modified', startDate), qb.lte('date_modified', endDate)), options, ctx.baseUrl, ctx.headers);
    },

    // Location range methods
    getByCollectionLatitudeRange(minLat, maxLat, options = {}) {
      return run('surveillance', qb.and(qb.gte('collection_latitude', minLat), qb.lte('collection_latitude', maxLat)), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectionLongitudeRange(minLon, maxLon, options = {}) {
      return run('surveillance', qb.and(qb.gte('collection_longitude', minLon), qb.lte('collection_longitude', maxLon)), options, ctx.baseUrl, ctx.headers);
    },

    // Time-related methods
    getByDaysElapsedToDiseaseStatus(daysElapsedToDiseaseStatus, options = {}) {
      return run('surveillance', qb.eq('days_elapsed_to_disease_status', daysElapsedToDiseaseStatus), options, ctx.baseUrl, ctx.headers);
    },
    getByDaysElapsedToSampleCollection(daysElapsedToSampleCollection, options = {}) {
      return run('surveillance', qb.eq('days_elapsed_to_sample_collection', daysElapsedToSampleCollection), options, ctx.baseUrl, ctx.headers);
    },

    // Metadata methods
    getByAdditionalMetadata(additionalMetadata, options = {}) {
      return run('surveillance', qb.eq('additional_metadata', additionalMetadata), options, ctx.baseUrl, ctx.headers);
    },
    getByComments(comments, options = {}) {
      return run('surveillance', qb.eq('comments', comments), options, ctx.baseUrl, ctx.headers);
    },
    getByCollectorName(collectorName, options = {}) {
      return run('surveillance', qb.eq('collector_name', collectorName), options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Search surveillance data by keyword
     * @param {string} keyword - Keyword to search for
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of surveillance data objects
     */
    searchByKeyword(keyword, options = {}) {
      return run('surveillance', `keyword(${encodeURIComponent(keyword)})`, options, ctx.baseUrl, ctx.headers);
    },

    /**
     * Get all surveillance data
     * @param {Object} options - Additional options
     * @returns {Promise<Array>} Array of surveillance data objects
     */
    getAll(options = {}) {
      return run('surveillance', '', options, ctx.baseUrl, ctx.headers);
    }
  };
}

function taxonomy(context) {
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

// Public entry: client factory + generic query

// Factory client to access all resources with custom context
function createClient(contextOverrides = {}) {
  const ctx = createContext(contextOverrides);
  return {
    antibiotics: antibiotics(ctx),
    bioset: bioset(ctx),
    bioset_result: bioset_result(ctx),
    enzyme_class_ref: enzyme_class_ref(ctx),
    epitope: epitope(ctx),
    epitope_assay: epitopeAssay(ctx),
    experiment: experiment(ctx),
    gene_ontology_ref: gene_ontology_ref(ctx),
    genome: genome(ctx),
    genome_amr: genomeAmr(ctx),
    genome_feature: genomeFeature(ctx),
    genome_sequence: genomeSequence(ctx),
    id_ref: idRef(ctx),
    misc_niaid_sgc: miscNiaidSgc(ctx),
    pathway: pathway(ctx),
    pathway_ref: pathway_ref(ctx),
    ppi: ppi(ctx),
    protein_feature: protein_feature(ctx),
    protein_family_ref: proteinFamilyRef(ctx),
    protein_structure: protein_structure(ctx),
    sequence_feature: sequenceFeature(ctx),
    sequence_feature_vt: sequence_feature_vt(ctx),
    serology: serology(ctx),
    sp_gene: sp_gene(ctx),
    sp_gene_ref: spGeneRef(ctx),
    spike_lineage: spikeLineage(ctx),
    spike_variant: spikeVariant(ctx),
    strain: strain(ctx),
    structured_assertion: structured_assertion(ctx),
    subsystem: subsystem(ctx),
    subsystem_ref: subsystemRef(ctx),
    surveillance: surveillance(ctx),
    taxonomy: taxonomy(ctx),
  };
}

// Generic query function for power users (uses base context)
async function query(core, filter = '', options = {}) {
  const ctx = createContext();
  return run(core, filter, options, ctx.baseUrl, ctx.headers);
}

var index = {
  createClient,
  query,
  // Configuration functions
  setAuthToken,
  getAuthToken,
  setConfig,
  getConfig,
};

export { createClient, index as default, query };
