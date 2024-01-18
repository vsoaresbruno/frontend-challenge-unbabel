<template>
  <div>
    <button @click="loadData">Load Data</button>
    <div v-if="data">{{ data }}</div>
  </div>
</template>

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
  mounted() {
    this.fetchData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
