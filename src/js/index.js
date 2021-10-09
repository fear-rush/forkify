import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
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
  const btn = e.target.closest('.btn-inline *');
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
      if (state.search) {
        searchView.highlightSelected(id)
      };

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


/***
 * List Control
 * 
 */

const controlList = () => {

  // Create new list 
  if (!state.list) {
    state.list = new List();
  }

  // Add each ingredients to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });

  // Handle delete and update
  elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {

      // delete from list
      state.list.deleteItem(id);

      // delete from ui
      listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
      const val = e.target.value;
      state.list.updateItem(id, val);
    }




  });

}



['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', e => {
  // artinya adalah jika event onClick targetnya match dengan class btn-decrease atau semua child yang ada di class btn-decrease maka akan dieksekusi
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    state.recipe.updateServings('dec');
    recipeView.updateServingsIngredients(state.recipe);
    // console.log(state.recipe);
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
    // console.log(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }

  // closest dan match interchangeable, bisa digunakan bolak balik sesuai kondisi yang diperlukan

  // const btn = e.target.closest('.btn-increase');
  // if (btn) {
  //   state.recipe.updateServings('inc');
  //   recipeView.updateServingsIngredients(state.recipe);
  // }

  

})
