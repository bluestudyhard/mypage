import { createRouter } from "vue-router";

import { createWebHashHistory } from "vue-router";
import { RouterLinkStub } from "@vue/test-utils";

const routes = [
  {
    path: "/",
    component: import("../views/Home.vue"),
  },
  {
    path: "/canvas",
    component: import("../views/Canvas.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
