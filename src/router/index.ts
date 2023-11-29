import { createRouter, createWebHistory } from 'vue-router'
import userOnly from './guards/user-only';
import guestOnly from './guards/guest-only';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'getSignInLink',
      component: () => import("@/pages/SignIn/GetSignInLink.vue"),
      beforeEnter: guestOnly
    },
    {
      path: '/sign-in',
      name: 'processSignIn',
      component: () => import("@/pages/SignIn/ProcessSignIn.vue")
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import("@/pages/Home.vue"),
      beforeEnter: userOnly
    }
  ]
});

export default router;
