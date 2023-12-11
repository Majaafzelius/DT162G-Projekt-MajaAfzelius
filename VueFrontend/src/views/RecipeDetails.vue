<template>
  <div>
    <h2>{{ recipe.recipeName }}</h2>
    <p v-if="recipe.recipeTime">Time: {{ recipe.recipeTime }}</p>
    <img v-if="recipe.recipePicture" :src="recipe.recipePicture" alt="Recipe Image" />
    <p>{{ recipe.recipeInstruction }}</p>
    <button @click="() => deleteRecipe()">Delete Recipe</button>
  </div>
</template>

<script>
import DataService from '../components/DataService.vue';

export default {
  data() {
    return {
      recipe: {},
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
  },
  
};
</script>

<style scoped>
  h1,h2,h3,h4,p{
    color: rgb(0, 0, 0);
  }
</style>