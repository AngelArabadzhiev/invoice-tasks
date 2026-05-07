import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

// Import your global styles and FontAwesome (if you added them earlier)
import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

app.use(router)

app.mount('#app')