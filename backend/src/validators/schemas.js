import { z } from 'zod';

const idParam = z.object({ params: z.object({ id: z.string().min(1) }) });
const slugParam = z.object({ params: z.object({ slug: z.string().min(1) }) });
const idParams = z.object({ id: z.string().min(1) });

const nonEmptyPatch = (schema) =>
  schema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required'
  });

export const params = { idParam, slugParam };

const formationBody = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  sector: z.string().min(2),
  type: z.string().min(2),
  description: z.string().min(10),
  duration: z.string().optional(),
  level: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  opportunities: z.array(z.string()).optional(),
  image: z.string().optional(),
  isPublished: z.boolean().optional()
});

const sectorBody = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().min(5),
  image: z.string().optional(),
  formations: z.array(z.string()).optional(),
  isPublished: z.boolean().optional()
});

const newsBody = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  excerpt: z.string().min(5),
  content: z.string().min(10),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
  publishedAt: z.string().optional()
});

const galleryBody = z.object({
  title: z.string().min(2),
  imageUrl: z.string().min(2),
  alt: z.string().min(2),
  category: z.string().optional(),
  description: z.string().optional(),
  isPublished: z.boolean().optional()
});

export const formationSchema = z.object({ body: formationBody });
export const formationUpdateSchema = z.object({ params: idParams, body: nonEmptyPatch(formationBody) });
export const sectorSchema = z.object({ body: sectorBody });
export const sectorUpdateSchema = z.object({ params: idParams, body: nonEmptyPatch(sectorBody) });
export const newsSchema = z.object({ body: newsBody });
export const newsUpdateSchema = z.object({ params: idParams, body: nonEmptyPatch(newsBody) });
export const gallerySchema = z.object({ body: galleryBody });
export const galleryUpdateSchema = z.object({ params: idParams, body: nonEmptyPatch(galleryBody) });

export const contactStatusSchema = z.object({
  params: idParams,
  body: z.object({ status: z.enum(['new', 'read', 'archived']) })
});

export const registrationStatusSchema = z.object({
  params: idParams,
  body: z.object({ status: z.enum(['new', 'reviewing', 'accepted', 'rejected']) })
});

export const contactSchema = z.object({
  body: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(6),
    subject: z.string().min(2),
    message: z.string().min(10)
  })
});

export const registrationSchema = z.object({
  body: z.object({
    fullName: z.string().min(2),
    phone: z.string().min(6),
    email: z.string().email().optional().or(z.literal('')),
    age: z.number().int().min(12).max(80),
    city: z.string().min(2),
    desiredFormation: z.string().min(2),
    educationLevel: z.string().min(2),
    message: z.string().optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
});
