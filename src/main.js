// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./assets/css/main.css";
import "lib-flexible";
import BaiduMap from "vue-baidu-map";
import dataV from "@jiaminghi/data-view";
import Echarts from "echarts";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

Vue.use(dataV);
Vue.config.productionTip = false;
Vue.prototype.$BMap = BaiduMap;
Vue.use(BaiduMap, {
  ak: "r9yUVYefDknbjN3GhUYhe0QvvybbVCZQ"
});
Vue.prototype.$echarts = Echarts;
Vue.use(Echarts);
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
axios.defaults.timeout = 500000;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = "http://tiot.jiu98.cn/";
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
