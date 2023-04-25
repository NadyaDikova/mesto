//управляет разметкой других классов, вставляя её в DOM
export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer; // функция
    this._container = document.querySelector(container); // селектор контейнера в который нужно добавить созданные элементы
  }

  //отрисовка всех элементов
  renderItems(cards) {
    cards.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  //принимает DOM элемент и добавляет в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
