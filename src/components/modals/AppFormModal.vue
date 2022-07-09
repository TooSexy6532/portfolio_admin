<script setup>
import { ref, toRefs, watch } from "vue"
import UserForm from "../forms/UserForm.vue"

const props = defineProps({
  showModal: Boolean,
  form: String,
  title: String,
})

const components = { UserForm }

const { showModal } = toRefs(props)

const emit = defineEmits(["submited", "closed"])

const modal = ref(false)

watch(showModal, function () {
  modal.value = props.showModal
})
</script>

<template>
  <el-dialog
    v-model="modal"
    :close-on-click-modal="false"
    :title="title"
    @close="$emit('closed')"
  >
    <component :is="components[form]" @done="$emit('closed')" />
  </el-dialog>
</template>
