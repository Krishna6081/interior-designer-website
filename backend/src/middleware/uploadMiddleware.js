const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createStorage = (subfolder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, `../../uploads/${subfolder}`);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${subfolder}-${uniqueSuffix}${ext}`);
    }
  });
};

const imageFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp/;
  const allowedMimeTypes = /image\/(jpeg|jpg|png|webp)/;

  const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedMimeTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  }

  cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed.'), false);
};

const limits = {
  fileSize: 5 * 1024 * 1024 // 5 MB Limit
};

const uploadService = multer({ storage: createStorage('services'), fileFilter: imageFilter, limits });
const uploadProject = multer({ storage: createStorage('projects'), fileFilter: imageFilter, limits });
const uploadTestimonial = multer({ storage: createStorage('testimonials'), fileFilter: imageFilter, limits });
const uploadUser = multer({ storage: createStorage('users'), fileFilter: imageFilter, limits });

module.exports = {
  uploadService,
  uploadProject,
  uploadTestimonial,
  uploadUser
};
