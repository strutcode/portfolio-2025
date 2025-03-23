import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import splitDirective from './util/splitDirective'

import './global.css'

export function start() {
  // Create the Vue app
  const app = createApp(App)

  // Mount the router
  app.use(router)

  // Load the custom split directive plugin
  app.use(splitDirective)

  // Mount the main component
  app.mount('#app')
}
