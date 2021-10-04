import axios from 'axios';

async function getResults (query) {
  const key = '7f90296788214bfa924325cd9de77a29';
  const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${query}`);
  console.log(res);
}

getResults('pasta');

// fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.metaweather.com/api/location/${woeid}/`)}`) 