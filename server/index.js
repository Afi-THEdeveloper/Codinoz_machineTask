const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
// to use (.env file access)
require("dotenv").config();
const dbConfig = require("./config/db");
app.use(express.static(path.join(__dirname, "public/profiles/")));
app.use(cors()); //for the permission between different server communications
app.use(express.urlencoded({ extended: true }));
// to destructure json type data from user as request
app.use(express.json());

//route configuration
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);



const PORT = process.env.PORT; //port from env file
//connect with server
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
