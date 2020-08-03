export default [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "./page/home")
  },
  {
    path: "/about",
    component: () => import(/* webpackChunkName: "about" */ "./page/about")
  },
  {
    path: "/manage",
    component: () => import(/* webpackChunkName: "manage" */ "./page/manage")
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "404" */ "./page/404")
  }
];