import axios from 'axios';

export const BASE_API_URL = 'http://localhost:3002/api/';

export default axios.create({
  baseURL: BASE_API_URL,
});