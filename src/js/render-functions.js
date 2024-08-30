export const createGalleryCard = imgInfo => {
  return `<li class="gallery-card-hw-12">
     <a class="gallery-link-hw-12" href="${imgInfo.largeImageURL}">
       <img class="gallery-img-hw-12" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" width='360' height='200'; />
       <div class="image-info-hw-12">
         <p>Likes <span>${imgInfo.likes}</span></p>
         <p>Views  <span>${imgInfo.views}</span></p>
         <p>Comments  <span>${imgInfo.comments}</span></p>
         <p>Downloads  <span>${imgInfo.downloads}</span></p>
       </div>
     </a>
   </li>`;
};
