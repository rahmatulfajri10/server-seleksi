const multer = require("multer");

const storageParticipant = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/participant/");
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 99999999) + "-" + file.originalname);
  },
});

const storageSoal = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/soal/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const storageAccountParticipant = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/account/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    //reject file
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const fileFilterSoal = (req, file, cb) => {
  if (
    file.mimetype === "text/csv" ||
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    cb(null, true);
  } else {
    //reject file
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const uploadMiddlewareSoal = multer({
  storage: storageSoal,
  fileFilter: fileFilterSoal,
});

const uploadMiddlewareParticipant = multer({
  storage: storageParticipant,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: fileFilter,
});

const uploadMiddlewareAccountParticipant = multer({
  storage: storageAccountParticipant,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: fileFilterSoal,
});

module.exports = {
  uploadMiddlewareParticipant,
  uploadMiddlewareSoal,
  uploadMiddlewareAccountParticipant,
};
