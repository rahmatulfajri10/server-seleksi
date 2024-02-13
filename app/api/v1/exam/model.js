const Joi = require('joi');
const validateExam = (data) => {
  const schema = Joi.object({
    // Definisi validasi lainnya
    nama: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#\$%\^&*]{3,30}$')).min(3).max(20).required().messages({
      'string.min': 'Nama minimal 3 karakter',
      'string.max': 'Nama maksimal 20 karakter',
      'string.empty': 'Nama tidak boleh kosong',
      'any.required': 'Nama harus diisi',
    }),
    kode_soal: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#\$%\^&*]{3,30}$')).min(3).max(20).required().messages({
      'string.min': 'Kode soal minimal 3 karakter',
      'string.max': 'Kode soal maksimal 20 karakter',
      'string.empty': 'Kode soal tidak boleh kosong',
      'any.required': 'Kode soal harus diisi',
    }),
    description: Joi.string().min(3).max(100).required().messages({
      'string.min': 'Deskripsi minimal 3 karakter',
      'string.max': 'Deskripsi maksimal 20 karakter',
      'string.empty': 'Deskripsi tidak boleh kosong',
      'any.required': 'Deskripsi harus diisi',
    }),
    start_datetime: Joi.date().required().messages({
      'date.empty': 'Tanggal mulai tidak boleh kosong',
      'any.required': 'Tanggal mulai harus diisi',
    }),
    end_datetime: Joi.date().required().messages({
      'date.empty': 'Tanggal berakhir tidak boleh kosong',
      'any.required': 'Tanggal berakhir harus diisi',
    }),
    max_score: Joi.number().required().messages({
      'number.empty': 'Nilai maksimal tidak boleh kosong',
      'any.required': 'Nilai maksimal harus diisi',
    }),
    min_pass_score: Joi.number().required().messages({
      'number.empty': 'Nilai minimal tidak boleh kosong',
      'any.required': 'Nilai minimal harus diisi',
    }),
    duration: Joi.number().required().messages({
      'number.empty': 'Durasi tidak boleh kosong',
      'any.required': 'Durasi harus diisi',
    }),
  });

  return schema.validate(data);
};

module.exports = {
  validateExam
}