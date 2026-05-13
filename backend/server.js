require("dotenv").config();

const express =require("express");
const cors=require("cors");
const { connect } = require("mongoose");
const connectDB=require("./config/db")
const User=require("./models/User")

const app=express();
app.use(cors());
app.use(express.json());

connectDB();
app.listen(5000, async () => {
await User.create({
   name: "Rahul",
   email: "rahul@gmail.com",
   password: "123456"
});

  console.log("User inserted");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));