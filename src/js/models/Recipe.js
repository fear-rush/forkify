import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const key = process.env.API_KEY;
      const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}&includeNutrition=false`);
      this.image = await axios(`https://spoonacular.com/recipeImages/${this.id}-636x393.jpg`);
      this.title = res.data.title;
      this.author = res.data.creditsText;
      this.url = res.data.spoonacularSourceUrl;
      this.ingredients = res.data.extendedIngredients;
      this.servings = res.data.servings;
      this.time = res.data.readyInMinutes;
      // console.log(res.data);
    } catch(err) {
      console.log(err);
    }
  }
}
