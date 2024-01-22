<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TranscriptionsList from "./TranscriptionsList.vue";
import TheHeader from "./TheHeader.vue";

export default {
  name: "TranscriptionContainer",
  components: {
    TheHeader,
    TranscriptionsList,
  },
  setup() {
    const store = useStore();

    const data = computed(() => store.getters.data);

    const addField = () => {
      store.commit("ADD_TRANSCRIPTION");
    };

    const AddRowIcon = require("../assets/images/add-row.svg");

    return {
      data,
      addField,
      AddRowIcon,
    };
  },
};
</script>

<template>
  <TheHeader title="Trascriptions" />
  <main class="container">
    <div class="content">
      <TranscriptionsList :transcriptionsList="data" />
    </div>
    <button @click="addField" class="add-transcription">
      <img :src="AddRowIcon" alt="add row icon" />
    </button>
  </main>
</template>

<style scoped>
.container {
  margin: 0 auto;
  width: 740px;
}
.content {
  border: 1px solid var(--border-color);
  background-color: #ffffff;
}
.field-pair {
  margin-top: 12px;
}
.add-transcription {
  margin: 12px auto;
  display: block;
  border: unset;
  background-color: unset;
  cursor: pointer;
}
</style>
