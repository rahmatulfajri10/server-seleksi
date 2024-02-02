const Joi = require('joi');
const validateUser = (data) => {
  const schema = Joi.object({
    // Definisi validasi lainnya
    username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#\$%\^&*]{3,30}$')).min(3).max(20).required().messages({
      'string.min': 'username minimal 3 karakter',
      'string.max': 'username maksimal 20 karakter',
      'string.empty': 'username tidak boleh kosong',
      'any.required': 'username harus diisi',
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#\$%\^&*]{3,30}$')).min(3).max(50).required().messages({
      'string.min': 'Password minimal 3 karakter',
      'string.max': 'Password maksimal 50 karakter',
      'string.empty': 'Password tidak boleh kosong',
      'any.required': 'Password harus diisi',
    }),


  });

  return schema.validate(data);
};

module.exports = validateUser;