const axios = require('axios');

export default class ImagesApiService {
  constructor() {
    this.form = '';
  }

  fetchArticles() {
    //  console.log(this);
    const url = `https://pixabay.com/api/?key=30078678-903172b55754a7700b8ae56fa&q=${this.form}&image_type=all&`;
    axios
      .get(url + `per_page=5&page=1`)
      .then(response => {
        // console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  //   / Чтобы из внешнего кода записать сюда что-то, сделаем геттер и сеттер
  get query() {
    return this.form;
  }
  set query(newQuery) {
    this.form = newQuery;
  }
}
