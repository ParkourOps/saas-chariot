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
          name: 'user-demo-profile',
          component: () => import("@/pages/user/demos/DemoUserInfo.vue"),
        },
        {
          path: 'notifications',
          name: 'user-demo-notifications',
          component: () => import("@/pages/user/demos/DemoNotifications.vue"),
        },
        {
          path: 'modals',
          name: 'user-demo-modals',
          component: () => import("@/pages/user/demos/DemoModals.vue"),
        },
        {
          path: 'menus',
          name: 'user-demo-menus',
          component: () => import("@/pages/user/demos/DemoMenus.vue"),
        },
        {
          path: 'messaging',
          name: 'user-demo-messaging',
          component: () => import("@/pages/user/demos/DemoMessaging.vue"),
        },
        {
          path: 'billing',
          name: 'user-demo-billing',
          component: () => import("@/pages/user/demos/DemoBilling.vue"),
        }
      ]
    }
  ]
});

export default router;
