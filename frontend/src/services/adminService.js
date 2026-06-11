import { api } from './api';

const unwrap = (response) => response.data.data ?? response.data;

export const adminService = {
  login: async (credentials) => unwrap(await api.post('/admin/auth/login', credentials)),
  me: async () => unwrap(await api.get('/admin/me')),
  dashboardStats: async () => unwrap(await api.get('/admin/dashboard/stats')),
  list: async (resource) => unwrap(await api.get(`/admin/${resource}`)),
  create: async (resource, payload) => unwrap(await api.post(`/admin/${resource}`, payload)),
  update: async (resource, id, payload) => unwrap(await api.patch(`/admin/${resource}/${id}`, payload)),
  remove: async (resource, id) => unwrap(await api.delete(`/admin/${resource}/${id}`))
};
