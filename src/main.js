import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';


import { createGalleryCard } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-form-hw-12');
const searcGalleryEl = document.querySelector('.js-gallery-hw-12');
const searchLoaderEl = document.querySelector('.js-loader-hw-12');
const searchBtnLoadMore = document.querySelector('.js-button-load-more-hw-12');

let currenPage = 1;
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
    currenPage = 1; 

    searchLoaderEl.classList.remove('is-hidden');
    searcGalleryEl.innerHTML = ''; 

    const response = await fetchPhotos(searchFormValue, currenPage);

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

    if (Math.ceil(response.data.totalHits / 15) === currenPage) {
      searchBtnLoadMore.classList.add('is-hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
    }
  } catch (err) {
    iziToast.error({ message: err.message, position: 'topRight' });
  } finally {
    searchFormEl.reset();
    searchLoaderEl.classList.add('is-hidden');
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    currenPage++;

    const response = await fetchPhotos(searchFormValue, currenPage);

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

    if (Math.ceil(response.data.totalHits / 15) === currenPage) {
      searchBtnLoadMore.classList.add('is-hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
      smoothScroll();
    }
  } catch (err) {
    iziToast.error({ message: err.message, position: 'topRight' });
  } finally {
    searchLoaderEl.classList.add('is-hidden');
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
searchBtnLoadMore.addEventListener('click', onLoadMoreBtnClick);
