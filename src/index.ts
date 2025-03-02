import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

export function start() {
  // Create the Vue app
  const app = createApp(App)

  // Mount the router
  app.use(router)

  // Mount the main component
  app.mount('#app')
}
