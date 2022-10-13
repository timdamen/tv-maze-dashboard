import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import { Routes } from '@/constants/routes.constant';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `${Routes.dashboard}`,
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: `${Routes.show}/:id`,
      name: 'show',
      component: () => import('@/views/ShowDetailsView.vue'),
    },
  ],
});

export default router;
