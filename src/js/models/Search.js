import axios from 'axios'; // jika menggunakan axios maka akan otomatis bentuk json, tidak perlu di parsing menggunakan method .json lagi serta lebih support browser lama daripada menggunakan fetch

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const key = '7f90296788214bfa924325cd9de77a29';
      const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${this.query}&number=30`);
      this.results = res.data.results;
      console.log(this.results);
    } catch(err) {
      alert(error);
    }
  }
}

