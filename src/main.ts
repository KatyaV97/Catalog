import './assets/index.sass'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vClickOutside from "click-outside-vue3"
import store from './store'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vClickOutside)


app.mount('#app')
