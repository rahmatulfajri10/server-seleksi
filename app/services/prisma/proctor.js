const prisma = require("../../db/index");
const { BadRequestError } = require("../../errors");

const createProctor = async (req) => {
  const { id_user, kamera, screen } = req.body;
  const id = parseInt(id_user);

  const result = await prisma.tbl_proctor.create({
    data: {
      id_user: id,
      kamera: kamera,
      screen: screen,
    },
    select: {
      id_user: true,
      kamera: true,
      screen: true,
    },
  });
  return result;
};

module.exports = {
  createProctor,
};
