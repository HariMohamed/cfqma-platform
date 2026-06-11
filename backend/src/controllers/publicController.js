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

export const createRegistration = asyncHandler(async (req, res) => {
  sendData(res, await Registration.create(req.body), 201);
});
