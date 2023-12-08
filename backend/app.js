const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/din-databas', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

Router.get('/items/:id', async (req, res) => {
      console.log("route test");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
