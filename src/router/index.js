import { createRouter, createWebHistory } from "vue-router";
import TranscriptionView from "../views/TranscriptionView.vue";

const routes = [
  {
    path: "/",
    name: "Transcriptions",
    component: TranscriptionView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
