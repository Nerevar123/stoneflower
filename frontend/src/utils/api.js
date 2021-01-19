import { apiOptions } from "./utils";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    await res
      .text()
      .then((text) => JSON.parse(text))
      .then((text) => {
        return Promise.reject(text.message || text.error);
      });
  }

  getServices() {
    return fetch(`${this._baseUrl}/services`, {
      headers: this._headers,
      // credentials: "include",
    }).then(this._checkError);
  }

  getTexts() {
    return fetch(`${this._baseUrl}/texts`, {
      headers: this._headers,
      // credentials: "include",
    }).then(this._checkError);
  }

  getAdvices() {
    return fetch(`${this._baseUrl}/advices`, {
      headers: this._headers,
      // credentials: "include",
    }).then(this._checkError);
  }
}

export const api = new Api(apiOptions);
