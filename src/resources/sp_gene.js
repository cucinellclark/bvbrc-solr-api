import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function sp_gene(context) {
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