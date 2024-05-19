// store/index.js
import { createStore } from 'vuex';
import modules from './modules'

const store = createStore({
  state: {
    messagePopUp: "",
    popupIsDanger: false,
    timeShowPopUp: 5000,
  },
  getters: {
    getPopupMessage(state) {
      return state.messagePopUp;
    },
    getPopupIsDanger(state) {
      return state.popupIsDanger;
    },
  },
  mutations: {
    setPopupMessage(state, data) {
      console.log("mutation", data.message);
      state.messagePopUp = data.message;
      state.popupIsDanger = data.mode === "danger";
    },
  },
  actions: {
    showPopUp({ commit }, data) {
      commit("setPopupMessage", data);
      setTimeout(
        () => commit("setPopupMessage", { message: "", mode: "success" }),
        4000
      );
    },
  },

  modules
});

async function apiLogin(username, password) {
  return 'fake-jwt-token';
}

export default store;
