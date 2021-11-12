import { Detail } from './Detail.js'

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

function handleGenderData(data) {
  const detailContent = `Gender: ${data.gender}`;
  const detailDescription = `Probability ${data.probability * 100}% based on ${data.count} names.`;

  const detail = new Detail(detailContent, detailDescription);
  
  detail.renderNameInfo();
}

function handleAgeData(data) {
  const detailContent = `Age: ${data.age}`;
  const detailDescription = `Based on ${data.count} names.`;

  const detail = new Detail(detailContent, detailDescription);

  detail.renderNameInfo();
}

function handleNationalityData(data) {
  data['country'].forEach(country => {
    const detailContent = `Country: ${country['country_id']}`;
    const detailDescription = `Probability ${(country['probability'] * 100).toFixed(2)}%`;

    const detail = new Detail(detailContent, detailDescription);

    detail.renderNameInfo();
  })
}

handleGenderData(genderData);
handleAgeData(ageData)
handleNationalityData(nationData)






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

