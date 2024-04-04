const { hash, hashSync } = require("bcryptjs");
const prisma = require("../../db");
const { BadRequestError, NotFoundError } = require("../../errors");

const createUser = async (req) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    throw new BadRequestError("Password tidak sama");
  const check = await prisma.tbl_user.findFirst({
    where: {
      username: username,
    },
  });
  if (check) throw new BadRequestError("Username sudah digunakan");
  const hashedPassword = await hash(password, 12);
  const result = await prisma.tbl_user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      active: true,
    },
  });
  return result;
};

const getAllUser = async () => {
  const result = await prisma.tbl_user.findMany({
    select: {
      id: true,
      username: true,
      active: true,
      tbl_user_roles: {
        select: {
          user_role: {
            select: {
              ur_role: true,
            },
          },
        },
      },
    },
  });

  const modifiedResult = result.map((user) => ({
    id: user.id,
    username: user.username,
    active: user.active,
    role: user.tbl_user_roles.map((role) => role.user_role.ur_role),
  }));
  return modifiedResult;
};

const addRoleUser = async (req) => {
  const { username, role } = req.body;
  const user = await prisma.tbl_user.findFirst({
    where: {
      username: username,
    },
  });
  const roleCheck = await prisma.tbl_role.findFirst({
    where: {
      ur_role: role,
    },
  });
  if (!user) throw new NotFoundError("User tidak ditemukan");
  const result = await prisma.tbl_user_role.create({
    data: {
      id_user: user.id,
      id_role: roleCheck.id,
    },
    select: {
      id_user: true,
      id_role: true,
    },
  });
  return result;
};

const createBulk = (account) => {
  const hashedPassword = hashSync(account.password, 12);
  return prisma.tbl_user.create({
    data: {
      username: account.username,
      password: hashedPassword,
    },
  });
};

const bulkInsertAccount = (accounts) => {
  const insertPromises = accounts.map((account) => createBulk(account));
  return prisma.$transaction(insertPromises);
};

const bulkInsertParticipant = async (participants) => {
  const insertPromises = [];

  for (const participant of participants) {
    const user = await prisma.tbl_user.findUnique({
      where: { username: participant.username },
    });

    const role = await prisma.tbl_role.findFirst({
      where: { ur_role: participant.role },
    });

    if (!user || !role) {
      throw new Error(
        `User or role not found for participant: ${JSON.stringify(participant)}`
      );
    }

    insertPromises.push(
      prisma.tbl_user_role.create({
        data: {
          id_user: user.id,
          id_role: role.id,
        },
      })
    );
  }

  return prisma.$transaction(insertPromises);
};

module.exports = {
  createUser,
  getAllUser,
  addRoleUser,
  bulkInsertAccount,
  bulkInsertParticipant,
};
