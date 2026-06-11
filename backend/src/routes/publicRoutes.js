import { Router } from 'express';
import {
  createContact,
  createRegistration,
  getFormation,
  getNews,
  getSector,
  listFormations,
  listGallery,
  listNews,
  listSectors
} from '../controllers/publicController.js';
import { validate } from '../middleware/validate.js';
import { contactSchema, params, registrationSchema } from '../validators/schemas.js';

export const publicRoutes = Router();

publicRoutes.get('/formations', listFormations);
publicRoutes.get('/formations/:slug', validate(params.slugParam), getFormation);
publicRoutes.get('/sectors', listSectors);
publicRoutes.get('/sectors/:slug', validate(params.slugParam), getSector);
publicRoutes.get('/news', listNews);
publicRoutes.get('/news/:slug', validate(params.slugParam), getNews);
publicRoutes.get('/gallery', listGallery);
publicRoutes.post('/contact', validate(contactSchema), createContact);
publicRoutes.post('/registrations', validate(registrationSchema), createRegistration);
