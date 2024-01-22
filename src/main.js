import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/global.css";
import router from './router'

createApp(App).use(router).use(store).mount("#app");
