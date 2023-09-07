import { createRouter, createWebHashHistory } from 'vue-router'

const routes = []
// 动态的注册路由，不用每次手动添加路由
function importViews() {
  const views = import.meta.glob('../views/*.vue')

  for (const path in views) {
    const name = path.match(/\.\/views(.*)\.vue$/)[1].toLowerCase()
    // console.log(path.match(/\.\/views(.*)\.vue$/));
    routes.push({
      path: name === '/home' ? '/' : name,
      component: views[path],
    })
  }
}
importViews()
// const routes = [
//   {
//     path: '/',
//     component: () => import('@/views/home.vue'),
//     meta: {
//       keepAlive: true // 设置该页面需要缓存
//     }
//   },
//   {
//     path: '/canvas',
//     component: () => import('@/views/canvas.vue'),
//     meta: {
//       keepAlive: true // 设置该页面需要缓存
//     }
//   }
// ];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
