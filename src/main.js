import { createApp } from "vue";
import "@/assets/styles/app.scss";
import App from "./App.vue";
import router from "./router.";

import clickOutsideDirective from "./directives/clickOutsideDirective";

import UIComponents from "@/components/UI";

const app = createApp(App);

app.directive("click-outside", clickOutsideDirective);

UIComponents.forEach((component) => {
  app.component(component.__name, component);
});

app.use(router).mount("#app");
