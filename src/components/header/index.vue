<script setup lang="ts">
import { format } from "date-fns"
import { createDTFormat } from "@/config/dt"

import StartBtn from "./start-btn.vue"

import imgUri from "@/assets/images/inspect/header.png"
import { onMounted, onUnmounted, ref } from "vue";

type IndexProps = {
  showTitle?: boolean
  disabled?: boolean
}
const { showTitle, disabled } = defineProps<IndexProps>()
const dtFormat = createDTFormat({ dateDelimiter: '.' })
const timerRef = ref()
const currentTime = ref(formatDate(new Date()))

function formatDate(dt: Date) {
  if (!dt) return ''

  return format(dt, dtFormat.dateTime)
}

onMounted(() => {
  timerRef.value = setInterval(() => {
    currentTime.value = formatDate(new Date())
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timerRef.value)
})

</script>

<template>
  <div class="header">
    <img :src="imgUri" class="img">
    <div class="title" v-if="showTitle" /> 
    <StartBtn class="header-uploader" :disabled="disabled" />
    <div class="date">{{ currentTime }}</div>
  </div>
</template>


<style scoped lang="scss">
.header {
  width: 100%;
  position: relative;

  .img {
    width: 100%;
  }

  .title {
    position: absolute;
    top: 84px;
    left: 50%;
    transform: translateX(-50%);

    height: 63px;
    width: 992px;
    background-image: url("../../assets/images/inspect/title.png");
    background-position: top center;
    background-repeat: no-repeat;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-uploader {
    position: absolute;
    top: 37px;
    left: 29px;
  }

  .date {
    position: absolute;
    top: 37px;
    right: 30px;

    font-size: 26px;
    line-height: 1;
    color: #2FBDFF;
    letter-spacing: 1.7px;
    font-weight: 700;
  }
}

</style>
