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

export const qb = {
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

export default qb;

