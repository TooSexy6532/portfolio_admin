<script setup>
import { ImagesApi } from "@/api"
import { ref } from "vue"

let fileList = ref([])

const init = async () => {
  const { images } = await ImagesApi.getImages()

  fileList.value = images
}

const dialogImageUrl = ref("")
const link = ref("")
const dialogVisible = ref(false)

const handleRemove = async (file, uploadFiles) => {
  const filename = file.name
  const res = await ImagesApi.deleteImage({ filename })
  if (res) return true
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
  link.value = uploadFile.fullUrl
}

init()
</script>

<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      action="/api/image"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :before-remove="handleRemove"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
  </div>

  <el-dialog v-model="dialogVisible" top="5vh" custom-class="max-h-[85vh]">
    <div class="flex items-center justify-center">
      <img
        :src="dialogImageUrl"
        alt="Preview Image"
        class="h-auto max-h-[70vh] block"
      />
    </div>
    <div class="flex items-center justify-center text-lg font-medium mt-5">
      {{ link }}
    </div>
  </el-dialog>
</template>
