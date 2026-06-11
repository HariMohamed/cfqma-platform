import { PageContent } from '../models/PageContent.js';
import { Partner } from '../models/Partner.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { AppError, asyncHandler, sendData } from '../utils/http.js';

const SETTINGS_KEY = 'main';

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.findOne({ singletonKey: SETTINGS_KEY });
  if (!settings) throw new AppError('Site settings not configured', 404);
  sendData(res, settings);
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.findOneAndUpdate(
    { singletonKey: SETTINGS_KEY },
    { ...req.body, singletonKey: SETTINGS_KEY },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
  );
  sendData(res, settings);
});

export const listPartners = asyncHandler(async (req, res) => {
  sendData(res, await Partner.find({ isPublished: true }).sort({ order: 1, name: 1 }));
});

export const getPageContent = asyncHandler(async (req, res) => {
  const content = await PageContent.findOne({
    pageKey: req.params.pageKey,
    locale: req.query.locale || req.params.locale || 'fr'
  });
  if (!content) throw new AppError('Page content not found', 404);
  sendData(res, content);
});

export const getAdminPageContent = asyncHandler(async (req, res) => {
  const content = await PageContent.findOne({
    pageKey: req.params.pageKey,
    locale: req.params.locale
  });
  sendData(res, content ?? { pageKey: req.params.pageKey, locale: req.params.locale, sections: [] });
});

export const updateAdminPageContent = asyncHandler(async (req, res) => {
  const content = await PageContent.findOneAndUpdate(
    { pageKey: req.params.pageKey, locale: req.params.locale },
    { pageKey: req.params.pageKey, locale: req.params.locale, sections: req.body.sections },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
  );
  sendData(res, content);
});
