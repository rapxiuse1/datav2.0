import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home", //首页
      component: () => import("@/components/home")
    },
    {
      path: "/home",
      name: "home", //首页
      component: () => import("@/components/home")
    },
    {
      path: "/znzm",
      name: "znzm", //智能照明
      component: () => import("@/components/znzm")
    },
    {
      path: "/hjjc",
      name: "hjjc", //环境监测
      component: () => import("@/components/hjjc")
    },
    {
      path: "/znaf",
      name: "znaf", //智能安防
      component: () => import("@/components/znaf")
    },
    {
      path: "/xxzs",
      name: "xxzs", //信息展示
      component: () => import("@/components/xxzs")
    },
    {
      path: "/sbgl",
      name: "sbgl", //后台管理页设备管理
      component: () => import("@/components/admin/sbgl")
    },
    {
      path: "/sbgltype",
      name: "sbgltype", //后台管理页设备分类管理
      component: () => import("@/components/admin/sbgltype")
    },
    {
      path: "/gzgl",
      name: "gzgl", //后台管理页规则管理
      component: () => import("@/components/admin/gzgl")
    },
    {
      path: "/gzgltype",
      name: "gzgltype", //后台管理页规则分类管理
      component: () => import("@/components/admin/gzgltype")
    },
    {
      path: "/light",
      name: "light", //后台管理页灯杆管理
      component: () => import("@/components/admin/light")
    }
  ]
});
