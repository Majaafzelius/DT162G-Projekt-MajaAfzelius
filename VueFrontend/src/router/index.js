import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '../views/AddView.vue'
import RecipeDetails from '../views/RecipeDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add',
      name: 'add',
      component: AddView
    },
    {
      path: '/recipe/:id',
      name: 'RecipeDetails',
      component: RecipeDetails,
    },
  ]
})

export default router
