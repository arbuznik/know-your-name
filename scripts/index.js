import { Detail } from './Detail.js'

const detailsContainer = document.querySelector('.details');
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', getData);
const searchInput = document.querySelector('.search-form__input');

const apiUrls = [
  'https://api.genderize.io?name=',
  'https://api.agify.io?name=',
  'https://api.nationalize.io?name=',
]

searchInput.focus();

function getData() {
  const name = searchInput.value;
  detailsContainer.textContent = '';

  let requests = apiUrls.map(url => fetch(url + name));

  Promise.all(requests)
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(nameData => handleData(nameData))
    .catch(error => handleError(error));
}

function handleData(nameData) {
  nameData.forEach((data) => new Detail(data))
}

function handleError(error) {
  let errorElement = document.createElement('p');
  errorElement.textContent = `Error: ${error.message}`;
  detailsContainer.append(errorElement);
}
