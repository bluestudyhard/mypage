import { createRouter } from "vue-router";

import { createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/canvas",
    component: () => import("../views/canvas.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
