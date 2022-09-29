import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios');
import ImagesApiService from './partials/API';
import LoadMoreBtn from './partials/load-more';

let gallerySimpleLightbox = new SimpleLightbox('.photo-link');

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
loadMoreBtn.refs.button.addEventListener('click', loadmore);

let totalPage = 0;

// / Submit (search)
function onSearch(event) {
  event.preventDefault();

  imagesApiService.query =
    event.currentTarget.elements.searchQuery.value.trim();

  if (imagesApiService.query === '') {
    return Notiflix.Notify.info('Enter a request, please');
  }

  //   if (imagesApiService.query !== ) {
  //     return Notiflix.Notify.warning('Enter a request, please');
  //   }

  loadMoreBtn.show();

  imagesApiService.resetPage();
  clearImages();
  fetchCards();
}

async function fetchCards() {
  // !29.09.2022
  loadMoreBtn.disable();

  //   const images = await imagesApiService.fetchArticles();
  //   const { totalHits, hits } = images;
  //   if (!hits.length) {
  //     loadMoreBtn.hide();

  //     Notiflix.Notify.failure(
  //       'Sorry, there are no images matching your search query. Please try again.'
  //     );
  //   }

  //   createImagesMarkup(hits);

  //   totalPage += hits.lenth;

  //   if (totalPage < totalHits) {
  //     loadMoreBtn.disable();
  //   }
  //   if (totalPage >= totalHits) {
  //     Notiflix.Notify.info(
  //       'We re sorry, but you have reached the end of search results.'
  //     );
  //   }

  imagesApiService
    .fetchArticles()
    .then(images => {
      const { totalHits, hits } = images;
      totalPage = Math.ceil(images.totalHits / 40);
      Notiflix.Notify.success(
        `Hooray! We found ${images.totalHits} images.`,
        '',
        "Let's watch"
      );
      gallerySimpleLightbox.refresh();
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again'
        );
        return;
      }

      createImagesMarkup(images.hits);
      // imagesApiService.incrementPage();

      // !New

      // !29.09
      if (imagesApiService.currentPage === totalPage) {
        loadMoreBtn.hide();
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      loadMoreBtn.enable();
    })
    .catch(error => Notiflix.Notify.warning(error));
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

function loadmore() {
  if (imagesApiService.currentPage === totalPage) {
    console.log(imagesApiService.currentPage);
    loadMoreBtn.hide();
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  imagesApiService.incrementPage();
  fetchCards();
}
