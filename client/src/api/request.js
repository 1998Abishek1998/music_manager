import { removeEmpty } from '../utils/sanitize';

const request = async (method, url, includeAuth, params = {}, isCsv = false, isAudio = false) => {
  const req = {
    method: method,
    headers: {
      'Accept': isCsv ? 'text/csv' : (isAudio ? 'audio/mpeg' : 'application/json'),
    },
  };

  if (includeAuth) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    req.headers = {
      ...req.headers,
      'x-user': localStorage.getItem('roleId'),
    };
  }

  if (method === 'GET') {
    const getParams = new URLSearchParams(removeEmpty(params));
    url += `?${getParams}`;
  } else if (params instanceof FormData) {
    req.body = params;
  } else {
    req.headers['Content-Type'] = 'application/json';
    req.body = JSON.stringify(removeEmpty(params));
  }

  const res = await fetch(url, req);
  if (!res.ok) {
    const data = await res.json();
    const errorMessage = 'error_msg' in data ? data.error_msg : data.message || 'Failed to fetch';
    throw new ResponseError(errorMessage, data.errors || []);
  }

  if (isCsv) {
    return await res.text();
  } else if (isAudio) {
    return await res.blob();
  } else {
    return await res.json();
  }
};

class ResponseError extends Error {
  constructor(msg, errors) {
    super(msg);
    this.errors = errors;
  }
}

export default request;
