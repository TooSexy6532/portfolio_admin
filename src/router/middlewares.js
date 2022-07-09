import { useAuthStore, usePrefsStore } from "../stores"

export const setLayout = (to, from, next) => {
  const store = usePrefsStore()

  const layout = to.meta.layout || "DefaultLayout"

  store.setLayout(layout)

  return next()
}

export const checkAuth = async (to, from, next) => {
  const store = useAuthStore()

  if (store.isAuth || !to.meta.requireAuth) return next()

  try {
    const user = await store.getMe()

    if (user) return next()

    return next({ name: "login" })
  } catch (error) {
    return next({ name: "login" })
  }
}
