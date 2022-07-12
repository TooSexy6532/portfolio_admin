import { checkAuth, setLayout } from "@/router/middlewares"
import CategoriesView from "@/views/CategoriesView"
import CreateProjectView from "@/views/CreateProjectView"
import HomeView from "@/views/HomeView"
import ImagesView from "@/views/ImagesView"
import LoginView from "@/views/LoginView"
import ProjectsView from "@/views/ProjectsView"
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
  {
    path: "/categories",
    name: "categories",
    component: CategoriesView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/images",
    name: "images",
    component: ImagesView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/create-project",
    name: "create-project",
    component: CreateProjectView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/edit-project",
    name: "edit-project",
    component: CreateProjectView,
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
