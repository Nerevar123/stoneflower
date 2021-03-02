// const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.stone.ner.works';
// export const baseUrl = "https://api.stone.ner.works/";

export const baseUrl = process.env.REACT_APP_URL;
export const headers = {
  "Content-Type": "application/json",
};

export const checkError = async (res) => {
  if (res.ok) {
    return res.json();
  }
  await res
    .text()
    .then((text) => {
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    })
    .then((text) => {
      return Promise.reject(text.message || text.error || text);
    });
};

export const checkEmailResponse = (res) => {
  if (res.statusText === "Created") {
    return res;
  }
  return Promise.reject(res);
};
