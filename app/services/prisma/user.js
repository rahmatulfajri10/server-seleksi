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
const countUser = async () => {
  const result = await prisma.tbl_user.count();
  return result;
};

const deleteUser = async (req) => {
  const { id } = req.params;
  try {
    let deletedUser;
    await prisma.$transaction(async (prisma) => {
      const userExists = await prisma.tbl_user.findUnique({
        where: { id: parseInt(id) },
        include: {
          tbl_user_roles: {
            include: {
              user_role: true,
            },
          },
        },
      });

      if (!userExists) {
        throw new Error(`User with id ${id} does not exist`);
      }

      // Save the user to be deleted
      deletedUser = {
        id: userExists.id,
        username: userExists.username,
        active: userExists.active,
        role: userExists.tbl_user_roles.map((role) => role.user_role.ur_role),
      };

      await prisma.tbl_user_role.deleteMany({
        where: { id_user: parseInt(id) },
      });
      await prisma.tbl_result.deleteMany({
        where: { id_user: parseInt(id) },
      });
      await prisma.tbl_proctor.deleteMany({
        where: { id_user: parseInt(id) },
      });
      await prisma.tbl_answer.deleteMany({
        where: { id_user: parseInt(id) },
      });
      await prisma.tbl_participant.deleteMany({
        where: { id_user: parseInt(id) },
      });
      await prisma.tbl_user.delete({
        where: { id: parseInt(id) },
      });
    });

    // Return the deleted user
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user and related roles:", error);
    throw error;
  }
};

const updateStatusUser = async (req) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const result = await prisma.tbl_user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        active: parseInt(active),
      },
      select: {
        id: true,
        username: true,
        active: true,
      },
    });

    return result;
  } catch (error) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
};

const addRoleUser = async (req) => {
  const { id } = req.params;
  const { role } = req.body;
  console.log(role);
  const roleCheck = await prisma.tbl_role.findFirst({
    where: {
      ur_role: role,
    },
  });
  const result = await prisma.tbl_user_role.create({
    data: {
      id_user: parseInt(id),
      id_role: roleCheck.id,
    },
    select: {
      id_user: true,
      id_role: true,
    },
  });
  return result;
};

const delRoleUser = async (req) => {
  const { id } = req.params;
  const { id_role } = req.body;
  console.log(id_role);

  const result = await prisma.tbl_user_role.deleteMany({
    where: {
      id_user: parseInt(id),
      id_role: parseInt(id_role),
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
  delRoleUser,
  deleteUser,
  updateStatusUser,
  countUser,
};
