// https://nationalize.io/
// {"name":"peter","country":[{"country_id":"SK","probability":0.1245678651196634},{"country_id":"AU","probability":0.04147520566025031},{"country_id":"KE","probability":0.04107488447822492}]}

// https://api.genderize.io?name=peter
// {name: 'peter', gender: 'male', probability: 0.99, count: 165452}
// {"name":"peter","gender":"male","probability":0.99,"count":15118,"country_id":"SK"}

// https://api.agify.io?name=peter
// {"name":"peter","age":58,"count":151057}
// {"name":"peter","age":23,"count":48,"country_id":"SK"}

// localization: https://api.genderize.io?name=peter&country_id=US

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

