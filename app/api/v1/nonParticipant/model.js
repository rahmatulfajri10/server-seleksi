const Joi = require('joi');
const validateUser = (data) => {
  const schema = Joi.object({
    // Definisi validasi lainnya
    nama: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#\$%\^&*]{3,30}$')).min(3).max(20).required().messages({
      'string.min': 'Nama minimal 3 karakter',
      'string.max': 'Nama maksimal 20 karakter',
      'string.empty': 'Nama tidak boleh kosong',
      'any.required': 'Nama harus diisi',
    }),
    ket_jabatan: Joi.string().min(3).max(50).required().messages({
      'string.min': 'Jabatan minimal 3 karakter',
      'string.max': 'Jabatan maksimal 50 karakter',
      'string.empty': 'Jabatan tidak boleh kosong',
      'any.required': 'Jabatan harus diisi',
    }),
  });

  return schema.validate(data);
};

module.exports = validateUser;