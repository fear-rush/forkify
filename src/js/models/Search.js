import axios from 'axios'; // jika menggunakan axios maka akan otomatis bentuk json, tidak perlu di parsing menggunakan method .json lagi serta lebih support browser lama daripada menggunakan fetch

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {   
      const key = process.env.API_KEY;
      const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${this.query}&number=30`);
      // console.log(key);
      this.results = res.data.results;
      console.log(this.results);
    } catch(err) {
      alert(err);
    }
  }
}

