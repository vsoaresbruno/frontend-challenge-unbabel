import { createStore } from "vuex";
import { getRandomID } from "../helpers/randomGenerateID";
const state = {
  data: [],
};

export const mutations = {
  GET_DATA(state, payload) {
    const newData = payload.filter(
      (p) => !state.data.some((s) => s.id === p.id)
    );
    state.data = [...newData, ...state.data];
  },

  ADD_TRANSCRIPTION: (state) => {
    console.log("state", state);
    state.data.push({
      id: getRandomID(),
      voice: "Edit here",
      text: "Edit here",
    });
  },
  DELETE_TRANSCRIPTION(state, id) {
    state.data = state.data.filter((item) => item.id !== id);
  },

  UPDATE_TRANSCRIPTION(state, { index, title, description }) {
    const crrTranscriptions = state.data[index];
    if (crrTranscriptions) {
      crrTranscriptions.title = title;
      crrTranscriptions.description = description;
    }
  },
};

export const actions = {
  async getTranscriptions({ commit }) {
    try {
      const response = await fetch(process.env.VUE_APP_API_URL);
      const data = await response.json();
      commit("GET_DATA", data);
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  },

  async postTranscriptions({ state }) {
    try {
      const response = await fetch(process.env.VUE_APP_API_URL, {
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
};

export const getters = {
  data: (state) => state.data,
};

export default createStore({
  state,
  mutations,
  actions,
  getters,
});
