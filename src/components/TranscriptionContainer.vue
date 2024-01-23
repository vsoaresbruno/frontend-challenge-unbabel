<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TranscriptionsList from "./TranscriptionsList.vue";
import BaseHeader from "./BaseHeader.vue";
import AddRow from "./AddRow.vue";

export default {
  name: "TranscriptionContainer",
  components: {
    BaseHeader,
    TranscriptionsList,
    AddRow,
  },
  setup() {
    const store = useStore();

    const data = computed(() => store.getters.data);

    return {
      data,
    };
  },
};
</script>

<template>
  <BaseHeader title="Trascriptions" />
  <main role="main" aria-labelledby="main-list" class="container">
    <div class="content">
      <TranscriptionsList :transcriptionsList="data" />
    </div>
  </main>
  <AddRow />
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
</style>
