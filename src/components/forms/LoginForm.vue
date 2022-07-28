<script setup>
import { useAuthStore } from "@/stores"
import { onKeyUp } from "@vueuse/core"
import { reactive, ref } from "vue"

const loginFormRef = ref()

const loginForm = reactive({
  email: "",
  password: "",
})

const loginFormRules = reactive({
  email: [
    {
      required: true,
      message: "Введите email",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Вы ввели некорректный email",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    {
      required: true,
      message: "Введите пароль",
      trigger: "blur",
    },
  ],
})

const store = useAuthStore()

const emit = defineEmits(["submitForm"])

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      emit("submitForm", loginForm)
    } else {
      return false
    }
  })
}

onKeyUp("Enter", (event) => {
  submitForm(loginFormRef.value)
})
</script>

<template>
  <el-form
    ref="loginFormRef"
    label-position="top"
    label-width="100px"
    :model="loginForm"
    :rules="loginFormRules"
  >
    <el-form-item prop="email" label="Email">
      <el-input v-model="loginForm.email" />
    </el-form-item>

    <el-form-item prop="password" label="Пароль">
      <el-input v-model="loginForm.password" />
    </el-form-item>
  </el-form>

  <el-button
    :loading="store.isLoading"
    type="primary"
    @click="submitForm(loginFormRef)"
    class="mt-4"
  >
    Войти в админку
  </el-button>
</template>
