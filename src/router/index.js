import { createRouter } from 'vue-router';

import { createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/home.vue'),
    meta: {
      keepAlive: true // 设置该页面需要缓存
    }
  },
  {
    path: '/canvas',
    component: () => import('../views/canvas.vue'),
    meta: {
      keepAlive: true // 设置该页面需要缓存
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
