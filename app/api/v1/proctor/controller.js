const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");

const { createProctor } = require("../../../services/prisma/proctor");
const prisma = require("../../../db");
const create = async (req, res, next) => {
  try {
    // Simpan data ke basis data menggunakan Prisma
    const result = await createProctor(req);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getProctorData = async (req, res) => {
  try {
    const proctorData = await prisma.tbl_proctor.findMany();

    const userIds = proctorData.map((proctor) => proctor.id_user);
    // console.log("User IDs:", userIds);
    const proctorData1 = await prisma.tbl_proctor.findMany({
      where: {
        id_user: {
          in: userIds,
        },
      },
      orderBy: {
        response_time: "desc", // Asumsikan ada field 'created_at' untuk tanggal pembuatan
      },
    });

    const proctorUser = [];
    const groupedProctorData = proctorData1.reduce((acc, current) => {
      if (!acc[current.id_user]) {
        acc[current.id_user] = current;
        proctorUser.push(current);
      }
      return acc;
    }, {});
    // console.log(proctorUser); // Array of latest proctor data for each user

    const participants = await prisma.tbl_participant.findMany({
      where: {
        id_user: {
          in: userIds,
        },
      },
      select: {
        nama: true,
        no_pendaftaran: true,
        url_foto: true,
        email: true,
        id_user: true,
        no_telp: true,
      },
    });
    const combinedData = proctorUser.map((proctor) => {
      const participant = participants.find(
        (part) => part.id_user === proctor.id_user
      );
      return {
        ...proctor,
        ...participant,
      };
    });

    const participantMap = participants.reduce((acc, participant) => {
      acc[participant.id_user] = participant.nama;
      return acc;
    }, {});

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching proctor data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProctorbyId = async (req, res) => {
  const { id_user } = req.params;
  try {
    const proctorData = await prisma.tbl_proctor.findMany({
      where: {
        id_user: parseInt(id_user),
      },
      orderBy: {
        response_time: "desc", // Ganti 'createdAt' dengan nama field yang sesuai di tabel Anda
      },
    });
    res.status(200).json(proctorData);
  } catch (error) {
    console.error("Error fetching proctor data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  create,
  getProctorData,
  getProctorbyId,
};
