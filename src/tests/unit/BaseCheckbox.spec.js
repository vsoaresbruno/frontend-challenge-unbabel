import { shallowMount } from "@vue/test-utils";
import BaseCheckbox from "@/components/BaseCheckbox.vue";

describe("BaseCheckbox.vue", () => {
  it("renders props.id ", () => {
    const id = "76898";
    const wrapper = shallowMount(BaseCheckbox, {
      props: { id },
    });

    const checkbox = wrapper.find(".transcriptions__checkbox");
    expect(checkbox.attributes("id")).toBe(`transcriptions__item-${id}`);
  });
});
