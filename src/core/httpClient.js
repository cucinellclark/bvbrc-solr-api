const DEFAULT_BASE_URL = 'https://www.bv-brc.org/api';
const DEFAULT_HEADERS = { 
  Accept: 'application/json',
  'Content-Type': 'application/rqlquery+x-www-form-urlencoded'
};

export function createContext(overrides = {}) {
  const { baseUrl, headers } = overrides;
  
  return {
    baseUrl: baseUrl || DEFAULT_BASE_URL,
    headers: { ...DEFAULT_HEADERS, ...(headers || {}) },
  };
}

export async function run(coreName, filter, options = {}, baseUrl, headers) {
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
  
  const finalHeaders = headers || DEFAULT_HEADERS;
  
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

export default { createContext, run };

