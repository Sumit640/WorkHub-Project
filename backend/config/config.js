require('dotenv').config();

module.exports = {
  mongodbURI: process.env.MONGODB_URI,
  jwt_password: process.env.JWT_PASSWORD
};