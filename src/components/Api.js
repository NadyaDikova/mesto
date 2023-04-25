export default class Api {
  constructor (url, token) {
    this._url = url;
    this._token = token;
  }
  _getHeaders () {
    return {
      authorization: this._token,
      'Content-Type': 'application/json'
    };
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status} ${res.statusText}`);
  }

  getInitialCards () {
    return fetch (`${this._url}/cards`, {
      headers: this._getHeaders()
    })
    .then(this._handleResponse);
}

  getUser () {
    return fetch (`${this._url}/users/me`, {
      headers: this._getHeaders()
    })
    .then(this._handleResponse);
  }

  createNewProfile (item) {
    return fetch (`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
    .then(this._handleResponse);
  }

  createNewAvatar(data) {
    return fetch (`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._handleResponse);
  }

  createNewCard (item) {
    return fetch (`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(item)
    })
    .then(this._handleResponse);
  }

  addLike (id) {
    return fetch (`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
    .then(this._handleResponse);
  }

  deleteLike (id) {
    return fetch (`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch (`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._handleResponse);
  }


}
