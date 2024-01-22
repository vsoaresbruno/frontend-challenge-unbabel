<script>
export default {
  name: "HomePage",
  components: {},
};
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/transcriptions">Transcriptions</router-link>
  </nav>
  <router-view />
  <!-- <TranscriptionContainer /> -->
</template>
