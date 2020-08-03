import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// import api from '@components/load-jq'
import { registerInterceptor } from "@utils/net";
registerInterceptor(null);
Vue.config.productionTip = false;
// Vue.use(api);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
