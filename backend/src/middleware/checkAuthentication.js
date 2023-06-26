const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = (req,res,next) => {
  try {
    const incomingToken = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(incomingToken,config.jwt_password);
    console.log(decodedToken);
    req.userData = {employeeId: decodedToken.employeeId,userId: decodedToken.userId};
    next();
  }
  catch (error) {
    res.status(401).json({
      message: "Authorization Failed!!"
    })
  }
};