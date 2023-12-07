// app.js
const express = require('express');
const path = require('path'); // Lägg till path-modulen
const db = require('./db');
const Course = require('./models/course');

const app = express();
const port = 3000;

// Middleware för att tolka JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Hantera statiska filer
app.use(express.static('public'));

// Middleware för att särskilja API-anrop från sidanrop
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    res.setHeader('Content-Type', 'application/json');
  }
  next();
});
// Visa HTML-sidan när roten besöks
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Visa alla kurser
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/courses/:id', async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Kursen hittades inte' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Lägg till en ny kurs
app.post('/courses', async (req, res) => {
  const { courseId, courseName, coursePeriod } = req.body;

  try {
    const newCourse = new Course({ courseId, courseName, coursePeriod });
    await newCourse.save();
    res.json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lyssna på servern på port 3000
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

// Ta bort en kurs baserat på _id
app.delete('/courses/:id', async (req, res) => {
    const courseId = req.params.id;
  
    try {
      const deletedCourse = await Course.findByIdAndDelete(courseId);
  
      if (!deletedCourse) {
        return res.status(404).json({ error: 'Kursen hittades inte' });
      }
  
      res.json({ message: 'Kursen har tagits bort', deletedCourse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
