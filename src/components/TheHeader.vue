<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "TheHeader",
  props: {
    title: String,
  },
  setup() {
    const store = useStore();

    const data = computed(() => store.getters.data);

    const loadData = () => {
      store.dispatch("fetchData");
    };

    const saveData = () => {
      store.dispatch("postData");
    };

    const UploadIcon = require("../assets/images/upload.svg");
    const FetchDocIcon = require("../assets/images/fetch-document.svg");

    return {
      data,
      loadData,
      saveData,
      UploadIcon,
      FetchDocIcon,
    };
  },
};
</script>

<template>
  <header class="header">
    <div class="header__content">
      <h1 class="header__title">{{ title }}</h1>
      <div class="header__actions">
        <button @click="saveData" data-testid="save-data">
          <img :src="UploadIcon" alt="Save transcriptions" />
        </button>
        <button @click="loadData" data-testid="load-data">
          <img :src="FetchDocIcon" alt="Load transcriptions" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  padding: 23px;
  margin-bottom: 24px;
  background: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__content {
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin: 0 auto;
}

.header__actions button {
  cursor: pointer;
  background: unset;
  border: unset;
}
</style>
