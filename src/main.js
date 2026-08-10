import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router'
import './style.css'

// Export createApp with ViteSSG configuration
export const createApp = ViteSSG(
  App,
  { 
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    }
  },
  ({ app, router, isClient, initialState }) => {
    // Install Pinia store instance
    const pinia = createPinia()
    app.use(pinia)

    // Optional: Synchronize state between server and client if needed
    if (isClient) {
      // client-only initializations can be placed here
    }
  }
)
