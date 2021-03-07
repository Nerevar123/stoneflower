import { baseUrl, checkError, checkEmailResponse, headers } from "./utils";

export const getTexts = () => {
  return fetch(`${baseUrl}texts`, {
    headers: headers,
  }).then(checkError);
};

export const getImages = () => {
  return fetch(`${baseUrl}images`, {
    headers: headers,
  }).then(checkError);
};

export const getServices = () => {
  return fetch(`${baseUrl}services`, {
    headers: headers,
  }).then(checkError);
};

export const getAdvices = () => {
  return fetch(`${baseUrl}advices`, {
    headers: headers,
  }).then(checkError);
};

export const getSuppliers = () => {
  return fetch(`${baseUrl}suppliers`, {
    headers: headers,
  }).then(checkError);
};

export const getSurfaces = () => {
  return fetch(`${baseUrl}surfaces`, {
    headers: headers,
  }).then(checkError);
};

export const getPortfolio = () => {
  return fetch(`${baseUrl}works`, {
    headers: headers,
  }).then(checkError);
};

export const patchText = (text, id) => {
  return fetch(`${baseUrl}texts/${id}`, {
    method: "PATCH",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(text),
  }).then(checkError);
};

export const patchImage = (image, id) => {
  const formData = new FormData();
  formData.append("image", image.image);
  formData.append("name", image.name);

  return fetch(`${baseUrl}images/${id}`, {
    method: "PATCH",
    credentials: "include",
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
    credentials: "include",
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
    credentials: "include",
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
    credentials: "include",
    body: formData,
  }).then(checkError);
};

export const deleteAdvice = (id) => {
  return fetch(`${baseUrl}advices/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then(checkError);
};

export const saveSupplier = (supplier) => {
  const formData = new FormData();
  formData.append("image", supplier.image);
  formData.append("link", supplier.link);
  formData.append("isMaterial", supplier.isMaterial);

  return fetch(`${baseUrl}suppliers`, {
    method: "POST",
    credentials: "include",
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
    credentials: "include",
    body: formData,
  }).then(checkError);
};

export const deleteSupplier = (id) => {
  return fetch(`${baseUrl}suppliers/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then(checkError);
};

export const putSurfaceExample = (supplier, id) => {
  const formData = new FormData();
  formData.append("image", supplier.image);
  formData.append("description", supplier.description);
  formData.append("manufacturer", supplier.manufacturer);
  formData.append("origin", supplier.origin);
  formData.append("style", supplier.style);
  formData.append("surface", supplier.surface);

  return fetch(`${baseUrl}surfaces/${id}/examples`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  }).then(checkError);
};

export const patchSurfaceExample = (supplier, id) => {
  const formData = new FormData();
  formData.append("image", supplier.image);
  formData.append("description", supplier.description);
  formData.append("manufacturer", supplier.manufacturer);
  formData.append("origin", supplier.origin);
  formData.append("style", supplier.style);
  formData.append("surface", supplier.surface);
  formData.append("id", supplier.id);

  return fetch(`${baseUrl}surfaces/${id}/examples`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  }).then(checkError);
};

export const deleteSurfaceExamples = (example, id) => {
  return fetch(`${baseUrl}surfaces/${id}/examples`, {
    method: "DELETE",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(example),
  }).then(checkError);
};

export const putWorkPhoto = (work, id) => {
  const formData = new FormData();
  formData.append("image", work.image);
  formData.append("description", work.description);

  return fetch(`${baseUrl}works/${id}/photos`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  }).then(checkError);
};

export const patchWorkPhoto = (work, id) => {
  const formData = new FormData();
  formData.append("image", work.image);
  formData.append("description", work.description);
  formData.append("id", work.id);

  return fetch(`${baseUrl}works/${id}/photos`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  }).then(checkError);
};

export const deleteWorkPhoto = (photo, id) => {
  return fetch(`${baseUrl}works/${id}/photos`, {
    method: "DELETE",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(photo),
  }).then(checkError);
};

export const saveWork = (work) => {
  return fetch(`${baseUrl}works`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(work),
  }).then(checkError);
};

export const patchWork = (work, id) => {
  return fetch(`${baseUrl}works/${id}`, {
    method: "PATCH",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(work),
  }).then(checkError);
};

export const deleteWork = (id) => {
  return fetch(`${baseUrl}works/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then(checkError);
};

export const sendEmail = (data) => {
  return fetch(`${baseUrl}email`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(checkEmailResponse);
};

export const getEmails = () => {
  return fetch(`${baseUrl}email`, {
    headers: headers,
    credentials: "include",
  }).then(checkError);
};

export const deleteEmail = (id) => {
  return fetch(`${baseUrl}email/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then(checkError);
};

export const login = (user) => {
  return fetch(`${baseUrl}signin`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(user),
  }).then(checkError);
};

export const logout = () => {
  return fetch(`${baseUrl}logout`, {
    headers: headers,
    credentials: "include",
  }).then(checkError);
};
