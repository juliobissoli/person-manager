import axios from "axios";
// import auth from "../utils/auth"
import Router from '../router/index'

let token = localStorage.getItem("token");
const headers = { Authorization: "Bearer " + token };

// if (process.env.NODE_ENV === "development") {
  // axios.defaults.baseURL = 'http://localhost/api';
// } else if (process.env.NODE_ENV === "production") {
// }

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  headers,
});

api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    console.error('401 token invalido')
    // auth.logout()
    Router.push({name: 'Login'})

  }
  return Promise.reject(error);
});

export default api;
