const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  port: process.env.PORT,
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD,
  url_server: process.env.URL_SERVER,
};
