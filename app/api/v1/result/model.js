const Joi = require('joi');
const validateResult = (data) => {
  const schema = Joi.object({
    id_user: Joi.number().required().messages({
      'number.base': `ID User harus berupa angka`,
      'number.empty': `ID User tidak boleh kosong`,
      'any.required': `ID User tidak boleh kosong`
    }),
    kd_soal: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#\$%\^&*]{3,30}$')).required().messages({
      'string.empty': 'Kode soal tidak boleh kosong',
      'any.required': 'Kode soal harus diisi',
    }),

  });

  return schema.validate(data);
};

module.exports = validateResult;