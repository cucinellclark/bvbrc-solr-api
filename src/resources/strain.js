import { run } from '../core/httpClient.js';
import { qb } from '../core/queryBuilder.js';

export function strain(context) {
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