import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { AdminUser } from '../models/AdminUser.js';
import { Event } from '../models/Event.js';
import { Formation } from '../models/Formation.js';
import { GalleryItem } from '../models/GalleryItem.js';
import { News } from '../models/News.js';
import { Sector } from '../models/Sector.js';
import { formations, galleryItems, news, sectors } from '../../../frontend/src/data/seedData.js';

dotenv.config();

await connectDB();

const events = [
  {
    title: 'Exposition des produits artisanaux des apprentis',
    slug: 'exposition-produits-artisanaux-apprentis',
    type: 'exhibition',
    excerpt: 'Présentation des créations réalisées dans les ateliers du CFQMA Salé.',
    description:
      'Cette exposition valorise le travail des apprentis et met en avant les savoir-faire développés dans les ateliers du centre: couture, bois, métal, cuir, poterie et autres métiers d’artisanat.',
    date: '2026-07-20',
    endDate: '2026-07-22',
    location: 'CFQMA Salé',
    coverImage: '/images/page.jpg',
    galleryImages: [],
    participants: ['Apprentis du CFQMA Salé', 'Formateurs', 'Artisans invités'],
    relatedFormations: ['Couture traditionnelle', 'Menuiserie', 'Maroquinerie'],
    isPublished: true
  },
  {
    title: 'Atelier entrepreneuriat et insertion professionnelle',
    slug: 'atelier-entrepreneuriat-insertion-professionnelle',
    type: 'workshop',
    excerpt: 'Atelier d’accompagnement autour de l’insertion, du projet professionnel et de la création d’activité.',
    description:
      'Un atelier destiné aux lauréats et apprentis pour renforcer l’orientation, la préparation au marché du travail et l’esprit entrepreneurial avec l’appui des partenaires institutionnels et économiques.',
    date: '2026-09-15',
    location: 'CFQMA Salé',
    coverImage: '/images/page.jpg',
    galleryImages: [],
    participants: ['Lauréats', 'Apprentis', 'Partenaires'],
    relatedFormations: ['Formation Initiale', 'Formation Continue'],
    isPublished: true
  }
];

async function seedMissing(Model, items, getFilter) {
  let inserted = 0;

  for (const item of items) {
    const result = await Model.updateOne(getFilter(item), { $setOnInsert: item }, { upsert: true });
    if (result.upsertedCount) inserted += result.upsertedCount;
  }

  return inserted;
}

const [formationsInserted, sectorsInserted, newsInserted, eventsInserted, galleryInserted] = await Promise.all([
  seedMissing(Formation, formations, (item) => ({ slug: item.slug })),
  seedMissing(Sector, sectors, (item) => ({ slug: item.slug })),
  seedMissing(News, news, (item) => ({ slug: item.slug })),
  seedMissing(Event, events, (item) => ({ slug: item.slug })),
  seedMissing(GalleryItem, galleryItems, (item) => ({ title: item.title, imageUrl: item.imageUrl }))
]);

let adminInserted = 0;

if (process.env.ADMIN_SEED_EMAIL && process.env.ADMIN_SEED_PASSWORD) {
  const email = process.env.ADMIN_SEED_EMAIL.toLowerCase();
  const existingAdmin = await AdminUser.findOne({ email });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD, 12);
    await AdminUser.create({
      name: process.env.ADMIN_SEED_NAME || 'CFQMA Admin',
      email,
      passwordHash,
      role: 'admin',
      isActive: true
    });
    adminInserted = 1;
  }
}

console.log(
  JSON.stringify({
    seedMode: 'safe-idempotent',
    destructiveOperations: false,
    inserted: {
      formations: formationsInserted,
      sectors: sectorsInserted,
      news: newsInserted,
      events: eventsInserted,
      galleryItems: galleryInserted,
      adminUsers: adminInserted
    }
  })
);
process.exit(0);
