const qr = require("qrcode");
const fs = require("fs");
const path = require("path");

const generateQR = async (tamu, url) => {
  try {
    const outputPath = path.join(
      __dirname,
      "../../public/images/qrcodes/",
      tamu.id_qrcode + ".jpg"
    );
    qr.toFile(outputPath, url, function (err) {
      if (err) throw err;
      console.log("QR code created");
    });
    return id_path;
  } catch (err) {
    return err;
  }
};

module.exports = generateQR;
