const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, '');

export function mediaUrl(value) {
  if (!value) return '';
  if (/^(https?:|data:|blob:)/.test(value)) return value;
  if (value.startsWith('/uploads/')) return `${apiOrigin}${value}`;
  return value;
}
