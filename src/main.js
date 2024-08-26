import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const inputForm = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

const galleryList = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  overlayOpacity: 1,
});

loader.classList.add('is-hidden');

const onSearchImages = event => {
  event.preventDefault();

  const searchInputValue = inputForm.elements.user_query.value;

  if (searchInputValue.trim() === '') {
    return;
  }

  loader.classList.remove('is-hidden');

  fetchPhotos(searchInputValue)
    .then(data => {
      loader.classList.add('is-hidden');

      if (data.hits.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
                'Sorry, there are no images matching your search query.Please try again!',
        });

        gallery.innerHTML = '';
        return;
      }

      const galleryCardTemplate = data.hits
        .map(imgDetails => createGalleryCardTemplate(imgDetails))
        .join(' ');

      gallery.innerHTML = galleryCardTemplate;
        galleryList.refresh();
        loader.classList.add('is-hidden');
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      
      inputForm.reset();
      inputForm.elements.search.focus();
    });
};

inputForm.addEventListener('submit', onSearchImages);
