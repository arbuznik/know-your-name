export class Detail {
  constructor(detailContent, detailDescription) {
    this._detailsContainer = document.querySelector('.details');
    this._detailElement = this._getNameInfoTemplate();

    this._detailContentElement = this._detailElement.querySelector('.detail__content');
    this._detailDescriptionElement = this._detailElement.querySelector('.detail__description');

    this._detailContentElement.textContent = detailContent;
    this._detailDescriptionElement.textContent = detailDescription;
  }

  _getNameInfoTemplate() {
  return document
    .querySelector('#detail-template')
    .content
    .querySelector('.detail')
    .cloneNode(true);
}

  renderNameInfoAtPosition(position) {
    this._detailElement.style.setProperty('--pos', position);
    this._detailsContainer.append(this._detailElement)
  }
}