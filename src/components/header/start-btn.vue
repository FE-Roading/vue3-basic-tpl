<script setup lang="ts">
import { ElUpload, ElButton, UploadRawFile } from "element-plus"
import { useRouter } from "vue-router";

import { useInspectStore } from "@/store/modules/inspect"

type IndexProps = {
  disabled?: boolean
}
defineProps<IndexProps>()

const router = useRouter()
const { startInspect } = useInspectStore()

function onBeforeUpload(raw: UploadRawFile) {
  if (raw.name.includes("成功")) {
    startInspect(true, router)
  } else {
    startInspect(false, router)
  }

  return Promise.reject()
}

</script>
<template>
  <ElUpload class="start-btn-com" :before-upload="onBeforeUpload" :disabled="disabled">
    <template #trigger>
      <ElButton type="primary" :disabled="disabled">上传演示视频</ElButton>
    </template>
  </ElUpload>
</template>
<style lang="scss" scoped>
  .start-btn-com {
    :deep(.el-button) {
      background-color: transparent!important;
      background-image: linear-gradient(180deg, #152D68 0%, #133A89 100%)!important;
      border: 1px solid rgba(18,96,209,1);

      &.is-disabled {
        cursor:not-allowed;
      }

      font-size: 22px;
      line-height: 30px;
      letter-spacing: 0;
      color: #35F2FF;
      padding: 6px 20px;
      height: auto!important;
    }
  }
</style>