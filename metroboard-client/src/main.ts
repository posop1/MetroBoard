import App from './App.vue'
import CustomScrollbar from 'custom-vue-scrollbar'
import 'custom-vue-scrollbar/dist/style.css'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
app.component(CustomScrollbar.name, CustomScrollbar)

declare module 'vue' {
  export interface GlobalComponents {
    CustomScrollbar: typeof CustomScrollbar
  }
}
