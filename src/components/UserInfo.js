export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  // возвращает объект с данными пользователя
  getUserInfo() {
    this.userInfo = {};
    this.userInfo.name = this._name.textContent;
    this.userInfo.about = this._about.textContent;
    this.userInfo.avatar = this._avatar.src;
    return this.userInfo;
  }
  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(item) {
    this._name.textContent = item.name;
    this._about.textContent = item.about;
    this._avatar.src = item.avatar;
  }

}
