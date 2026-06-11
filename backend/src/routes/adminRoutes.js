import { Router } from 'express';
import { login, me } from '../controllers/adminAuthController.js';
import { create, list, remove, update } from '../controllers/adminCrudController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  contactStatusSchema,
  formationSchema,
  formationUpdateSchema,
  gallerySchema,
  galleryUpdateSchema,
  loginSchema,
  newsSchema,
  newsUpdateSchema,
  params,
  registrationStatusSchema,
  sectorSchema,
  sectorUpdateSchema
} from '../validators/schemas.js';

export const adminRoutes = Router();

adminRoutes.post('/auth/login', validate(loginSchema), login);
adminRoutes.get('/me', protect, me);

const resources = [
  ['formations', formationSchema, formationUpdateSchema],
  ['sectors', sectorSchema, sectorUpdateSchema],
  ['news', newsSchema, newsUpdateSchema],
  ['gallery', gallerySchema, galleryUpdateSchema]
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
