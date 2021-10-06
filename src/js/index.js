import Search from './models/Search';
import * as searchView from './views/searchView';
import { clearLoader, elements, renderLoader }  from './views/base';


/****Global State */

const state = {};

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

    // 4. Search for recipes
    await state.search.getResults(); // await karena async function always return promise
  
    // 5. Render results on UI
    clearLoader();
    searchView.renderResults(state.search.results);
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