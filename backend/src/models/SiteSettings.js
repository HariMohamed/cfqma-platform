import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    singletonKey: { type: String, default: 'main', unique: true, index: true },
    phoneNumbers: [{ type: String, trim: true }],
    email: { type: String, trim: true },
    address: { type: String, trim: true },
    facebookUrl: { type: String, trim: true },
    instagramUrl: { type: String, trim: true },
    openingHours: { type: String, trim: true },
    mapEmbedUrl: { type: String, trim: true },
    defaultLanguage: { type: String, enum: ['fr', 'ar', 'en'], default: 'fr' }
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
