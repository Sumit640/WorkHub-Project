const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = (req,res,next) => {
  try {
    const incomingToken = req.header.authorization.split(" ")[1];
    jwt.verify(incomingToken,config.jwt_password);
    next();
  }
  catch (error) {
    res.status(401).json({
      message: "Authorization Failed!!"
    })
  }

};