import axios from 'axios';

export const BASE_API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://tunify-307120.uc.r.appspot.com/api/'
    : 'http://localhost:3002/api/';

export default axios.create({
  baseURL: BASE_API_URL,
});
