import Vue from "vue";
import VueRouter from "vue-router";
import misc from "@views/misc";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: Home
//   },
//   {
//     path: "/about",
//     name: "About",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue")
//   }
// ];
const routes = process.env.VUE_APP_MODULE
  ? [
      ...misc,
      ...require("@views/codehub").default,
      ...require(`@views/${process.env.VUE_APP_MODULE}`).default
    ]
  : [
      ...misc,
      ...require("@views/art").default,
      ...require("@views/blog").default,
      ...require("@views/codehub").default,
      ...require("@views/ecosphere").default,
      ...require("@views/library").default,
      ...require("@views/life").default,
      ...require("@views/news").default,
      ...require("@views/plan").default,
      ...require("@views/summary").default,
      ...require("@views/tools").default
    ];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
