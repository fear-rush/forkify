// pada file base.js ini berisi komponen yang reusable dan dapat digunakan pada model / views lain


export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput:document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results__list'),
  searchResPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping')
};

export const renderLoader = parent => {
  const markup = `
    <div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', markup);
};

export const clearLoader = () => {
  const loader = document.querySelector('.loader'); // ditaruh didalam fungsi clearLoader dikarenakan jika ditaruh pada object element maka class laoder belum muncul saat page pertama kali dibuka. yang ditaruh di object element hanya class yang sudah ada saat page dibuka
  if(loader) {
    loader.parentElement.removeChild(loader); 
  }
}


