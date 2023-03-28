import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/Layout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('@/views/home/Home.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },

    {
      path: '/login',
      component: () => import('@/views/login/Login.vue'),
      meta: { requiresVisitor: true },
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/notFound/ErrorNotFound.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
