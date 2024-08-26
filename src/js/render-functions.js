export const createGalleryCardTemplate = imgInfo => {
  return `<li class="gallery-card">
     <a class="gallery-link" href="${imgInfo.largeImageURL}">
       <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" 
         width="360" height="200" />
       <div class="image-info">
         <p>Likes <span> ${imgInfo.likes}</span></p>
         <p>Views  <span>${imgInfo.views}</span></p>
         <p>Comments  <span>${imgInfo.comments}</span></p>
         <p>Downloads  <span>${imgInfo.downloads}</span></p>
       </div>
     </a>
   </li>`;
};
