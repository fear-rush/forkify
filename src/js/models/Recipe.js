import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const key = process.env.API_KEY;
      const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}&includeNutrition=false`);
      const img = await axios(`https://spoonacular.com/recipeImages/${this.id}-636x393.jpg`);
      this.image = img.config.url;
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
  
  parseIngredients() {
    const newIngredients = this.ingredients.map( (el, index) => {

      let objIngredients = {};

      objIngredients = {
        count: this.ingredients[index].amount,
        unit: this.ingredients[index].unit,
        ingredient: this.ingredients[index].originalName
      }

      return objIngredients;

    });
    this.ingredients = newIngredients;
  }

  updateServings(type) {
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    this.ingredients.forEach((el, index) =>{
      el.count = el.count * (newServings / this.servings);
    });

    this.servings = newServings;

  }

}
