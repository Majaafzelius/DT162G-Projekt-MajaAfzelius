
const express = require('express');
// const mongoose = require('mongoose');
const mongoose = require('./db');
const Recipe = require('./models/recipe'); // Se till att sökvägen är korrekt

// const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Hämta alla recept
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hämta ett enskilt recept
app.get('/api/recipes/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

// Skapa ett nytt recept
app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipe({
    recipeName: req.body.recipeName,
    recipeIngrediens: req.body.recipeIngrediens,
    recipeTime: req.body.recipeTime,
    recipeInstruction: req.body.recipeInstruction,
    recipePicture: req.body.recipePicture,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Uppdatera ett recept
app.put('/api/recipes/:id', getRecipe, async (req, res) => {
  if (req.body.recipeName != null) {
    res.recipe.recipeName = req.body.recipeName;
  }
  if (req.body.recipeIngrediens != null) {
    res.recipe.recipeIngrediens = req.body.recipeIngrediens;
  }
  if (req.body.recipeTime != null) {
    res.recipe.recipeTime = req.body.recipeTime;
  }
  if (req.body.recipeInstruction != null) {
    res.recipe.recipeInstruction = req.body.recipeInstruction;
  }
  if (req.body.recipePicture != null) {
    res.recipe.recipePicture = req.body.recipePicture;
  }

  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ta bort ett recept
app.delete('/api/recipes/:id', getRecipe, async (req, res) => {
  try {
    await res.recipe.deleteOne();
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.recipe = recipe;
  next();
}

app.use((req, res, next) => {
  req.db = mongoose.connection;
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

