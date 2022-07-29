import { useAuthStore, usePrefsStore } from "../stores"

export const setLayout = (to, from, next) => {
  const store = usePrefsStore()

  const layout = to.meta.layout || "DefaultLayout"

  store.setLayout(layout)

  return next()
}

export const checkAuth = async (to, from, next) => {
  const store = useAuthStore()

  if (to.meta.requireAuth && !store.isAuth) {
    try {
      await store.getMe()
      if (store.isAuth) return next()
    } catch (error) {
      return next({ name: "login" })
    }
  }

  if (to.name === "login" && store.isAuth) return next({ name: "home" })

  return next()
}
