import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30078678-903172b55754a7700b8ae56fa';

export default class ImagesApiService {
  constructor() {
    this.form = '';
    this.page = 1;
  }

  async fetchArticles() {
    const { data } = await axios.get(
      `?key=${KEY}&q=${this.form}s&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    // console.log(data);
    return data;
  }
  resetPage() {
    this.page = 1;
  }

  //   !New
  get currentPage() {
    return this.page;
  }

  //   / Чтобы из внешнего кода записать сюда что-то, сделаем геттер и сеттер
  get query() {
    return this.form;
  }
  set query(newQuery) {
    this.form = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
}
