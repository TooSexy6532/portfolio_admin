import { ElMessage } from "element-plus"
import { useMessagesStore } from "../stores"

export function useMessage() {
  const store = useMessagesStore()

  store.$subscribe((mutation, state) => {
    const { message, status } = state

    console.log(message, status)

    if (message && status) {
      ElMessage({
        grouping: true,
        showClose: true,
        message,
        type: status,
        onClose: () => store.reset(),
      })
    }
  })
}
