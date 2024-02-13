const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');

const { getAllSoal, bulkInsert } = require('../../../services/prisma/soal');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const bulkInsertCSV = async (req, res) => {
    const data = [];
    const relativeFilePath = path.join(__dirname, '../../../../public/uploads/soal/', req.file.filename);
    fs.createReadStream(relativeFilePath)
        .pipe(csv({delimiter: ';'}))
        .on('data', (row) => {
            // Ubah row menjadi format yang sesuai dengan struktur tabel Anda
            const question = {
                kd_soal: row.kd_soal,
                soal: row.soal,
                has_foto: row.has_foto,
                url_foto: row.url_foto,
                tipe_soal: row.tipe_soal,
                tbl_options: [],
            };

            // If the question type is 1 (multiple choice), create the options
            if (row.tipe_soal == 1) {
                question.tbl_options = [
                    { option: row.option1, score: row.score1, has_foto: row.option1_has_foto, url_foto: row.option1_url_foto },
                    { option: row.option2, score: row.score2, has_foto: row.option2_has_foto, url_foto: row.option2_url_foto },
                    { option: row.option3, score: row.score3, has_foto: row.option3_has_foto, url_foto: row.option3_url_foto },
                    { option: row.option4, score: row.score4, has_foto: row.option4_has_foto, url_foto: row.option4_url_foto },
                ].filter(option => option.option != null); // Filter out any options that are null
            }

            data.push(question);
        })
        .on('end', async () => {
            // await bulkInsert(data);
            res.status(200).send('CSV file successfully processed');
        });
        
};

const index = async (req, res, next) => {
    try{
        const result = await getAllSoal();
        res.status(StatusCodes.OK).json({
            data: result,
        });
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    bulkInsertCSV,
    index
};

