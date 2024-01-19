<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["data"]),
  },
  methods: {
    ...mapActions(["fetchData", "postData"]),
    loadData() {
      this.fetchData();
    },
    saveData() {
      this.postData();
    },
  },
  props: {
    title: String,
  },
  data() {
    return {
      UploadIcon: require("../assets/images/upload.svg"),
      FetchDocIcon: require("../assets/images/fetch-document.svg"),
    };
  },
};
</script>

<style scoped>
header {
  padding: 23px;
  margin-bottom: 24px;
  background: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0;
  z-index: 1;
}

.header__content {
  display: flex;
  justify-content: space-between;
  width: 740px;
  margin: 0 auto;
}

.header__actions button {
  cursor: pointer;
  background: unset;
  border: unset;
}
</style>

<template>
  <header class="header">
    <div class="header__content">
      <h1 class="header__title">{{ title }}</h1>
      <div class="header__actions">
        <button @click="saveData">
          <img :src="UploadIcon" alt="Save transcriptions" />
        </button>
        <button @click="loadData">
          <img :src="FetchDocIcon" alt="Load transcriptions" />
        </button>
      </div>
    </div>
  </header>
</template>
