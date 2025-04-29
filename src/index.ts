import { createApp } from 'vue'

import App from './App.vue'
import './global.css'

setInterval(() => {
  document.body.style.backgroundPosition = `${performance.now() / 10}px 0`
})

const app = createApp(App)

app.mount('#app')