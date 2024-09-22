import { createRouter, createWebHistory } from 'vue-router';
import ProductsView from '../views/ProductsView.vue';
import CartView from '../views/CartView.vue';
import { ROUTER_PATH } from '../constants';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTER_PATH.PRODUCTS,
      name: 'products',
      component: ProductsView
    },
    {
      path: ROUTER_PATH.CART,
      name: 'cart',
      component: CartView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: ROUTER_PATH.PRODUCTS
    }
  ]
});

export default router;
