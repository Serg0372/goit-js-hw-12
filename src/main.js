import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { createGalleryCard } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-form-hw-12');
const searcGalleryEl = document.querySelector('.js-gallery-hw-12');
const searchLoaderEl = document.querySelector('.js-loader-hw-12');
const searchBtnLoadMore = document.querySelector('.js-button-load-more-hw-12');

let currentPage = 1;
let searchFormValue = '';

const gallery = new SimpleLightbox('.js-gallery-hw-12 a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  overlayOpacity: 1,
});

searchLoaderEl.classList.add('is-hidden');

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    searchFormValue = searchFormEl.elements.user_query.value;
    currentPage = 1;

    searchLoaderEl.classList.remove('is-hidden');
    searcGalleryEl.innerHTML = '';

    const response = await fetchPhotos(searchFormValue, currentPage);

    if (response.data.total === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      searcGalleryEl.innerHTML = '';
      return;
    }

    const galleryCardTemplay = response.data.hits
      .map(imgDetails => createGalleryCard(imgDetails))
      .join('');

    searcGalleryEl.innerHTML = galleryCardTemplay;

    searchBtnLoadMore.classList.remove('is-hidden');

    gallery.refresh();

    if (Math.ceil(response.data.totalHits / 15) === currentPage) {
      searchBtnLoadMore.classList.add('is-hidden');
    }
  } catch (err) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  } finally {
    searchFormEl.reset();
    searchLoaderEl.classList.add('is-hidden');
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    currentPage++;

    const response = await fetchPhotos(searchFormValue, currentPage);

    const galleryCardTemplay = response.data.hits
      .map(imgDetails => createGalleryCard(imgDetails))
      .join('');

    searcGalleryEl.insertAdjacentHTML('beforeend', galleryCardTemplay);
    const smoothScroll = () => {
      const { height } =
        searcGalleryEl.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    };
    gallery.refresh();
    smoothScroll();

    if (Math.ceil(response.data.totalHits / 15) === currentPage) {
      searchBtnLoadMore.classList.add('is-hidden');
    }
  } catch (err) {
    iziToast.error({ message: err.message, position: 'topRight' });
  } finally {
    searchLoaderEl.classList.add('is-hidden');
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
searchBtnLoadMore.addEventListener('click', onLoadMoreBtnClick);
