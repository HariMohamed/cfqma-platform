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

await Promise.all([
  Formation.deleteMany(),
  Sector.deleteMany(),
  News.deleteMany(),
  GalleryItem.deleteMany()
]);

await Formation.insertMany(formations);
await Sector.insertMany(sectors);
await News.insertMany(news);
await GalleryItem.insertMany(galleryItems);

if (process.env.ADMIN_SEED_EMAIL && process.env.ADMIN_SEED_PASSWORD) {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD, 12);
  await AdminUser.findOneAndUpdate(
    { email: process.env.ADMIN_SEED_EMAIL.toLowerCase() },
    {
      name: process.env.ADMIN_SEED_NAME || 'CFQMA Admin',
      email: process.env.ADMIN_SEED_EMAIL.toLowerCase(),
      passwordHash,
      role: 'admin',
      isActive: true
    },
    { upsert: true, new: true }
  );
}

console.log('Seed completed');
process.exit(0);
