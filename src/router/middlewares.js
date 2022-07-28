import { useAuthStore, usePrefsStore } from "../stores"

export const setLayout = (to, from, next) => {
  const store = usePrefsStore()

  const layout = to.meta.layout || "DefaultLayout"

  store.setLayout(layout)

  return next()
}

export const checkAuth = async (to, from, next) => {
  const store = useAuthStore()

  if (store.isAuth || !to.meta.requireAuth) {
    if (to.name === "login") return next({ name: "home" })
    else return next()
  }

  try {
    const { isAuth } = await store.getMe()
    if (!isAuth) return next({ name: "login" })
    else return next()
  } catch (error) {
    return next({ name: "login" })
  }
}
