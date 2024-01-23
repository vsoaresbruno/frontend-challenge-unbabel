<script>
import { useStore } from "vuex";
import IconAdd from "./IconAdd.vue";

export default {
  name: "TranscriptionContainer",
  components: {
    IconAdd,
  },
  setup() {
    const store = useStore();

    const addField = () => {
      store.commit("ADD_TRANSCRIPTION");
    };
    return {
      addField,
    };
  },
};
</script>

<template>
  <button @click="addField" class="add-transcription">
    <icon-add />
  </button>
</template>

<style scoped>
.add-transcription {
  margin: 12px auto;
  display: block;
  border: unset;
  background-color: unset;
  cursor: pointer;
}
</style>
