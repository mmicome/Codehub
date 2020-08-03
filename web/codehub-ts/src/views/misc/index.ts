export default [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "./page/home.vue")
  },
  {
    path: "/about",
    component: () => import(/* webpackChunkName: "about" */ "./page/about.vue")
  },
  {
    path: "/manage",
    component: () =>
      import(/* webpackChunkName: "manage" */ "./page/manage.vue")
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "404" */ "./page/404.vue")
  }
];
