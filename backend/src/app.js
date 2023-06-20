const express = require('express');
const port = process.env.PORT || 3000;
require("./db/connection");

const userRoutes = require("../routes/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');   // allow CORS
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/",(req,res) => {
  res.send("Server created");
});

app.listen(port,() => {
  console.log(`server running at port no ${port}`);
});

app.use("/api/user",userRoutes);

module.exports = app;