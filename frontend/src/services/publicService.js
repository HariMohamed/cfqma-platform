import { api } from './api';
import { formations, galleryItems, news, sectors } from '../data/seedData';

const withFallback = async (request, data) => {
  try {
    const response = await request();
    return response.data.data ?? response.data;
  } catch (error) {
    if (import.meta.env.DEV) console.warn('Using local seed data:', error.message);
    return data;
  }
};

export const publicService = {
  getFormations: () => withFallback(() => api.get('/formations'), formations),
  getFormation: async (slug) => (await publicService.getFormations()).find((item) => item.slug === slug),
  getSectors: () => withFallback(() => api.get('/sectors'), sectors),
  getSector: async (slug) => (await publicService.getSectors()).find((item) => item.slug === slug),
  getNews: () => withFallback(() => api.get('/news'), news),
  getNewsItem: async (slug) => (await publicService.getNews()).find((item) => item.slug === slug),
  getGallery: () => withFallback(() => api.get('/gallery'), galleryItems),
  sendContact: (payload) => api.post('/contact', payload),
  sendRegistration: (payload) => api.post('/registrations', payload)
};
