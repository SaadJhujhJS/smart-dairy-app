import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Pure Ghee, Honey & Dairy Products | Smart Dairy Store' }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue'),
    meta: { title: 'Shop Pure Honey, Desi Ghee & Khoya | Smart Dairy Store' }
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetailView.vue'),
    meta: { title: 'Product Details | Smart Dairy Store' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckoutView.vue'),
    meta: { title: 'Secure Checkout | Smart Dairy Store' }
  },
  {
    path: '/order-confirmation',
    name: 'order-confirmation',
    component: () => import('../views/OrderConfirmationView.vue'),
    meta: { title: 'Order Confirmed | Smart Dairy Store' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: '404 - Page Not Found | Smart Dairy Store' }
  }
]
