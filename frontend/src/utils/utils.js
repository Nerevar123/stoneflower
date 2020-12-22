const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export const apiOptions = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};
