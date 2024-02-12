const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors"); // <--- New


const app = express();

// router
const userRouter = require('./app/api/v1/user/router');
const authRouter = require('./app/api/v1/auth/router');
const roleRouter = require('./app/api/v1/role/router');
const participantRouter = require('./app/api/v1/participant/router');
const tipesoalRouter = require('./app/api/v1/tipe-soal/router');

const v1 = '/api/v1/cms'

const notFoundMiddleware = require('./app/middlewares/not-found');
const errorHandlerMiddleware = require('./app/middlewares/handler-error');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // <--- New

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome To API SELEKSI_ONLINE_KADET_MAHASISWA' });
});


app.use(v1, userRouter)
app.use(v1, authRouter);
app.use(v1, roleRouter);
app.use(v1, participantRouter);
app.use(v1, tipesoalRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
