import { shallowMount } from "@vue/test-utils";
import TranscriptionsList from "@/components/TranscriptionsList.vue";
import { createStore } from "vuex";

let store;
let state;
const mutations = {
  ADD_TRANSCRIPTION: jest.fn(),
  DELETE_TRANSCRIPTION: jest.fn(),
  UPDATE_TRANSCRIPTION: jest.fn(),
};

describe("TranscriptionsList", () => {
  beforeEach(() => {
    state = {
      data: [{ voice: "Voice 1", text: "Text 1" }],
    };

    store = createStore({
      state,
      mutations,
    });
  });

  it("computes transcriptionFromStore correctly", () => {
    const wrapper = shallowMount(TranscriptionsList, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.vm.transcriptionFromStore).toEqual(state.data);
  });

  it("renders transcription list from props", () => {
    const transcriptionsList = [{ voice: "Voice 1", text: "Text 1" }];

    const wrapper = shallowMount(TranscriptionsList, {
      props: { transcriptionsList },
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.findAll(".transcription__item").length).toBe(
      transcriptionsList.length
    );
  });

  it("calls Vuex mutations on user input voice value", async () => {
    store = createStore({
      state,
      mutations,
    });

    const wrapper = shallowMount(TranscriptionsList, {
      global: {
        plugins: [store],
      },
      props: { transcriptionsList: [{ voice: "Voice 1", text: "Text 1" }] },
    });

    await wrapper.find('[data-testid="transcription-voice"]').trigger("click");
    const inputElement = wrapper.find(
      '[data-testid="transcription-voice-editing"]'
    );
    await inputElement.setValue("New Voice");
    await inputElement.trigger("input");
    expect(mutations.UPDATE_TRANSCRIPTION).toHaveBeenCalled();
  });

  it("calls Vuex mutations on user input text value", async () => {
    store = createStore({
      state,
      mutations,
    });

    const wrapper = shallowMount(TranscriptionsList, {
      global: {
        plugins: [store],
      },
      props: { transcriptionsList: [{ voice: "Voice 1", text: "Text 1" }] },
    });

    // Simulate user input
    await wrapper.find('[data-testid="transcription-text"]').trigger("click");
    const textareaElement = wrapper.find(
      '[data-testid="transcription-text-editing"]'
    );
    await textareaElement.setValue("New Text for the text area");
    await textareaElement.trigger("input");
    expect(mutations.UPDATE_TRANSCRIPTION).toHaveBeenCalled();
  });

  it("calls DELETE_TRANSCRIPTION mutations on user cliks", async () => {
    state = {
      data: [
        { voice: "Voice 1", text: "Text 1" },
        { voice: "Voice 2", text: "Text 2" },
      ],
    };

    store = createStore({
      state,
      mutations,
    });

    const wrapper = shallowMount(TranscriptionsList, {
      global: {
        plugins: [store],
      },
      props: {
        transcriptionsList: [
          { id: "1", voice: "Voice 1", text: "Text 1" },
          { id: "2", voice: "Voice 2", text: "Text 2" },
        ],
      },
    });

    await wrapper.find('[data-testid="delete-transcription"]').trigger("click");
    expect(mutations.DELETE_TRANSCRIPTION).toHaveBeenCalled();
  });
});
