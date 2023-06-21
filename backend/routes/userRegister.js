const express = require("express");
const bcrpyt = require('bcryptjs');

const User = require("../src/models/userRegister");
const router = express.Router();

router.post("/", (req,res,next) => {
  // console.log(req.body);
  bcrpyt.hash(req.body.password,10)
  .then(hash => {
    const newUser = new User({
      name: req.body.name,
      employeeId: req.body.employeeId,
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
        error: err
      });
    });
  });
  
});


module.exports = router;