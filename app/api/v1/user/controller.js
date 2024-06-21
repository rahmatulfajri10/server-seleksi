const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");
const validateUser = require("./model");
const {
  createUser,
  getAllUser,
  addRoleUser,
  bulkInsertAccount,
  bulkInsertParticipant,
  delRoleUser,
  deleteUser,
  updateStatusUser,
  countUser,
} = require("../../../services/prisma/user");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const create = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;
    // Validasi data menggunakan Joi
    const { error } = validateUser({ username: username, password: password });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }
    if (password !== confirmPassword)
      throw new BadRequestError("Password tidak sama");

    // Simpan data ke basis data menggunakan Prisma
    const result = await createUser(req);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllUser();
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const count = async (req, res, next) => {
  try {
    const result = await countUser();
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await deleteUser(req);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const result = await updateStatusUser(req);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const addRole = async (req, res, next) => {
  try {
    const result = await addRoleUser(req);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const delRole = async (req, res, next) => {
  try {
    const result = await delRoleUser(req);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const bulkInsertCSV = async (req, res) => {
  const dataAccount = [];
  const dataParticipant = [];
  const relativeFilePath = path.join(
    __dirname,
    "../../../../public/uploads/account/",
    req.file.filename
  );
  fs.createReadStream(relativeFilePath)
    .pipe(csv({ delimiter: ";" }))
    .on("data", (row) => {
      const columns = Object.keys(row)[0].split(";");
      const rowData = Object.values(row)[0].split(";");

      // Ubah row menjadi format yang sesuai dengan struktur tabel Anda
      const account = {
        username: rowData[1],
        password: rowData[2],
      };
      const participant = {
        username: rowData[1],
        role: rowData[3],
      };

      dataAccount.push(account);

      dataParticipant.push(participant);
    })
    .on("end", async () => {
      await bulkInsertAccount(dataAccount);

      await bulkInsertParticipant(dataParticipant);

      res.status(200).send("CSV file successfully processed");
    })
    .on("error", (error) => {
      throw new BadRequestError(error.details[0].message);
    });
};

module.exports = {
  create,
  index,
  addRole,
  bulkInsertCSV,
  delRole,
  remove,
  updateStatus,
  count,
};
