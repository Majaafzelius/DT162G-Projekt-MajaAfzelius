<template>
  <div>
    <h2>{{ recipe.recipeName }}</h2>
    <p v-if="recipe.recipeTime">Time: {{ recipe.recipeTime }}</p>
    <img v-if="recipe.recipePicture" :src="recipe.recipePicture" alt="Recipe Image" />
    <p>{{ recipe.recipeInstruction }}</p>
  </div>
</template>

<script>
import DataService from '../components//DataService.vue';

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
  },
};
</script>
