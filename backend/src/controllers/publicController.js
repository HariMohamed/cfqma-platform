import { ContactMessage } from '../models/ContactMessage.js';
import { Formation } from '../models/Formation.js';
import { GalleryItem } from '../models/GalleryItem.js';
import { News } from '../models/News.js';
import { Registration } from '../models/Registration.js';
import { Sector } from '../models/Sector.js';
import { AppError, asyncHandler, sendData } from '../utils/http.js';

export const listFormations = asyncHandler(async (req, res) => {
  sendData(res, await Formation.find({ isPublished: true }).sort('title'));
});

export const getFormation = asyncHandler(async (req, res) => {
  const item = await Formation.findOne({ slug: req.params.slug, isPublished: true });
  if (!item) throw new AppError('Formation not found', 404);
  sendData(res, item);
});

export const listSectors = asyncHandler(async (req, res) => {
  sendData(res, await Sector.find({ isPublished: true }).sort('title'));
});

export const getSector = asyncHandler(async (req, res) => {
  const item = await Sector.findOne({ slug: req.params.slug, isPublished: true });
  if (!item) throw new AppError('Sector not found', 404);
  sendData(res, item);
});

export const listNews = asyncHandler(async (req, res) => {
  sendData(res, await News.find({ status: 'published' }).sort('-publishedAt'));
});

export const getNews = asyncHandler(async (req, res) => {
  const item = await News.findOne({ slug: req.params.slug, status: 'published' });
  if (!item) throw new AppError('News not found', 404);
  sendData(res, item);
});

export const listGallery = asyncHandler(async (req, res) => {
  sendData(res, await GalleryItem.find({ isPublished: true }).sort('-createdAt'));
});

export const createContact = asyncHandler(async (req, res) => {
  sendData(res, await ContactMessage.create(req.body), 201);
});

const createRegistrationWithTracking = async (payload) => {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await Registration.create(payload);
    } catch (error) {
      if (error?.code !== 11000 || !error?.keyPattern?.trackingCode) throw error;
    }
  }

  throw new AppError('Could not generate a unique tracking code', 500);
};

const maskName = (fullName = '') =>
  fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => `${part[0] ?? ''}${part.length > 1 ? '***' : ''}`)
    .join(' ');

export const createRegistration = asyncHandler(async (req, res) => {
  const registration = await createRegistrationWithTracking(req.body);
  sendData(
    res,
    {
      trackingCode: registration.trackingCode,
      status: registration.status,
      createdAt: registration.createdAt
    },
    201
  );
});

export const trackRegistration = asyncHandler(async (req, res) => {
  const trackingCode = req.params.trackingCode.toUpperCase();
  const registration = await Registration.findOne({ trackingCode })
    .select('trackingCode fullName desiredFormation status publicMessage createdAt updatedAt')
    .lean();

  if (!registration) throw new AppError('Registration not found', 404);

  sendData(res, {
    trackingCode: registration.trackingCode,
    fullName: maskName(registration.fullName),
    desiredFormation: registration.desiredFormation,
    status: registration.status,
    createdAt: registration.createdAt,
    updatedAt: registration.updatedAt,
    publicMessage: registration.publicMessage || ''
  });
});
