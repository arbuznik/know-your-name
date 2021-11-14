import { CountryDictionary} from './CountryDictionary.js';

export class Detail {
  constructor(detailData) {
    this._countryDictionary = new CountryDictionary();
    this._data = detailData;

    this._detailsContainer = document.querySelector('.details');
    this._detailElement = this._getNameInfoTemplate();
    this._detailContentElement = this._detailElement.querySelector('.detail__content');
    this._detailDescriptionElement = this._detailElement.querySelector('.detail__description');
    
    if (this._data.gender && this._data.gender !== null) {
      this._handleGenderData();
    } else if (this._data.age && this._data.age !== null) {
      this._handleAgeData();
    } else if (this._data['country'] && this._data['country'].length !== 0) {
      this._handleNationalityData();
    } else {
      this._handleNoDataError();
    }
  }

  _handleGenderData() {
    this._detailContent = `Gender: ${this._data.gender}`;
    this._detailDescription = `Probability ${this._data.probability * 100}%, based on ${this._data.count} names.`;

    this._detailContentElement.textContent = this._detailContent;
    this._detailDescriptionElement.textContent = this._detailDescription;

    this._detailElement.style.setProperty('--pos', '1');

    this._renderNameInfo();
  }

  _handleAgeData() {
    this._detailContent = `Age: ${this._data.age}`;
    this._detailDescription = `Based on ${this._data.count} names.`;
    
    this._detailContentElement.textContent = this._detailContent;
    this._detailDescriptionElement.textContent = this._detailDescription;

    this._detailElement.style.setProperty('--pos', '2');

    this._renderNameInfo();
  }

  _handleNationalityData() {
    this._detailContentElement.textContent = 'Nationality:';
    this._detailDescriptionElement.textContent = '';

    this._data['country'].forEach(country => {
      this._countryId = country['country_id'];
      this._countryName = this._countryDictionary.getCountryNameById(this._countryId);
      
      this._detailContent = this._countryName ? this._countryName : this.country_id;
      this._detailDescription = `Probability ${(country['probability'] * 100).toFixed(2)}%`;

      this._createNewRowElement(this._countryName, 'detail__content');
      this._createNewRowElement(this._detailDescription, 'detail__description');

      this._detailElement.style.setProperty('--pos', '3');
    })

    this._renderNameInfo();
  }

  _handleNoDataError() {
    if (this._data.name.match(/[а-я]/gi)) {
      this._error = new Error(`Нет данных для имени ${this._data.name}. Попробуйте английскую раскладку.`);
    } else {
      this._error = new Error(`No data for ${this._data.name}.`);
    }

    this._renderError();
  }

  _getNameInfoTemplate() {
    return document
      .querySelector('#detail-template')
      .content
      .querySelector('.detail')
      .cloneNode(true);
  }

  _createNewRowElement(text, selector) {
    this._newRowElement = document.createElement('p');
    this._newRowElement.classList.add(selector);
    this._newRowElement.textContent = text;
    this._detailElement.append(this._newRowElement);
  }

  _renderNameInfo() {
    this._detailsContainer.append(this._detailElement);
  }

  _renderError() {
    this._detailContentElement.textContent = `Error: ${this._error.message}`;
    this._detailsContainer.append(this._detailElement);
  }
}