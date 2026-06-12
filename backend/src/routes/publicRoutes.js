import { Router } from 'express';
import {
  createContact,
  createRegistration,
  getEvent,
  getFormation,
  getNews,
  getSector,
  listEvents,
  listFormations,
  listGallery,
  listNews,
  listSectors,
  trackRegistration
} from '../controllers/publicController.js';
import { getPageContent, getSettings, listPartners } from '../controllers/contentController.js';
import { validate } from '../middleware/validate.js';
import { contactSchema, pageContentPublicSchema, params, registrationSchema } from '../validators/schemas.js';

export const publicRoutes = Router();

publicRoutes.get('/formations', listFormations);
publicRoutes.get('/formations/:slug', validate(params.slugParam), getFormation);
publicRoutes.get('/sectors', listSectors);
publicRoutes.get('/sectors/:slug', validate(params.slugParam), getSector);
publicRoutes.get('/news', listNews);
publicRoutes.get('/news/:slug', validate(params.slugParam), getNews);
publicRoutes.get('/events', listEvents);
publicRoutes.get('/events/:slug', validate(params.slugParam), getEvent);
publicRoutes.get('/gallery', listGallery);
publicRoutes.get('/settings', getSettings);
publicRoutes.get('/partners', listPartners);
publicRoutes.get('/page-content/:pageKey', validate(pageContentPublicSchema), getPageContent);
publicRoutes.post('/contact', validate(contactSchema), createContact);
publicRoutes.get('/registrations/track/:trackingCode', validate(params.trackingCodeParam), trackRegistration);
publicRoutes.post('/registrations', validate(registrationSchema), createRegistration);
