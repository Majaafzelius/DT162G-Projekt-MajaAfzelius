// models/course.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  recipeName: String,
  recipeIngrediens: String,
  recipeInstruction: String,
  recipePicture: String,
  recipeTime: String,
});

module.exports = mongoose.model('projects', projectSchema);
