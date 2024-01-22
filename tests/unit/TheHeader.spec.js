import TheHeader from "@/components/TheHeader.vue";
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
    const wrapper = shallowMount(TheHeader, {
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

  it('dispatches "fetchData" when LOAD button is clicked', async () => {
    const actions = {
      fetchData: jest.fn(),
      postData: jest.fn(),
    };

    store = createStore({
      actions,
      getters,
    });

    const wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [store],
      },
      props: {
        title: "Test Title",
      },
    });

    await wrapper.find('[data-testid="load-data"]').trigger("click");
    expect(actions.fetchData).toHaveBeenCalled();
    // Similar test for postData
  });

  it('dispatches "saveData" when SAVE button is clicked', async () => {
    const actions = {
      fetchData: jest.fn(),
      postData: jest.fn(),
    };

    store = createStore({
      actions,
      getters,
    });

    const wrapper = shallowMount(TheHeader, {
      global: {
        plugins: [store],
      },
      props: {
        title: "Test Title",
      },
    });

    await wrapper.find('[data-testid="save-data"]').trigger("click");
    expect(actions.postData).toHaveBeenCalled();
    // Similar test for postData
  });
});
