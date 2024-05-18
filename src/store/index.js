// store/index.js
import { createStore } from 'vuex';
import modules from './modules'

const store = createStore({
  state: {
    isAuthenticated: false,
    token: null
  },
  mutations: {
    setAuthentication(state, { isAuthenticated, token }) {
      state.isAuthenticated = isAuthenticated;
      state.token = token;
    }
  },
  actions: {
    async login({ commit }, { username, password, rememberMe }) {
      // Simulação de login com uma chamada à API fictícia
      const token = await apiLogin(username, password);

      commit('setAuthentication', { isAuthenticated: true, token });

      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
    },
    logout({ commit }) {
      commit('setAuthentication', { isAuthenticated: false, token: null });
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },
    checkAuthentication({ commit }) {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        commit('setAuthentication', { isAuthenticated: true, token });
      } else {
        commit('setAuthentication', { isAuthenticated: false, token: null });
      }
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated
  },

  modules
});

async function apiLogin(username, password) {
  return 'fake-jwt-token';
}

export default store;
