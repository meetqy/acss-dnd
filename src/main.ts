import { createApp } from "vue";
import { createPinia } from "pinia";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import hljsVuePlugin from "@highlightjs/vue-plugin";

import App from "./App.vue";
import router from "./router";
import "./index.css";
import "@acss-dnd/template/dist/style.css";

hljs.registerLanguage("xml", xml);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(hljsVuePlugin);

app.mount("#app");
