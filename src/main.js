import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import * as VueGoogleMaps from "vue2-google-maps";
import { CarouselPlugin } from "bootstrap-vue";
import { BCarousel } from "bootstrap-vue";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(CarouselPlugin);
Vue.component("b-carousel", BCarousel);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBha4EpKagXOtp2r2jRymEMhpQSNqgizDg",
    libraries: "places",
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
