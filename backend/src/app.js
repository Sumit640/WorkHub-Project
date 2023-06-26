const express = require('express');
const mongoose = require('mongoose');
const config = require('../config/config');
const port = process.env.PORT || 3000;
const UserController = require('../controllers/user');
const OrderRoutes = require('../routes/userOrders');

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

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
app.post("/userRegister",UserController.createUser);

// Login Route
app.post("/userLogin",UserController.userLogin);

// Order Routes
app.use("/api/orders",OrderRoutes);

module.exports = app;