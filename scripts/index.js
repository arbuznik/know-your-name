import { Detail } from './Detail.js'

const detailsContainer = document.querySelector('.details');
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', handleFormSubmit);
const searchInput = document.querySelector('.search-form__input');
const loader = document.querySelector('.loader');
let dataIsLoading = false; 

const apiUrls = [
  'https://api.genderize.io?name=',
  'https://api.agify.io?name=',
  'https://api.nationalize.io?name=',
]

function onPageLoad() {
  setTimeout(searchInput.focus(), 300);
}

function handleFormSubmit(evt) {
  if (!dataIsLoading) {
    toggleDataLoadingState();
    getData(evt);
  }
}

function getData(evt) {
  evt.preventDefault();

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
  toggleDataLoadingState();
}

function handleError(error) {
  let errorElement = document.createElement('p');
  errorElement.textContent = `Error: ${error.message}`;
  detailsContainer.append(errorElement);
  toggleDataLoadingState();
}

function toggleDataLoadingState() {
  dataIsLoading = !dataIsLoading;
  dataIsLoading ? loader.classList.add('loader_shown') : loader.classList.remove('loader_shown');
}

onPageLoad();