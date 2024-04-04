const Joi = require("joi");
const validateGrup = (data) => {
  const schema = Joi.object({
    nama_grup: Joi.string().min(3).max(30).required().messages({
      "string.base": `Nama Grup harus berupa teks`,
      "string.empty": `Nama Grup tidak boleh kosong`,
      "string.min": `Nama Grup harus memiliki panjang minimal {#limit} karakter`,
      "string.max": `Nama Grup harus memiliki panjang maksimal {#limit} karakter`,
      "any.required": `Nama Grup tidak boleh kosong`,
    }),
  });

  return schema.validate(data);
};

module.exports = validateGrup;
