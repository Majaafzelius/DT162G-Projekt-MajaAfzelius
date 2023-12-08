// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/DT162G', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
