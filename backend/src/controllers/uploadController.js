import { AppError, asyncHandler, sendData } from '../utils/http.js';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('Image file is required.', 400);

  sendData(
    res,
    {
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    },
    201
  );
});
