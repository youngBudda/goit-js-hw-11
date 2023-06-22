import card from './partials/card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios, { Axios } from 'axios';

const searchBtn = document.querySelector('.search-form .form__btn');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');

const API_KEY = '37633155-9cc69d2c24fc24ba983caa040';
const BASE_URL = 'https://pixabay.com/api/';
let photoPerPage = 40;
let page = 1;

moreBtn.style.display = 'none';

const onSubmit = async e => {
  e.preventDefault();
  page = 1;
  const searchInput = document.querySelector('input[name="searchQuery"]').value;
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${photoPerPage}&page=${page}`
    );

    gallery.innerHTML = '';
    const markup = card(response.data);
    gallery.insertAdjacentHTML('afterbegin', markup);
    Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    moreBtn.style.display = 'block';

    if (response.data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    const pageQuantity = Math.ceil(response.data.totalHits / photoPerPage);
    if (page === pageQuantity) {
      moreBtn.style.display = 'none';
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
};

searchBtn.addEventListener('click', onSubmit);

const onMoreBtn = async () => {
  page += 1;
  const searchInput = document.querySelector('input[name="searchQuery"]').value;
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${photoPerPage}&page=${page}`
    );

    const markup = card(response.data);
    gallery.insertAdjacentHTML('beforeend', markup);

    if (response.data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    const pageQuantity = Math.ceil(response.data.totalHits / photoPerPage);
    if (page === pageQuantity) {
      moreBtn.style.display = 'none';
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
};

moreBtn.addEventListener('click', onMoreBtn);

//как импортнуть фетч
