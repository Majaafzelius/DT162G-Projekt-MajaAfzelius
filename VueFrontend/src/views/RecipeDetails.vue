<template>
  <div>
    <h2 v-if="!isEditing">{{ recipe.recipeName }}</h2>
    <input v-if="isEditing" v-model="editedRecipeName" type="text" /><br>
    
    <p v-if="recipe.recipeTime, !isEditing">Tid: {{ recipe.recipeTime }}</p>
    <input v-if="isEditing" v-model="editedRecipeTime" type="text" /><br>
    
    <img
      v-if="recipe.recipePicture"
      :src="recipe.recipePicture"
      alt="Recipe Image"
      class="full_img"
    /> <br>
    <input v-if="isEditing" v-model="editedRecipePicture" type="text" /><br>
    
    <p v-if="recipe.recipeIngrediens, !isEditing">{{ recipe.recipeIngrediens }}</p>
    <input v-if="isEditing" v-model="editedRecipeIngrediens" type="text" /><br>
    
    <p v-if="recipe.recipeInstruction, !isEditing">{{ recipe.recipeInstruction }}</p>
    <textarea
      v-if="isEditing"
      v-model="editedRecipeInstruction"
      cols="30"
      rows="10"
    ></textarea><br>
    
    <button @click="() => deleteRecipe()">Ta bort recept</button><br>
    
    <button v-if="!isEditing" @click="toggleEditing">Uppdatera Recept</button>
    <button v-if="isEditing" @click="saveUpdatedRecipe">Spara Uppdatering</button>
  </div>
</template>

<script>
import DataService from '../components/DataService.vue';

export default {
  data() {
    return {
      recipe: {},
      isEditing: false,
      editedRecipeName: '',
      editedRecipeTime: '',
      editedRecipePicture: '',
      editedRecipeIngrediens: '',
      editedRecipeInstruction: '',
    };
  },
  mounted() {
    this.fetchRecipe();
  },
  methods: {
    fetchRecipe() {
      const recipeId = this.$route.params.id;
      DataService.getRecipe(recipeId)
        .then((response) => {
          this.recipe = response.data;
          // Fyll i redigeringsformuläret med befintliga värden
          this.editedRecipeName = this.recipe.recipeName;
          this.editedRecipeTime = this.recipe.recipeTime;
          this.editedRecipePicture = this.recipe.recipePicture;
          this.editedRecipeIngrediens = this.recipe.recipeIngrediens;
          this.editedRecipeInstruction = this.recipe.recipeInstruction;
        })
        .catch((error) => {
          console.error('Error fetching recipe details:', error);
        });
    },
    deleteRecipe() {
      const recipeId = this.$route.params.id;
      DataService.deleteRecipe(recipeId)
        .then(() => {
          // Redirect to the recipes list after deleting
          this.$router.push({ name: 'home' });
        })
        .catch((error) => {
          console.error('Error deleting recipe:', error);
        });
    },
    toggleEditing() {
      // Byt till redigeringsläge
      this.isEditing = !this.isEditing;
    },
    saveUpdatedRecipe() {
      // Uppdatera receptet och spara ändringarna
      const updatedRecipe = {
        recipeName: this.editedRecipeName,
        recipeTime: this.editedRecipeTime,
        recipePicture: this.editedRecipePicture,
        recipeIngrediens: this.editedRecipeIngrediens,
        recipeInstruction: this.editedRecipeInstruction,
      };

      const recipeId = this.$route.params.id;
      DataService.updateRecipe(recipeId, updatedRecipe)
        .then(() => {
          // Uppdatera befintliga värden med de redigerade värdena
          this.recipe.recipeName = this.editedRecipeName;
          this.recipe.recipeTime = this.editedRecipeTime;
          this.recipe.recipePicture = this.editedRecipePicture;
          this.recipe.recipeIngrediens = this.editedRecipeIngrediens;
          this.recipe.recipeInstruction = this.editedRecipeInstruction;
          
          // Byt tillbaka till visningsläge
          this.isEditing = false;
        })
        .catch((error) => {
          console.error('Error updating recipe:', error);
        });
    },
  },
};
</script>

<style scoped>
  h1,h2,h3,h4,p{
    color: rgb(0, 0, 0);
  }

  .full_img {
    max-height: 300px;
  }
</style>
