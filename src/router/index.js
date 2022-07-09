import { checkAuth, setLayout } from "@/router/middlewares"
import HomeView from "@/views/HomeView"
import LoginView from "@/views/LoginView"
import UsersView from "@/views/UsersView"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: {
      layout: "SimpleLayout",
    },
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
    meta: {
      requireAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(checkAuth)
router.beforeEach(setLayout)

export default router
