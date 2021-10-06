import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = '';
}
export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
} 

/**
 * 
 * how reduce works
 * title = 'pasta with fresh tomato sauce'
 * title.split() = ['pasta', 'with', 'tomato', 'sauce']
 * acc = 0 // acc + cur.length() = 5 // newTitle = ['pasta]
 * acc = 5 // acc + cur.length() = 9 // newTitle = ['pasta', 'with']
 * acc = 9 // acc + cur.length() = 14 // newTitle = ['pasta', 'with', 'fresh']
 * acc = 14 // acc + cur.length() = 20 // newTitle = ['pasta', 'with', 'fresh']
 * break;
 * 
 */


const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = []; 
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur)=> {
      if (acc + cur.length <= limit) {
        newTitle.push(cur); // disini meskipun const, tetapi masih dapat di push datanya, meskipun immutable (const), array dan object masih dapat di push atau di generate
      }
      return acc + cur.length; // return nilai accumulator dari hasil penjumlahan length tiap kata
    }, 0); // initial value dari accumulator (acc) adalah 0
    // return newTitle value
    return `${newTitle.join(' ')} ...`;
  } else {
    return title;
  }
}


const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href=${recipe.id}>
          <figure class="results__fig">
              <img src=${recipe.image} alt="Test">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">Publihser Placeholder</p>
          </div>
      </a>
    </li>
  `;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

// fungsi createButton akan mereturn markup
const createButton = (page, type) => {
  // data-* merupakan global html data yang dapat digunakan untuk pagination yaitu untuk menuju page yang akan dituju dengan onclick listener
  const markup = `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1} >
  <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
  </button>
  `;
  return markup;
}

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if ( page < pages) {
    button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}




// renderResults dengan default page = 1 dan default resuptperpage = 10
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
   // start dan end merupakan jumlah item yang ditampilkan tiap page
   const start = (page - 1) * resPerPage; 
   const end = page * resPerPage;

   // sama halnya seperti :
   /*
      recipes.foreEach(e => {
        const markup = `${e.id}, ${e.title} dst...`
      })
   */
  // jadi pada forEach dipassing fungsi callback renderRecipe dengan current Parameter nya adalah recipe
   recipes.slice(start, end).forEach(renderRecipe); 
   renderButtons(page, recipes.length, resPerPage);
}