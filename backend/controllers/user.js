const config = require('../config/config');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../src/models/userRegister');

exports.createUser = (req,res) => {
  bcrpyt.hash(req.body.password,10)
  .then(hash => {
    const newUser = new User({
      name: req.body.name,
      employeeId: req.body.employeeId,
      designation: req.body.designation,
      email: req.body.email,
      password: hash
    });

    newUser.save()
    .then(result => {
      res.status(201).json({
        message: "User Succesfully Registered",
        result: result
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: "Invalid Registration Details"
        }
      });
    });
  });
};

exports.userLogin = (req,res) => {
  let fetchedUser;
  User.findOne({employeeId: req.body.employeeId})
  .then(user => {
    if(!user) {    // if user doesn't exist
      return res.status(401).json({
        message: 'Authentication failed once!!'
      });
    }
    // user exist
    fetchedUser = user;
    return bcrpyt.compare(req.body.password,user.password);
  })
  .then(result => {
    if(!result) {
      return res.status(401).json({
        message: 'Authentication failed twice!!'
      });
    }

    const token = jwt.sign({
      employeeId: fetchedUser.employeeId,
      userId: fetchedUser._id
    },config.jwt_password,{ expiresIn: "1h"});
    
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userData: fetchedUser
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Authentication failed thrice!!'
    });
  });
};