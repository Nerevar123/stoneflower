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

  _checkEmailResponse(res) {
    if (res.statusText === "Created") {
      return res;
    }
    return Promise.reject(res);
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

  saveAdvice(advice) {
    const formData = new FormData();
    formData.append("image", advice.image);
    formData.append("heading", advice.heading);
    formData.append("shortText", advice.shortText);
    formData.append("expandedText", advice.expandedText);

    return fetch(`${this._baseUrl}/advices`, {
      method: "POST",
      // credentials: "include",
      body: formData,
    }).then(this._checkError);
  }

  patchAdvice(advice, id) {
    const formData = new FormData();
    formData.append("image", advice.image);
    formData.append("heading", advice.heading);
    formData.append("shortText", advice.shortText);
    formData.append("expandedText", advice.expandedText);

    return fetch(`${this._baseUrl}/advices/${id}`, {
      method: "PATCH",
      // credentials: "include",
      body: formData,
    }).then(this._checkError);
  }

  deleteAdvice(id) {
    return fetch(`${this._baseUrl}/advices/${id}`, {
      method: "DELETE",
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
  sendEmail(data) {
    return fetch(`${this._baseURL}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        tel: data.tel,
        description: data.description,
      }),
    }).then(this._checkEmailResponse);
  }
}

export const api = new Api(apiOptions);
