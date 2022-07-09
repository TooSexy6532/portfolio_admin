import { usePrefsStore } from "../stores"

export const setLayout = (to, from, next) => {
  const store = usePrefsStore()

  const layout = to.meta.layout || "DefaultLayout"

  store.setLayout(layout)

  return next()
}

export const checkAuth = async (to, from, next) => {
  return next()
  // const { isLogedIn } = store.state.auth;

  // if (isLogedIn || !to.meta.requireAuth) return next();

  // try {
  //   const user = await store.dispatch("auth/getMe");
  //   if (user) return next();
  //   return next({ name: "login" });
  // } catch (error) {
  //   return next({ name: "login" });
  // }
}
