import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { clearLoader, elements, renderLoader }  from './views/base';


/****Global State */

const state = {};


/***
 * Search Control
 */
const controlSearch = async ()=> {

  // 1. Get query from view
  // const query = 'pizza';
  const query = searchView.getInput();

  if (query) {
    // 2. Add new search object to state
    state.search = new Search(query);

    // 3. Preapare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4. Search for recipes
      await state.search.getResults(); // await karena async function always return promise
    
      // 5. Render results on UI
      clearLoader();
      searchView.renderResults(state.search.results);

    } catch(err) {
      console.log(err)
      clearLoader();
    }

  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  // closest akan mencari element terdekat (search keatas menuju ancestor) yang memiliki class .btn-inline. dan ini akan menghasilkan button dengan class btn-inline itu sendiri
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    // parse dengan base 10 (decimal)
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.results, goToPage)

  }

});


/***
 * Recipe Control
 */

<<<<<<< HEAD
// const recipe = new Recipe(663136);
// recipe.getRecipe();
// console.log(recipe);
=======
const controlRecipe = async () => {
  // Get id from URL on windows object
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    state.recipe = new Recipe(id);

    try {
      // Prepare for UI changes

      // Get recipe data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // console.log(state.recipe.ingredients[0]);

      // render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
      searchView.highlightSelected(id);
      console.log(state.recipe);

    } catch(err) {
      console.log(err);
    }
  };




}

// window.addEventListener('hashchange', controlRecipe);

// multiple evenetlistener 
// load merupakan eventlistener yang digunaakan saat load suatu page selesai, maka saat di load akan menjalankan controlRecipe
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe)); 
>>>>>>> 19f9dc5
