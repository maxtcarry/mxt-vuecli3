const About = {
  path: '/about',
  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // 动态路由加载
  component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
}
export default About
