<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["data"]),
  },
  methods: {
    ...mapActions(["fetchData"]),
    loadData() {
      this.fetchData();
    },
  },
  props: {
    title: String,
  },
  data() {
    return {
      FetchDocIcon: require("../assets/images/fetch-document.svg"),
      UploadIcon: require("../assets/images/upload.svg"),
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

.header__title {
  color: #414c5e;
  font-size: 18px;
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
        <button @click="loadData">
          <img :src="FetchDocIcon" alt="Save transcriptions" />
        </button>
        <button @click="loadData">
          <img :src="UploadIcon" alt="Load transcriptions" />
        </button>
      </div>
    </div>
  </header>
</template>
