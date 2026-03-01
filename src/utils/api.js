const API = 'http://localhost:5000';

export function getToken() {
  return localStorage.getItem('bk_token');
}

export function setToken(t) {
  localStorage.setItem('bk_token', t);
}

export function removeToken() {
  localStorage.removeItem('bk_token');
}

export async function apiFetch(path, opts = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(opts.headers || {})
  };
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}
