<script>
    import axios from 'axios';

    const apiUrl = 'http://localhost:3000/api'; // Uppdatera URL:en baserat på din Express-server

    export default {
        getRecipes() {
            return axios.get(`${apiUrl}/recipes`);
        },

        getRecipe(id) {
            return axios.get(`${apiUrl}/recipes/${id}`);
        },

        createRecipe(recipeData) {
            console.log(recipeData);
            return axios.post(`${apiUrl}/recipes`, recipeData);
        },

        updateRecipe(id, recipeData) {
            return axios.put(`${apiUrl}/recipes/${id}`, recipeData);
        },

        deleteRecipe(id) {
            return axios.delete(`${apiUrl}/recipes/${id}`);
        },
    };

</script>
