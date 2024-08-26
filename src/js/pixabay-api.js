const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = searchedQ => {
  const urlParams = new URLSearchParams({
    key: '45638665-39d93a42fef97026e251908a6',
    q: searchedQ,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 9,
  });

  return fetch(`${BASE_URL}?${urlParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
};
