<template>
  <div>
    <h2>Recipes</h2>
    <ul>
      <li v-for="recipe in recipes" :key="recipe._id">
        <router-link :to="{ name: 'RecipeDetails', params: { id: recipe._id }}">
          <img v-if="recipe.recipePicture" :src="recipe.recipePicture" alt="Recipe Image" />
          <h3>{{ recipe.recipeName }}</h3>
          <p v-if="recipe.recipeTime">Time: {{ recipe.recipeTime }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import DataService from '../components/DataService.vue';
export default {
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    fetchRecipes() {
      DataService.getRecipes()
        .then((response) => {
          this.recipes = response.data;
        })
        .catch((error) => {
          console.error('Error fetching recipes:', error);
        });
    },

    deleteRecipe(id) {
      DataService.deleteRecipe(id)
        .then(() => {
          this.fetchRecipes();
        })
        .catch((error) => {
          console.error('Error deleting recipe:', error);
        });
    },
  },
};
</script>



