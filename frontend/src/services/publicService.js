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
  getSettings: async () => unwrap(await api.get('/settings')),
  getPartners: async () => unwrap(await api.get('/partners')),
  getPageContent: async (pageKey, locale = 'fr') => unwrap(await api.get(`/page-content/${pageKey}`, { params: { locale } })),
  sendContact: async (payload) => unwrap(await api.post('/contact', payload)),
  sendRegistration: async (payload) => unwrap(await api.post('/registrations', payload))
};
