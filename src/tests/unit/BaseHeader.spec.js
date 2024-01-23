import BaseHeader from "@/components/BaseHeader.vue";
import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";

describe("YourComponent", () => {
  let store;
  let getters;
  const mockData = [{ id: 1, voice: "voice", text: "Sample" }];

  beforeEach(() => {
    getters = { data: () => mockData };

    store = createStore({
      getters,
    });
  });

  it("renders correctly", () => {
    const wrapper = shallowMount(BaseHeader, {
      global: {
        plugins: [store],
      },
      props: {
        title: "Test Title",
      },
    });
    expect(wrapper.text()).toContain("Test Title");
    // Add more assertions as needed
  });

  it('dispatches "getTranscriptions" when LOAD button is clicked', async () => {
    const actions = {
      getTranscriptions: jest.fn(),
      postTranscriptions: jest.fn(),
    };

    store = createStore({
      actions,
      getters,
    });

    const wrapper = shallowMount(BaseHeader, {
      global: {
        plugins: [store],
      },
      props: {
        title: "Test Title",
      },
    });

    await wrapper.find('[data-testid="load-data"]').trigger("click");
    expect(actions.getTranscriptions).toHaveBeenCalled();
    // Similar test for postTranscriptions
  });

  it('dispatches "saveData" when SAVE button is clicked', async () => {
    const actions = {
      getTranscriptions: jest.fn(),
      postTranscriptions: jest.fn(),
    };

    store = createStore({
      actions,
      getters,
    });

    const wrapper = shallowMount(BaseHeader, {
      global: {
        plugins: [store],
      },
      props: {
        title: "Test Title",
      },
    });

    await wrapper.find('[data-testid="save-data"]').trigger("click");
    expect(actions.postTranscriptions).toHaveBeenCalled();
  });
});
