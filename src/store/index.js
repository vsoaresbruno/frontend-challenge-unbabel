import { createStore } from "vuex";

export default createStore({
  state: {
    data: null,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/4e50eddd-451b-46b6-9543-873b80188cf8"
        );
        const data = await response.json();
        commit("setData", data);
      } catch {
        throw new Error();
      }
    },
  },
  getters: {
    data: (state) => state.data,
  },
  modules: {},
});
