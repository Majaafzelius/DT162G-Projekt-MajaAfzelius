<template>
    <div>
      <h2>Lägg till nytt recept</h2>
      <form @submit.prevent="addRecipe">
        <label for="name">Namn på receptet</label><br>
        <input v-model="newRecipe.recipeName" type="text" name="name" id="name"><br>
  
        <label for="ingrediens">Ingredienser</label><br>
        <input v-model="newRecipe.recipeIngrediens" type="text" name="ingrediens" id="ingrediens"><br>
  
        <label for="instruction">Instruktioner</label><br>
        <textarea v-model="newRecipe.recipeInstruction" name="instruction" id="instruction" rows="10"></textarea><br>
  
        <label for="picture">Länk till eventuell bild</label><br>
        <input v-model="newRecipe.recipePicture" type="text" name="picture" id="picture"><br>
  
        <label for="time">Ungefärlig tid</label><br>
        <input v-model="newRecipe.recipeTime" type="text" name="time" id="time"><br>
  
        <button class="add_btn" type="submit">Lägg till</button>
      </form>
    </div>
  </template>
  
  <script>
  import DataService from '../components/DataService.vue';

  export default {
    data() {
      return {
        newRecipe: {
            recipeName: '',
            recipeIngrediens: '',
            recipeInstruction: '',
            recipePicture: '',
            recipeTime: '',
        },
      };
    },
    methods: {
      addRecipe() {
        DataService.createRecipe(this.newRecipe)
          .then(() => {
            this.newRecipe = {
                recipeName: '',
                recipeIngrediens: '',
                recipeInstruction: '',
                recipePicture: '',
                recipeTime: '',
            };
            
          })
          .catch((error) => {
            console.error('Error adding recipe:', error);
          });
      },
    },
  };
  </script>
  
  <style>
  label {
    color: black;
  }
  </style>
  