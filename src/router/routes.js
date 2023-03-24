import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/Layout.vue'),
      children: [
        { path: '', component: () => import('@/views/home/Home.vue') },
      ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/notFound/ErrorNotFound.vue'),
    },
  ],
});

export default router;
