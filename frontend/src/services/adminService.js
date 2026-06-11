import { api } from './api';

export const adminService = {
  login: async (credentials) => {
    const response = await api.post('/admin/auth/login', credentials);
    return response.data.data ?? response.data;
  },
  me: async () => (await api.get('/admin/me')).data,
  list: async (resource) => (await api.get(`/admin/${resource}`)).data,
  create: async (resource, payload) => (await api.post(`/admin/${resource}`, payload)).data,
  update: async (resource, id, payload) => (await api.patch(`/admin/${resource}/${id}`, payload)).data,
  remove: async (resource, id) => (await api.delete(`/admin/${resource}/${id}`)).data
};
