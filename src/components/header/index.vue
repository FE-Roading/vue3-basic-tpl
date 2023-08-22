<script setup lang="ts">
import StartBtn from "./start-btn.vue"

import imgUri from "@/assets/images/inspect/header.png"

type IndexProps = {
  showTitle?: boolean
  disabled?: boolean
}
const { showTitle, disabled } = defineProps<IndexProps>()

</script>

<template>
  <div class="header">
    <img :src="imgUri" class="img">
    <div class="title" v-if="showTitle" /> 
    <StartBtn class="header-uploader" :disabled="disabled" />
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
}

</style>
