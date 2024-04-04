const Joi = require("joi");
const validateUser = (data) => {
  const schema = Joi.object({
    // Definisi validasi lainnya
    nama: Joi.string().min(3).max(20).required().messages({
      "string.min": "Nama minimal 3 karakter",
      "string.max": "Nama maksimal 20 karakter",
      "string.empty": "Nama tidak boleh kosong",
      "any.required": "Nama harus diisi",
    }),
    nik: Joi.string()
      .pattern(new RegExp("^[0-9]{16}$"))
      .min(16)
      .max(16)
      .required()
      .messages({
        "string.min": "NIK minimal 16 karakter",
        "string.max": "NIK maksimal 16 karakter",
        "string.empty": "NIK tidak boleh kosong",
        "any.required": "NIK harus diisi",
      }),
    no_pendaftaran: Joi.string().min(16).max(16).required().messages({
      "string.min": "No Pendaftaran minimal 16 karakter",
      "string.max": "No Pendaftaran maksimal 16 karakter",
      "string.empty": "No Pendaftaran tidak boleh kosong",
      "any.required": "No Pendaftaran harus diisi",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email tidak valid",
      "string.empty": "Email tidak boleh kosong",
      "any.required": "Email harus diisi",
    }),
  });

  return schema.validate(data);
};

module.exports = validateUser;
