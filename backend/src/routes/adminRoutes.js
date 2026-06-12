import { Router } from 'express';
import { login, me } from '../controllers/adminAuthController.js';
import { create, dashboardStats, list, remove, update } from '../controllers/adminCrudController.js';
import { getAdminPageContent, getSettings, updateAdminPageContent, updateSettings } from '../controllers/contentController.js';
import { uploadImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { imageUpload } from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import {
  contactStatusSchema,
  eventSchema,
  eventUpdateSchema,
  formationSchema,
  formationUpdateSchema,
  gallerySchema,
  galleryUpdateSchema,
  loginSchema,
  newsSchema,
  newsUpdateSchema,
  pageContentAdminParams,
  pageContentUpdateSchema,
  partnerSchema,
  partnerUpdateSchema,
  params,
  registrationStatusSchema,
  sectorSchema,
  sectorUpdateSchema,
  settingsUpdateSchema
} from '../validators/schemas.js';

export const adminRoutes = Router();

adminRoutes.post('/auth/login', validate(loginSchema), login);
adminRoutes.get('/me', protect, me);
adminRoutes.get('/dashboard/stats', protect, dashboardStats);
adminRoutes.post('/upload', protect, imageUpload.single('image'), uploadImage);
adminRoutes.get('/settings', protect, getSettings);
adminRoutes.patch('/settings', protect, validate(settingsUpdateSchema), updateSettings);
adminRoutes.get('/page-content/:pageKey/:locale', protect, validate(pageContentAdminParams), getAdminPageContent);
adminRoutes.patch('/page-content/:pageKey/:locale', protect, validate(pageContentUpdateSchema), updateAdminPageContent);

const resources = [
  ['formations', formationSchema, formationUpdateSchema],
  ['sectors', sectorSchema, sectorUpdateSchema],
  ['news', newsSchema, newsUpdateSchema],
  ['events', eventSchema, eventUpdateSchema],
  ['gallery', gallerySchema, galleryUpdateSchema],
  ['partners', partnerSchema, partnerUpdateSchema]
];

for (const [resource, schema, updateSchema] of resources) {
  adminRoutes.get(`/${resource}`, protect, list(resource));
  adminRoutes.post(`/${resource}`, protect, validate(schema), create(resource));
  adminRoutes.patch(`/${resource}/:id`, protect, validate(updateSchema), update(resource));
  adminRoutes.delete(`/${resource}/:id`, protect, validate(params.idParam), remove(resource));
}

adminRoutes.get('/contact-messages', protect, list('contact-messages'));
adminRoutes.patch('/contact-messages/:id', protect, validate(contactStatusSchema), update('contact-messages'));
adminRoutes.get('/registrations', protect, list('registrations'));
adminRoutes.patch('/registrations/:id', protect, validate(registrationStatusSchema), update('registrations'));
