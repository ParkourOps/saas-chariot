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
      name: 'signIn',
      component: () => import("@/pages/sign-in/GetSignInLink.vue"),
      beforeEnter: guestOnly
    },
    {
      path: '/sign-in',
      name: 'processSignIn',
      component: () => import("@/pages/sign-in/ProcessSignIn.vue")
    },
    {
      path: '/user',
      name: 'user',
      component: () => import("@/pages/user/User.vue"),
      beforeEnter: userOnly,
      redirect: { name: 'user-dashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'user-dashboard',
          component: () => import("@/pages/user/UserDashboard.vue"),
        },
        {
          path: 'profile',
          name: 'user-profile',
          component: () => import("@/pages/user/DemoUserInfo.vue"),
        },
        {
          path: 'notifications',
          name: 'user-notifications',
          component: () => import("@/pages/user/DemoNotifications.vue"),
        }
      ]
    }
  ]
});

export default router;
