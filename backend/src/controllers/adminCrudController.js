import { ContactMessage } from '../models/ContactMessage.js';
import { Formation } from '../models/Formation.js';
import { GalleryItem } from '../models/GalleryItem.js';
import { News } from '../models/News.js';
import { Registration } from '../models/Registration.js';
import { Sector } from '../models/Sector.js';
import { AppError, asyncHandler, sendData } from '../utils/http.js';

const models = {
  formations: Formation,
  sectors: Sector,
  news: News,
  gallery: GalleryItem,
  'contact-messages': ContactMessage,
  registrations: Registration
};

const getModel = (resource) => {
  const Model = models[resource];
  if (!Model) throw new AppError('Invalid resource', 404);
  return Model;
};

export const dashboardStats = asyncHandler(async (req, res) => {
  const [
    formationsCount,
    sectorsCount,
    newsCount,
    galleryCount,
    registrationsCount,
    pendingRegistrationsCount,
    contactMessagesCount,
    unreadContactMessagesCount
  ] = await Promise.all([
    Formation.countDocuments(),
    Sector.countDocuments(),
    News.countDocuments(),
    GalleryItem.countDocuments(),
    Registration.countDocuments(),
    Registration.countDocuments({ status: { $in: ['new', 'reviewing'] } }),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ status: 'new' })
  ]);

  sendData(res, {
    formationsCount,
    sectorsCount,
    newsCount,
    galleryCount,
    registrationsCount,
    pendingRegistrationsCount,
    contactMessagesCount,
    unreadContactMessagesCount
  });
});

export const list = (resource) =>
  asyncHandler(async (req, res) => {
    sendData(res, await getModel(resource).find().sort('-createdAt'));
  });

export const create = (resource) =>
  asyncHandler(async (req, res) => {
    sendData(res, await getModel(resource).create(req.body), 201);
  });

export const update = (resource) =>
  asyncHandler(async (req, res) => {
    const item = await getModel(resource).findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) throw new AppError('Item not found', 404);
    sendData(res, item);
  });

export const remove = (resource) =>
  asyncHandler(async (req, res) => {
    const item = await getModel(resource).findByIdAndDelete(req.params.id);
    if (!item) throw new AppError('Item not found', 404);
    sendData(res, { deleted: true });
  });
