const mongoose = require("mongoose");

//create book schema
const MovieSchema = mongoose.Schema({
   image: String,
   title: String,
   lang: String,
   txt: String
});

const MovieModel = mongoose.model("movies", MovieSchema);

module.exports = MovieModel;