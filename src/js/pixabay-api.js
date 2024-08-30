import axios from 'axios';

axios.defaults.baseURL=`https://pixabay.com/api/`;

export const fetchPhotos = (searchQ, page)=> {
  const axiosOptions = {
    params: {
      key: '45638665-39d93a42fef97026e251908a6',
      q: searchQ,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page:page,
    },
  };
  return axios.get(``, axiosOptions);
  
};
