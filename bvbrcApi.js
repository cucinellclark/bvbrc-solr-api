const BASE = 'https://www.bv-brc.org/api/';
const ACCEPT = { Accept: 'application/json' };

function encode(value) {
  return encodeURIComponent(value);
}

function objToEq(filters = {}) {
  return Object.entries(filters)
    .map(([k, v]) => `eq(${k},${encode(v)})`)
    .join(',');
}

/**
 * Generic query
 * @param {string} core  – antibiotics | genome | genome_feature
 * @param {string} filter – raw Solr filter expression, e.g. "and((genome_id,208964.12),(genome_quality,Good))"
 * @param {object} opts  – { limit, select, sort }
 */
export async function query(core, filter = '', opts = {}) {
  const { limit, select, sort } = opts;
  const parts = [];

  if (filter) parts.push(filter);
  if (select?.length) parts.push(`select(${select.join(',')})`);
  if (sort) parts.push(`sort(${sort})`);
  if (Number.isInteger(limit)) parts.push(`limit(${limit})`);

  const url = `${BASE}${core}/?${parts.join('&')}`;
  const r = await fetch(url, { headers: ACCEPT });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

/* Convenience wrappers */
export const getGenome        = (id, opts = {}) => query('genome',        `eq(genome_id,${encode(id)})`, opts);
export const getGenomeFeature = (id, opts = {}) => query('genome_feature',`eq(feature_id,${encode(id)})`, opts);
export const getAntibiotic    = (cid, opts = {}) => query('antibiotics',  `eq(pubchem_cid,${encode(cid)})`, opts);

/* Build an AND of eq() from an object, then query */
export function queryGenomeBy(filters, opts = {}) {
  return query('genome', `and(${objToEq(filters)})`, opts);
}

export function queryGenomeFeatureBy(filters, opts = {}) {
  return query('genome_feature', `and(${objToEq(filters)})`, opts);
}

