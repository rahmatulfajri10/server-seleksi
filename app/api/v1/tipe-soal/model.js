const Joi = require('joi');
const validateRole = (data) => {
  const schema = Joi.object({
    ur_role: Joi.string().min(3).max(30).required().messages({
      'string.base': `Role harus berupa teks`,
      'string.empty': `Role tidak boleh kosong`,
      'string.min': `Role harus memiliki panjang minimal {#limit} karakter`,
      'string.max': `Role harus memiliki panjang maksimal {#limit} karakter`,
      'string.uppercase': `Role harus berupa huruf kapital (uppercase)`,
      'any.required': `Role tidak boleh kosong`
    }),
  });

  return schema.validate(data);
};

module.exports = validateRole;