import ElementPlus from "element-plus"
import "./index.css"
import "element-plus/dist/index.css"
import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const pinia = createPinia()

const app = createApp(App)

app.use(pinia).use(router).use(ElementPlus).mount("#app")

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
