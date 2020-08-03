import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import misc from "@views/misc";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = process.env.VUE_APP_MODULE
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
