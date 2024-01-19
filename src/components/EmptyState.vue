<script>
export default {
  name: "EmptyState",
  props: {
    title: {
      type: String,
      default: "No data",
    },
    message: {
      type: String,
      default:
        "Press the button on the top right of this page to load information",
    },
  },
  data() {
    return {
      UploadIcon: require("../assets/images/upload.svg"),
    };
  },
};
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 20px;
}
.empty-state__title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}
</style>

<template>
  <div class="empty-state">
    <h3 class="empty-state__title">{{ title }}</h3>
    <p>{{ message }}</p>
  </div>
</template>
