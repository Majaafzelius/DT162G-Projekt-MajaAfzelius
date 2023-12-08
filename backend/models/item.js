// models/course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: String,
  courseName: String,
  coursePeriod: Number,
});

module.exports = mongoose.model('Course', courseSchema);
