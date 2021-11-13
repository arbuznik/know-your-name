import { Detail } from './Detail.js'
import { CountryDisctionary } from './CountryDictionary.js';

// https://api.genderize.io?name=peter
let genderData = {
  name: 'peter',
  gender: 'male',
  probability: 0.99,
  count: 165452
};

// https://nationalize.io/
let nationData = {
  "name": "peter",
  "country": [
    { "country_id": "SK", "probability": 0.1245678651196634 },
    { "country_id": "AU", "probability": 0.04147520566025031 },
    { "country_id": "KE", "probability": 0.04107488447822492 }
  ]
};

// https://api.agify.io?name=peter
let ageData = {
  "name": "peter",
  "age": 58,
  "count": 151057
};

const countryDictionary = new CountryDisctionary();

const detailsContainer = document.querySelector('.details');
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', getData);
const searchInput = document.querySelector('.search-form__input');

function getData() {
  const name = searchInput.value;
  
  detailsContainer.textContent = '';

  getGenderDataFor(name);
  getAgeDataFor(name);
  getNationalityDataFor(name);
}


async function getGenderDataFor(name) {
  try {
    let response = await fetch(`https://api.genderize.io?name=${name}`);
    let data = await response.json();

    handleGenderData(data);
  } catch(err) {
    const detail = new Detail(err.message);
    detail.renderNameInfoAtPosition(1);
  }
}

async function getAgeDataFor(name) {
  try {
    let response = await fetch(`https://api.agify.io?name=${name}`);
    let data = await response.json();
    handleAgeData(data);
  } catch(err) {
    const detail = new Detail(err.message);
    detail.renderNameInfoAtPosition(2);
  }
}

async function getNationalityDataFor(name) {
  try {
    let response = await fetch(`https://api.nationalize.io?name=${name}`);
    let data = await response.json();
    handleNationalityData(data);
  } catch(err) {
    const detail = new Detail(err.message);
    detail.renderNameInfoAtPosition(2);
  }
}

function handleGenderData(data) {
  if (data.gender) {
    const detailContent = `Gender: ${data.gender}`;
    const detailDescription = `Probability ${data.probability * 100}% based on ${data.count} names.`;

    const detail = new Detail(detailContent, detailDescription);

    detail.renderNameInfoAtPosition(1);
  }
}

function handleAgeData(data) {
  if (data.age) {
    const detailContent = `Age: ${data.age}`;
    const detailDescription = `Based on ${data.count} names.`;
    const detail = new Detail(detailContent, detailDescription);
    detail.renderNameInfoAtPosition(2);
  }
}

function handleNationalityData(data) {
  data['country'].forEach(country => {
    const countryId = country['country_id'];
    const countryName = countryDictionary.getCountryNameById(countryId);

    const detailContent = countryName ? `Nationality: ${countryName}` : `Nationality: ${countryId}`;
    const detailDescription = `Probability ${(country['probability'] * 100).toFixed(2)}%`;

    const detail = new Detail(detailContent, detailDescription);

    detail.renderNameInfoAtPosition(3);
  })
}




// handleNationalityData(nationData)
// handleAgeData(ageData);
// handleGenderData(genderData);

// fetch('https://api.genderize.io?name=olga')
//   .then(response => response.json())
//   .then(result => console.log(result))

// async function getData() {
//   let data = await fetch('https://api.genderize.io?name=peter');

//   let nameData = await data.json();

//   console.log(nameData);
// }

// getData(); 


// let name;

// три парреллельных асинхронных запроса

// выводить полную информацию

// по полу и возрасту с возможностью уточнения запроса до страны (смапить справочник стран с кодами и засунуть в селект)

