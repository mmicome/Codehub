export default [
  {
    path: "/codehub",
    component: () => import(/* webpackChunkName: "home" */ "./page/home")
  },
  {
    path: "/codehub/about",
    component: () => import(/* webpackChunkName: "about" */ "./page/about")
  },
  {
    path: "/codehub/manage",
    component: () => import(/* webpackChunkName: "manage" */ "./page/manage")
  }
];
