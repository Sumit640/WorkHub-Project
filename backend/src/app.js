const express = require('express');
const mongoose = require('mongoose');
const config = require('../config/config');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;

const User = require("./models/userRegister");

const OrderRoutes = require('../routes/userOrders');

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(config.mongodbURI,connectionParams)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');   // allow CORS
  res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.get("/",(req,res) => {
  res.send("Server created");
});

app.listen(port,() => {
  console.log(`server running at port no ${port}`);
});

// Register Route
app.post("/userRegister",(req,res,next) => {
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
        error: err.message
      });
    });
  });
});

// Login Route

app.post("/userLogin",(req,res,next) => {
  let fetchedUser;
  User.findOne({employeeId: req.body.employeeId})
  .then(user => {
    console.log(user);
    if(!user) {    // if user doesn't exist
      return res.status(401).json({
        message: 'Authentication failed!!'
      });
    }
    // user exist
    fetchedUser = user;
    return bcrpyt.compare(req.body.password,user.password);
  })
  .then(result => {
    if(!result) {
      return res.status(401).json({
        message: 'Authentication failed!!'
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
      message: 'Authentication failed!!'
    });
  });
});

app.use("/api/orders",OrderRoutes);

module.exports = app;