//управляет разметкой других классов, вставляя её в DOM
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // массив данных
    this._renderer = renderer; // функция
    this._containerSelector = document.querySelector(containerSelector); // селектор контейнера в который нужно добавить созданные элементы
  }

  //отрисовка всех элементов
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  //принимает DOM элемент и добавляет в контейнер
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
