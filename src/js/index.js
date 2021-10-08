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

 const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace('#', '');

  if (id) {
      // Prepare UI for changes
      recipeView.clearRecipe();
      renderLoader(elements.recipe);

      // Highlight selected search item
      if (state.search) searchView.highlightSelected(id);

      // Create new recipe object
      state.recipe = new Recipe(id);
      console.log(state.recipe);

      try {
          // Get recipe data and parse ingredients
          await state.recipe.getRecipe();
          state.recipe.parseIngredients();

  
          // Render recipe
          clearLoader();
          recipeView.renderRecipe(state.recipe);

      } catch (err) {
          console.log(err);
          alert('Error processing recipe!');
      }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

