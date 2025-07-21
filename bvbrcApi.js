define([], function () {
  const BASE = 'https://www.bv-brc.org/api/';
  const headers = { Accept: 'application/json' };

  function encode(value) {
    return encodeURIComponent(value);
  }

  function objToEq(filters = {}) {
    return Object.entries(filters)
      .map(([k, v]) => `eq(${k},${encode(v)})`)
      .join(',');
  }

  async function query(core, filter = '', opts = {}) {
    const { limit, select, sort } = opts;
    const parts = [];

    if (filter) parts.push(filter);
    if (select?.length) parts.push(`select(${select.join(',')})`);
    if (sort) parts.push(`sort(${sort})`);
    if (Number.isInteger(limit)) parts.push(`limit(${limit})`);

    const url = `${BASE}${core}/?${parts.join('&')}`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  }

  // Return object in AMD format
  return {
    query,
    getGenome(id, opts = {}) {
      return query('genome', `eq(genome_id,${encode(id)})`, opts);
    },
    getGenomeFeature(id, opts = {}) {
      return query('genome_feature', `eq(feature_id,${encode(id)})`, opts);
    },
    getAntibiotic(cid, opts = {}) {
      return query('antibiotics', `eq(pubchem_cid,${encode(cid)})`, opts);
    },
    queryGenomeBy(filters, opts = {}) {
      return query('genome', `and(${objToEq(filters)})`, opts);
    },
    queryGenomeFeatureBy(filters, opts = {}) {
      return query('genome_feature', `and(${objToEq(filters)})`, opts);
    }
  };
});

