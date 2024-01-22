import { createStore } from "vuex";
const URL_API = "https://run.mocky.io/v3/4e50eddd-451b-46b6-9543-873b80188cf8";
export default createStore({
  state: {
    data: [],
  },
  mutations: {
    GET_DATA(state, payload) {
      state.data = payload;
    },
    ADD_TRANSCRIPTION(state) {
      state.data.push({
        id: String(Math.random()),
        voice: "Edit here",
        text: "Edit here",
      });
    },
    DELETE_TRANSCRIPTION(state, id) {
      state.data = state.data.filter((item) => item.id !== id);
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await fetch(URL_API);
        const data = await response.json();
        commit("GET_DATA", data);
      } catch (err) {
        console.error(err);
        throw new Error();
      }
    },

    async postData({ state }) {
      try {
        const response = await fetch(URL_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state.data),
        });

        if (!response.ok) {
          throw new Error("Error posting data");
        }

        // Handle the response as needed
        const responseData = await response.json();
        console.log("Data posted successfully:", responseData);
      } catch (err) {
        console.error("Error posting data:", err);
        throw err;
      }
    },
  },
  getters: {
    data: (state) => state.data,
  },
  modules: {},
});
