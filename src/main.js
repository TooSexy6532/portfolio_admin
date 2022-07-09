import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import ElementPlus from "element-plus"
import "./index.css"
import "element-plus/dist/index.css"
import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

const pinia = createPinia()

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia).use(router).use(ElementPlus).mount("#app")
