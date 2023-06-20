import { mongoDBusername,mongoDBpassword,DBname } from "../credentials/credentials";

const mongoose = require('mongoose');

const dbUrl = `mongodb+srv://${mongoDBusername}:${mongoDBpassword}@cluster0.68ypntq.mongodb.net/${DBname}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(dbUrl,connectionParams)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);
  });
