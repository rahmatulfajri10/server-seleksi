const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");

const {
  getAllSoal,
  bulkInsert,
  removeSoal,
} = require("../../../services/prisma/soal");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const bulkInsertCSV = async (req, res) => {
  const { kd_soal } = req.params;

  const data = [];

  const relativeFilePath = path.join(
    __dirname,
    "../../../../public/uploads/soal/",
    req.file.filename
  );
  fs.createReadStream(relativeFilePath)
    .pipe(csv({ delimiter: ";" }))
    .on("data", (row) => {
      const columns = Object.keys(row)[0].split(";");
      const rowData = Object.values(row)[0].split(";");

      // Ubah row menjadi format yang sesuai dengan struktur tabel Anda
      const question = {
        kd_soal: kd_soal,
        soal: rowData[2],
        has_foto: parseInt(rowData[3]),
        url_foto: rowData[4],
        tipe_soal: parseInt(rowData[5]),
        tbl_options: [],
      };

      // If the question type is 1 (multiple choice), create the options
      if (rowData[5] == 1) {
        question.tbl_options = [
          {
            option: rowData[6],
            score: parseInt(rowData[7]),
            has_foto: parseInt(rowData[8]),
            url_foto: rowData[9],
          },
          {
            option: rowData[10],
            score: parseInt(rowData[11]),
            has_foto: parseInt(rowData[12]),
            url_foto: rowData[13],
          },
          {
            option: rowData[14],
            score: parseInt(rowData[15]),
            has_foto: parseInt(rowData[16]),
            url_foto: rowData[17],
          },
          {
            option: rowData[18],
            score: parseInt(rowData[19]),
            has_foto: parseInt(rowData[20]),
            url_foto: rowData[21],
          },
        ].filter((option) => option.option != null); // Filter out any options that are null
      }
      if (rowData[22]) {
        question.tbl_options.push({
          option: rowData[22],
          score: parseInt(rowData[23]),
          has_foto: parseInt(rowData[24]),
          url_foto: rowData[25],
        });
      }
      data.push(question);
    })
    .on("end", async () => {
      await bulkInsert(data);
      res.status(200).send("CSV file successfully processed");
    })
    .on("error", (error) => {
      throw new BadRequestError(error.details[0].message);
    });
};

const remove = async (req, res, next) => {
  try {
    const result = await removeSoal(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const index = async (req, res, next) => {
  try {
    const result = await getAllSoal(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  bulkInsertCSV,
  index,
  remove,
};
