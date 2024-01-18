<script>
import TranscriptionsList from "./TranscriptionsList.vue";
import TheHeader from "./TheHeader.vue";

export default {
  name: "TranscriptionContainer",
  components: {
    TheHeader,
    TranscriptionsList,
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 740px;
}
</style>
<template>
  <TheHeader title="Trascriptions" />
  <div class="container">
    <TranscriptionsList />
  </div>
</template>
