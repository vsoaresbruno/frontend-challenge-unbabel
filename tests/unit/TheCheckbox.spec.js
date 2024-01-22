import { shallowMount } from "@vue/test-utils";
import TheCheckbox from "@/components/TheCheckbox.vue";

describe("TheCheckbox.vue", () => {
  it("renders props.id ", () => {
    const id = "76898";
    const wrapper = shallowMount(TheCheckbox, {
      props: { id },
    });

    const checkbox = wrapper.find(".transcriptions__checkbox");
    expect(checkbox.attributes("id")).toBe(`transcriptions__item-${id}`);
  });
});
