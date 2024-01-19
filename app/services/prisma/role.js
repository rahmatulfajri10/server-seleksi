const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')
const getAllRole = async () => {
    const result = await prisma.tbl_role.findMany()
    return result
}

const createRole = async (data) => {
    // Cek apakah data sudah ada di basis data
    const isExist = await prisma.tbl_role.findFirst({
      where: {
        ur_role: data,
      },
    });
    if (isExist === null) {
      const result = await prisma.tbl_role.create({
        data: {
          ur_role: data,
        },
      });
      return result;
    } else {
      throw new BadRequestError('Pangkat tersebut sudah ada di database');
    }
  
    
}

module.exports = { getAllRole, createRole }