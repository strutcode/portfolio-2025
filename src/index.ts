import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import splitDirective from './util/splitDirective'

export function start() {
  // Create the Vue app
  const app = createApp(App)

  // Mount the router
  app.use(router)

  app.use(splitDirective)

  // Mount the main component
  app.mount('#app')
}
