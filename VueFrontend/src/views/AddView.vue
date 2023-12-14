   <template>
    <div class="input-container container">
      <h2>Lägg till nytt recept</h2>
      <form @submit.prevent="addRecipe">
        <label for="name">Namn på receptet</label><br>
        <input v-model="newRecipeName" type="text" id="name" required /><br>
  
        <label for="ingrediens">Ingredienser</label><br>
        <textarea v-model="newRecipeIngrediens" id="ingrediens" required></textarea><br>
  
        <label for="instruction">Instruktioner</label><br>
        <textarea v-model="newRecipeInstruction" id="instruction" ></textarea><br>
  
        <label for="picture">Länk till eventuell bild</label><br>
        <input v-model="newRecipePicture" type="text" id="picture" /><br>
  
        <label for="time">Ungefärlig tid</label><br>
        <input v-model="newRecipeTime" type="text" id="time" /><br>

        <button class="add_btn" type="submit">Lägg till</button>
      </form>
    </div>
  </template>
  
  <script>
  import DataService from '../components/DataService.vue';
  
  export default {
    data() {
      return {
        
        newRecipeName: '',
        newRecipeIngrediens: '',
        newRecipeInstruction: '',
        newRecipePicture: '',
        newRecipeTime: '',
      };
    },
    methods: {
      addRecipe() {
        // Validera att nödvändig information finns innan du skickar förfrågan
        if (this.newRecipeName && this.newRecipeIngrediens) {
          const newRecipe = {
            recipeName: this.newRecipeName,
            recipeIngrediens: this.newRecipeIngrediens,
            recipeInstruction: this.newRecipeInstruction,
            recipePicture: this.newRecipePicture,
            recipeTime: this.newRecipeTime,
          };
          DataService.createRecipe(newRecipe)
          
            .then(() => {
              // Återställ formuläret efter att receptet har lagts till
              this.newRecipeName = '';
              this.newRecipeIngrediens = '';
              this.newRecipeInstruction = '';
              this.newRecipePicture = '';
              this.newRecipeTime = '';
            })
            .catch((error) => {
              console.error('Error adding recipe:', error);
            });
        } else {
         console.error('Invalid recipe information. Please provide at least name and ingredients.');
        }
      },
    },
  };
  </script>
  
  <style>
    label {
      color: black;
    }
    input, textarea {
      width: 100%;
      border: 2px solid gray;
      border-radius: 5px;
    }
    .add_btn {
      background-color: rgb(177, 240, 165);
      padding: 5px 10px;
      border: 1px solid rgb(70, 70, 70);
      border-radius: 5px;
      margin-top: 10px;
    }
    .add_btn:hover {
      background-color: rgb(99, 202, 78);
      padding: 5px 10px;
      border: 1px solid rgb(70, 70, 70);
      border-radius: 5px;
      margin-top: 10px;
    }

  </style>
  