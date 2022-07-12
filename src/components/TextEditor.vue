<script setup>
import ImageEdit from "quill-image-edit-module"
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import { ref, toRefs } from "vue"
import { Quill, quillEditor } from "vue3-quill"
import ImagesModal from "./modals/ImagesModal.vue"

Quill.register("modules/imageEdit", ImageEdit)

const SizeStyle = Quill.import("attributors/style/size")

SizeStyle.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "38px",
  "44px",
]
Quill.register(SizeStyle, true)

const Bold = Quill.import("formats/bold")

Bold.tagName = "B"

Quill.register(Bold, true)

const props = defineProps({
  content: String,
})

const { content } = toRefs(props)

const emit = defineEmits(["update:content"])

const editor = ref()

const showSetImageModal = ref(false)

const imageHandler = (editor) => {
  console.log(editor)
  showSetImageModal.value = true
}

const insertImage = (image) => {
  const { url } = image
  const range = editor.value.getSelection()
  editor.value.insertEmbed(range?.index || 0, "image", url)
}

const editorOption = {
  modules: {
    imageEdit: {
      modules: ["Resize", "DisplaySize", "Toolbar", "Delete"],
    },
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [
          {
            size: [
              "10px",
              "12px",
              "14px",
              "16px",
              "18px",
              "20px",
              "24px",
              "28px",
              "32px",
              "38px",
              "44px",
            ],
          },
        ],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"],
      ],
      handlers: {
        image: function () {
          imageHandler(this.quill)
        },
      },
    },
  },
}

const onEditorChange = ({ quill, html, text }) => {
  emit("update:content", html)
}

const onEditorReady = (quill) => {
  editor.value = quill
}
</script>

<template>
  <div>
    <quill-editor
      ref="editorRef"
      v-model:value="content"
      :options="editorOption"
      @change="onEditorChange($event)"
      @ready="onEditorReady($event)"
    />

    <el-dialog v-model="showSetImageModal" title="Выберите изображение">
      <ImagesModal @set-image="insertImage" />
    </el-dialog>
  </div>
</template>

<style>
.ql-container {
  height: auto;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
  font-size: 10px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  font-size: 12px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  font-size: 16px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  font-size: 18px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  font-size: 20px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  font-size: 24px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="28px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
  content: "28px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
  font-size: 28px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
  content: "32px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
  font-size: 32px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="38px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="38px"]::before {
  content: "38px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="38px"]::before {
  font-size: 38px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="44px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="44px"]::before {
  content: "44px";
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="44px"]::before {
  font-size: 44px;
}
</style>
