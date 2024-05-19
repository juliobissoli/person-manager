import axios from "axios";
import Auth from "../utils/auth"
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

  if (response.config.method === 'post' || response.config.method === 'put') {

    let errorMessage = 'Operação realizada com sucesso! 🎉'
    let mode = 'success'
    if (response.status === 200 || response.status === 201) {
      import('../store').then(storeModule => {
        const store = storeModule.default;
        store.dispatch('showPopUp', { message: errorMessage, mode });
      });
    }

  }

  return response;
}, function (request) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (request.response.status === 401) {
    console.error('401 token invalido')
    Auth.logout()
    Router.push({ name: 'Login' })

  }
  if (request.config.method === 'post' || request.config.method === 'put') {

    const mode = 'danger'
    const errorMessage = 'Ops algo deu errado 😔: \n' + request.response.data.message || 'Erro ao processar a requisição!';
    import('../store').then(storeModule => {
      const store = storeModule.default;
      store.dispatch('showPopUp', { message: errorMessage, mode });
    });
  }

  // if (request.config.method === 'post' || request.config.method === 'put') {
  //   if (request.response.status === 200) {
  //     const successMessage = 'Operação realizada com sucesso! 🎉';
  //     import('../store').then(storeModule => {
  //       const store = storeModule.default;
  //       store.dispatch('showPopUp', { message: successMessage, mode: 'success' });
  //     });
  //   }
  // }


  return Promise.reject(request);
});

export default api;
