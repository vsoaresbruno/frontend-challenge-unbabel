<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TranscriptionsList from "./TranscriptionsList.vue";
import BaseHeader from "./BaseHeader.vue";
import IconAdd from "./IconAdd.vue";

export default {
  name: "TranscriptionContainer",
  components: {
    BaseHeader,
    TranscriptionsList,
    IconAdd,
  },
  setup() {
    const store = useStore();

    const data = computed(() => store.getters.data);

    const addField = () => {
      store.commit("ADD_TRANSCRIPTION");
    };
    return {
      data,
      addField,
    };
  },
};
</script>

<template>
  <BaseHeader title="Trascriptions" />
  <main class="container">
    <div class="content">
      <TranscriptionsList :transcriptionsList="data" />
    </div>
    <button @click="addField" class="add-transcription">
      <icon-add />
    </button>
  </main>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 740px;
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
