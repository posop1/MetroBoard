import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import type { App } from 'vue'
import { key, store } from '@/store/store'

export function registerPlugins(app: App) {
  loadFonts()
  app.use(vuetify).use(router).use(store, key)
}
