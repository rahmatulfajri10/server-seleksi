const prisma = require("../../db/index");
const { BadRequestError } = require("../../errors");

const getAllParticipant = async () => {
  const result = await prisma.$queryRaw`
    SELECT u.username, p.*
    FROM tbl_participant AS p
    INNER JOIN tbl_user AS u ON p.id_user = u.id
    `;

  return result;
};

const createParticipant = async (req) => {
  const { id_user, nama, nik, no_pendaftaran, email, no_telp } = req.body;
  const id = parseInt(id_user);
  const user = await prisma.tbl_user.findFirst({
    where: {
      id: id,
    },
    select: {
      username: true,
    },
  });
  const check = await prisma.tbl_participant.findFirst({
    where: {
      id_user: id,
    },
  });
  if (check) throw new BadRequestError("Data sudah ada");
  else {
    const result = await prisma.tbl_participant.create({
      data: {
        id_user: id,
        nama: nama,
        nik: nik,
        no_pendaftaran: no_pendaftaran,
        email: email,
        no_telp: no_telp,
        url_foto: req.file
          ? `uploads/participant/${req.file.filename}`
          : "uploads/avatar/default.jpeg",
      },
      select: {
        username: user.username,
        nama: true,
        nik: true,
        no_pendaftaran: true,
        url_foto: true,
        no_telp: true,
      },
    });
    const participantsWithUsername = {
      ...result,
      username: user.username,
    };
    return participantsWithUsername;
  }
};

const getOneParticipant = async (req) => {
  const { id } = req.params;
  const result = await prisma.tbl_participant.findFirst({
    where: {
      id_user: parseInt(id),
    },
  });
  if (!result) throw new BadRequestError("Data tidak ditemukan");
  return result;
};

const countParticipant = async () => {
  const result = await prisma.tbl_participant.count();
  return result;
};

module.exports = {
  getAllParticipant,
  createParticipant,
  getOneParticipant,
  countParticipant,
};
