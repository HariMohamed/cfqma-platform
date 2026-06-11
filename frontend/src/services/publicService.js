import { api } from './api';

const unwrap = (response) => response.data.data ?? response.data;

export const publicService = {
  getFormations: async () => unwrap(await api.get('/formations')),
  getFormation: async (slug) => unwrap(await api.get(`/formations/${slug}`)),
  getSectors: async () => unwrap(await api.get('/sectors')),
  getSector: async (slug) => unwrap(await api.get(`/sectors/${slug}`)),
  getNews: async () => unwrap(await api.get('/news')),
  getNewsItem: async (slug) => unwrap(await api.get(`/news/${slug}`)),
  getGallery: async () => unwrap(await api.get('/gallery')),
  sendContact: async (payload) => unwrap(await api.post('/contact', payload)),
  sendRegistration: async (payload) => unwrap(await api.post('/registrations', payload))
};
