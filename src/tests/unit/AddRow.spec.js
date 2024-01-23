import { shallowMount } from "@vue/test-utils";
import AddRow from "@/components/AddRow.vue";
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

  it("calls ADD_TRANSCRIPTION mutation when add button is clicked", async () => {
    const wrapper = shallowMount(AddRow, {
      global: {
        plugins: [store],
      },
    });
    await wrapper.find(".add-transcription").trigger("click");
    expect(mutations.ADD_TRANSCRIPTION).toHaveBeenCalled();
  });
});
