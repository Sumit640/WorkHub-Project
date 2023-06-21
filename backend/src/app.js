const express = require('express');
const mongoose = require('mongoose');
const config = require('../config/config');
const bcrpyt = require('bcryptjs');
const User = require("./models/userRegister");
const port = process.env.PORT || 3000;

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
  res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept");
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



module.exports = app;