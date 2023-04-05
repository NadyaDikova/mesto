export default class UserInfo {
  constructor({nameSelector, aboutSelfSelector}) {
    this._name = document.querySelector(nameSelector);
    this._aboutSelf = document.querySelector(aboutSelfSelector);
  }
// возвращает объект с данными пользователя
  getUserInfo() {
    this.userInfo = {};
    this.userInfo.name = this._name.textContent;
    this.userInfo.aboutSelf = this._aboutSelf.textContent;
    return this.userInfo;
  }
// принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, aboutSelf}) {
    this._name.textContent = name;
    this._aboutSelf.textContent = aboutSelf;

  }
}


