<template>
  <div class="container">
    <h2>Recept</h2>
    <ul>
      <li v-for="recipe in recipes" :key="recipe._id">
        <router-link :to="{ name: 'RecipeDetails', params: { id: recipe._id }}">
          <img v-if="recipe.recipePicture" :src="recipe.recipePicture" alt="Recipe Image" class="img"/>
          <h3>{{ recipe.recipeName }}</h3>
          <p v-if="recipe.recipeTime">Tid: {{ recipe.recipeTime }}</p>
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

    
  },
};
</script>

<style scoped>
  li {
    list-style-type: none;
    align-self: start;
    margin: 10px;

  }
  .img {
    max-width: 100%;
  }
  h2 {
    text-align: center;
  }
  
  
</style>



