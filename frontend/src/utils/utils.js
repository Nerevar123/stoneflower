const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.stone.ner.works/';
// const baseUrl = "https://api.stone.ner.works";

export const apiOptions = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};
