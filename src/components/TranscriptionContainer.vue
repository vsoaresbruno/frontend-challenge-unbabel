<script>
import { mapGetters, mapMutations } from "vuex";
import TranscriptionsList from "./TranscriptionsList.vue";
import TheHeader from "./TheHeader.vue";

export default {
  name: "TranscriptionContainer",
  components: {
    TheHeader,
    TranscriptionsList,
  },
  computed: {
    ...mapGetters(["data", "fieldPairs"]),
  },
  methods: {
    ...mapMutations(["addFieldPair", "updateFieldPair"]),
    addFields() {
      this.addFieldPair();
    },
  },
  data() {
    return {
      AddRowIcon: require("../assets/images/add-row.svg"),
    };
  },
};
</script>

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

<template>
  <TheHeader title="Trascriptions" />
  <div class="container">
    <div class="content">
      <TranscriptionsList :transcriptionsList="data" />
    </div>
    <button @click="addFields" class="add-transcription">
      <img :src="AddRowIcon" alt="add row icon" />
    </button>
  </div>
</template>
