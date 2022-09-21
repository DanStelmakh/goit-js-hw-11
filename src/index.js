import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios');
import ImagesApiService from './partials/API';

// / Refs
const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

// / Submit
function onSearch(event) {
  event.preventDefault();

  imagesApiService.query = event.currentTarget.elements.searchQuery.value;

  imagesApiService.fetchArticles();
}
// / Click
function onLoadMoreBtn() {
  imagesApiService.fetchArticles();
}
