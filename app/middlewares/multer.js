const multer = require('multer');

const storageParticipant = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/participant/');
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 99999999) + '-' + file.originalname);
  },
});

const storageSoal = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/soal');
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 99999999) + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    //reject file
    cb(
      {
        message: 'Unsupported file format',
      },
      false
    );
  }
};

const uploadMiddlewareSoal = multer({
  storageSoal,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: fileFilter,
});

const uploadMiddlewareParticipant = multer({
  storage: storageParticipant,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: fileFilter,
  
  
});

module.exports = {
  uploadMiddlewareParticipant,
  uploadMiddlewareSoal,
};