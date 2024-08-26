import{S as d,i as u}from"./assets/vendor-f33cd494.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const p=t=>`<li class="gallery-card">
     <a class="gallery-link" href="${t.largeImageURL}">
       <img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}" 
         width="360" height="200" />
       <div class="image-info">
         <p>Likes <span> ${t.likes}</span></p>
         <p>Views  <span>${t.views}</span></p>
         <p>Comments  <span>${t.comments}</span></p>
         <p>Downloads  <span>${t.downloads}</span></p>
       </div>
     </a>
   </li>`,h="https://pixabay.com/api/",m=t=>{const a=new URLSearchParams({key:"45638665-39d93a42fef97026e251908a6",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:9});return fetch(`${h}?${a}`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})},i=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),n=document.querySelector(".loader"),f=new d(".gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1});n.classList.add("is-hidden");const y=t=>{t.preventDefault();const a=i.elements.user_query.value;a.trim()!==""&&(n.classList.remove("is-hidden"),m(a).then(s=>{if(n.classList.add("is-hidden"),s.hits.length===0){u.error({position:"topRight",message:"Sorry, there are no images matching your search query.Please try again!"}),c.innerHTML="";return}const o=s.hits.map(e=>p(e)).join(" ");c.innerHTML=o,f.refresh(),n.classList.add("is-hidden")}).catch(s=>{console.log(s)}).finally(()=>{i.reset(),i.elements.search.focus()}))};i.addEventListener("submit",y);
//# sourceMappingURL=commonHelpers.js.map
