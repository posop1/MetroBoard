import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store/store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import CustomScrollbar from 'custom-vue-scrollbar'
import 'custom-vue-scrollbar/dist/style.css'

loadFonts()

const app = createApp(App)

app.use(router)
app.use(store, key)
app.use(vuetify)
app.mount('#app')
app.component(CustomScrollbar.name, CustomScrollbar)

declare module 'vue' {
  export interface GlobalComponents {
    CustomScrollbar: typeof CustomScrollbar
  }
}
