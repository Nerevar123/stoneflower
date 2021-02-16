import { baseUrl, checkError, checkEmailResponse, headers } from "./utils";

export const getTexts = () => {
  return fetch(`${baseUrl}texts`, {
    headers: headers,
    // credentials: "include",
  }).then(checkError);
};

export const getImages = () => {
  return fetch(`${baseUrl}images`, {
    headers: headers,
    // credentials: "include",
  }).then(checkError);
};

export const getServices = () => {
  return fetch(`${baseUrl}services`, {
    headers: headers,
    // credentials: "include",
  }).then(checkError);
};

export const getAdvices = () => {
  return fetch(`${baseUrl}advices`, {
    headers: headers,
    // credentials: "include",
  }).then(checkError);
};

export const getSuppliers = () => {
  return fetch(`${baseUrl}suppliers`, {
    headers: headers,
    // credentials: "include",
  }).then(checkError);
};

export const patchText = (text, id) => {
  return fetch(`${baseUrl}texts/${id}`, {
    method: "PATCH",
    headers: headers,
    // credentials: "include",
    body: JSON.stringify(text),
  }).then(checkError);
};

export const patchImage = (image, id) => {
  const formData = new FormData();
  formData.append("image", image.image);
  formData.append("name", image.name);

  return fetch(`${baseUrl}images/${id}`, {
    method: "PATCH",
    // credentials: "include",
    body: formData,
  }).then(checkError);
};

export const patchService = (service, id) => {
  const formData = new FormData();
  formData.append("image", service.image);
  formData.append("heading", service.heading);
  formData.append("description", service.description);

  return fetch(`${baseUrl}services/${id}`, {
    method: "PATCH",
    // credentials: "include",
    body: formData,
  }).then(checkError);
};

export const saveAdvice = (advice) => {
  const formData = new FormData();
  formData.append("image", advice.image);
  formData.append("heading", advice.heading);
  formData.append("shortText", advice.shortText);
  formData.append("expandedText", advice.expandedText);

  return fetch(`${baseUrl}advices`, {
    method: "POST",
    // credentials: "include",
    body: formData,
  }).then(checkError);
};

export const patchAdvice = (advice, id) => {
  const formData = new FormData();
  formData.append("image", advice.image);
  formData.append("heading", advice.heading);
  formData.append("shortText", advice.shortText);
  formData.append("expandedText", advice.expandedText);

  return fetch(`${baseUrl}advices/${id}`, {
    method: "PATCH",
    // credentials: "include",
    body: formData,
  }).then(checkError);
};

export const deleteAdvice = (id) => {
  return fetch(`${baseUrl}advices/${id}`, {
    method: "DELETE",
    // credentials: "include",
  }).then(checkError);
};

export const saveSupplier = (supplier) => {
  const formData = new FormData();
  formData.append("image", supplier.image);
  formData.append("link", supplier.link);
  formData.append("isMaterial", supplier.isMaterial);

  return fetch(`${baseUrl}suppliers`, {
    method: "POST",
    // credentials: "include",
    body: formData,
  }).then(checkError);
};

export const patchSupplier = (supplier, id) => {
  const formData = new FormData();
  formData.append("image", supplier.image);
  formData.append("link", supplier.link);
  formData.append("isMaterial", supplier.isMaterial);

  return fetch(`${baseUrl}suppliers/${id}`, {
    method: "PATCH",
    // credentials: "include",
    body: formData,
  }).then(checkError);
};

export const deleteSupplier = (id) => {
  return fetch(`${baseUrl}suppliers/${id}`, {
    method: "DELETE",
    // credentials: "include",
  }).then(checkError);
};

export const sendEmail = (data) => {
  return fetch(`${baseUrl}email`, {
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
  }).then(checkEmailResponse);
};
