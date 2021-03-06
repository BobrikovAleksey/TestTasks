import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Testing from '../views/Testing.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { scrollToTop: true },
  },
  {
    path: '/testing',
    name: 'Testing',
    component: Testing,
    meta: { scrollToTop: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  scrollBehavior: () => {
    document.body.scrollIntoView();
  },
});

export default router;
