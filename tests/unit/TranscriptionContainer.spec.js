import { shallowMount } from "@vue/test-utils";
import TranscriptionContainer from "@/components/TranscriptionContainer.vue";
import TranscriptionsList from "@/components/TranscriptionsList.vue";
import TheHeader from "@/components/TheHeader.vue";
import { createStore } from "vuex";

describe("TranscriptionContainer", () => {
  let store;
  let getters;
  let mutations;

  const mockData = [{ id: 1, voice: "voice", text: "Sample" }];

  beforeEach(() => {
    getters = {
      data: () => mockData,
    };
    mutations = {
      ADD_TRANSCRIPTION: jest.fn(),
      updateTranscriptions: jest.fn(),
    };
    store = createStore({
      getters,
      mutations,
    });
  });

  it("renders child components", () => {
    const wrapper = shallowMount(TranscriptionContainer, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.findComponent(TheHeader).exists()).toBe(true);
    expect(wrapper.findComponent(TranscriptionsList).exists()).toBe(true);
  });

  it("calls ADD_TRANSCRIPTION mutation when add button is clicked", async () => {
    const wrapper = shallowMount(TranscriptionContainer, {
      global: {
        plugins: [store],
      },
    });
    await wrapper.find(".add-transcription").trigger("click");
    expect(mutations.ADD_TRANSCRIPTION).toHaveBeenCalled();
  });

  it("passes the correct props to child components", () => {
    const mockData = [{ id: 1, voice: "voice", text: "Sample" }];
    getters = { data: () => mockData };

    store = createStore({
      getters,
      mutations,
    });
    const wrapper = shallowMount(TranscriptionContainer, {
      global: {
        plugins: [store],
      },
    });

    const transcriptionsList = wrapper.findComponent(TranscriptionsList);
    expect(transcriptionsList.props().transcriptionsList).toBe(mockData);
  });
});
