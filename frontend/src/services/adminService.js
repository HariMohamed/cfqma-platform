import { api } from './api';

const unwrap = (response) => response.data.data ?? response.data;

export const adminService = {
  login: async (credentials) => unwrap(await api.post('/admin/auth/login', credentials)),
  me: async () => unwrap(await api.get('/admin/me')),
  dashboardStats: async () => unwrap(await api.get('/admin/dashboard/stats')),
  getSettings: async () => unwrap(await api.get('/admin/settings')),
  updateSettings: async (payload) => unwrap(await api.patch('/admin/settings', payload)),
  getPageContent: async (pageKey, locale) => unwrap(await api.get(`/admin/page-content/${pageKey}/${locale}`)),
  updatePageContent: async (pageKey, locale, payload) => unwrap(await api.patch(`/admin/page-content/${pageKey}/${locale}`, payload)),
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return unwrap(await api.post('/admin/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }));
  },
  list: async (resource) => unwrap(await api.get(`/admin/${resource}`)),
  create: async (resource, payload) => unwrap(await api.post(`/admin/${resource}`, payload)),
  update: async (resource, id, payload) => unwrap(await api.patch(`/admin/${resource}/${id}`, payload)),
  remove: async (resource, id) => unwrap(await api.delete(`/admin/${resource}/${id}`))
};
