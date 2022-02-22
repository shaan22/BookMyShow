const MovieModel = require("./databse/movies");
const UserModel = require("./databse/user");
require('dotenv').config()
const express = require("express");

const app = express();
const path = require('path');

app.use(express.json());

const mongoose = require('mongoose');






const { MongoClient } = require('mongodb');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));
// var mongoose = require('mongoose');
// //Set up default mongoose connection
// var mongoDB = "mongodb+srv://shaan22:37bTGoqKB3Sxu5IN@cluster0.kuo1n.mongodb.net/Book_Company?retryWrites=true&w=majority";
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));



app.get("/",async (req,res) =>{
  return res.json("Welcome to the  BookMyshow Backend");
});

app.get("/movies",async (req,res) =>{
const GetAMovie=await MovieModel.find();
return res.json(GetAMovie);
});

app.get("/movies/:id",async (req,res) => {
  const {id} = req.params;
  const getMovie = await MovieModel.findOne({_id:id});
  return res.json(getMovie);
});

app.post("/user-register",async (req,res) => {
  const addNewUser = await UserModel.create(req.body);
  return res.json({userAdded: addNewUser, message: "User Added Successfully!!"});
});

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production") {
  app.use(express.static('build'));
  app.get('*', (req,res) => {
    req.sendFile(path.resolve(__dirname, 'build','index.html'));
  })
}

app.listen(port,(err) =>{
  if(err) return console.log(err);
  console.log('server running ',port);
console.log("Express is running");
});