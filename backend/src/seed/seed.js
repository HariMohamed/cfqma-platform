import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { AdminUser } from '../models/AdminUser.js';
import { Formation } from '../models/Formation.js';
import { GalleryItem } from '../models/GalleryItem.js';
import { News } from '../models/News.js';
import { Sector } from '../models/Sector.js';
import { formations, galleryItems, news, sectors } from '../../../frontend/src/data/seedData.js';

dotenv.config();

await connectDB();

async function seedMissing(Model, items, getFilter) {
  let inserted = 0;

  for (const item of items) {
    const result = await Model.updateOne(getFilter(item), { $setOnInsert: item }, { upsert: true });
    if (result.upsertedCount) inserted += result.upsertedCount;
  }

  return inserted;
}

const [formationsInserted, sectorsInserted, newsInserted, galleryInserted] = await Promise.all([
  seedMissing(Formation, formations, (item) => ({ slug: item.slug })),
  seedMissing(Sector, sectors, (item) => ({ slug: item.slug })),
  seedMissing(News, news, (item) => ({ slug: item.slug })),
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
      galleryItems: galleryInserted,
      adminUsers: adminInserted
    }
  })
);
process.exit(0);
