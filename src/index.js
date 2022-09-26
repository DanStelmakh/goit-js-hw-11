import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios');
import ImagesApiService from './partials/API';
import LoadMoreBtn from './partials/load-more';

// / Refs
const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

// / Load-more button
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

loadMoreBtn.enable();

const imagesApiService = new ImagesApiService();

// / EventListeners
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchCards);

// / Submit (search)
function onSearch(event) {
  event.preventDefault();

  imagesApiService.query =
    event.currentTarget.elements.searchQuery.value.trim();

  if (imagesApiService.query === '') {
    return Notiflix.Notify.info('Enter a request, please');
  }

  loadMoreBtn.show();

  imagesApiService.resetPage();
  clearImages();
  fetchCards();
}
// / Click (load more)

function fetchCards() {
  loadMoreBtn.disable();

  imagesApiService.fetchArticles().then(hits => {
    createImagesMarkup(hits.hits);

    loadMoreBtn.enable();
  });
}

// / Render page
function createImagesMarkup(hits) {
  const images = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card"><a class="photo-link" href="${largeImageURL}">
<img class ="photo-image" src="${webformatURL}" alt="${tags}" loading="lazy" width = "250"  />
<div class="info">
  <p class="info-item">
    <b>Likes ${likes}</b>
  </p>
  <p class="info-item">
    <b>Views ${views}</b>
  </p>
  <p class="info-item">
    <b>Comments ${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads ${downloads}</b>
  </p>
</div>
</div>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', images);
}

function clearImages() {
  refs.gallery.innerHTML = '';
}
