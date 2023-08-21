<script setup lang="ts">
import imgUri from "@/assets/images/inspect/header.png"

type IndexProps = {
  showTitle?: boolean
}
const { showTitle } = defineProps<IndexProps>()

</script>

<template>
  <div class="header">
    <img :src="imgUri" class="img">
    <div class="title" v-if="showTitle" /> 
  </div>
</template>


<style scoped lang="scss">
.header {
  width: 100%;

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
}

</style>
