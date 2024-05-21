import axios from "axios";
import Auth from "../utils/auth"
import Router from '../router/index'

let token = localStorage.getItem("token");
const headers = { Authorization: "Bearer " + token };

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  headers,
});

api.interceptors.response.use(function (response) {

  const routerByPass = ['/pessoa/pesquisar', '/contato/pesquisar', '/favorito/pesquisar', '/usuario/pesquisar']
  
  if (routerByPass.includes(response.config.url)) {
    return response;
  }

  if (response.config.method === 'post' || response.config.method === 'put') {

    let errorMessage = 'Operação realizada com sucesso! 🎉'
    let mode = 'success'
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      import('../store').then(storeModule => {
        const store = storeModule.default;
        store.dispatch('showPopUp', { message: errorMessage, mode });
      });
    }

  }

  return response;
}, function (request) {
 
  if (request.response.status === 401) {
    console.error('401 token invalido')
    Auth.logout()
    Router.push({ name: 'Login' })

  }
  if (request.config.method !== 'get') {

    const mode = 'danger'
    const errorMessage = 'Ops algo deu errado 😔: \n' + request.response.data.message || 'Erro ao processar a requisição!';
    import('../store').then(storeModule => {
      const store = storeModule.default;
      store.dispatch('showPopUp', { message: errorMessage, mode });
    });
  }



  return Promise.reject(request);
});

export default api;
