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

  patchService(service, id) {
    const formData = new FormData();
    formData.append("image", service.image);
    formData.append("heading", service.heading);
    formData.append("description", service.description);

    return fetch(`${this._baseUrl}/services/${id}`, {
      method: "PATCH",
      // credentials: "include",
      body: formData,
    }).then(this._checkError);
  }

  getTexts() {
    return fetch(`${this._baseUrl}/texts`, {
      headers: this._headers,
      // credentials: "include",
    }).then(this._checkError);
  }

  patchText(text, id) {
    return fetch(`${this._baseUrl}/texts/${id}`, {
      method: "PATCH",
      headers: this._headers,
      // credentials: "include",
      body: JSON.stringify(text),
    }).then(this._checkError);
  }

  getAdvices() {
    return fetch(`${this._baseUrl}/advices`, {
      headers: this._headers,
      // credentials: "include",
    }).then(this._checkError);
  }

  getImages() {
    return fetch(`${this._baseUrl}/images`, {
      headers: this._headers,
      // credentials: "include",
    }).then(this._checkError);
  }

  patchImage(image, id) {
    const formData = new FormData();
    formData.append("image", image.image);
    formData.append("name", image.name);

    return fetch(`${this._baseUrl}/images/${id}`, {
      method: "PATCH",
      // credentials: "include",
      body: formData,
    }).then(this._checkError);
  }
}

export const api = new Api(apiOptions);
