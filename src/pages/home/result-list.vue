<script setup lang="ts">
import { computed } from "vue"
import { ElScrollbar, } from "element-plus"
import { PassedItemType, CheckedStatus } from "./type";

import passedIconUri from "@/assets/images/measure/success.png"

type IndexProps = {
  title?: string
  items?: PassedItemType[]
}
const { items } = withDefaults(defineProps<IndexProps>(), {
  items: () => []
})

const passedCount = computed(() => items.filter(item => item.status == CheckedStatus.succeeded).length)

</script>

<template>
  <div class="passed-list">
    <div class="title">
      <span class="title-left">{{ title }}</span>
      <span class="title-right">{{ items.length }}/{{ passedCount }}</span>
    </div>
    <ElScrollbar class="list">
      <div class="list-item" v-for="item in items">
        <span class="list-item-title">{{ item.title }}</span>
        <img :src="passedIconUri" v-if="item.status == CheckedStatus.succeeded" />
      </div>
    </ElScrollbar>
  </div>
</template>

<style scoped lang="scss">
.passed-list {
  display: flex;
  flex-direction: column;
  
  background-image: url("../../assets/images/measure/passed-list-bg.png");
  background-size: 100% 100%;

  .title {
    flex: none;
    background-image: url("../../assets/images/measure/passed-list-title-bg.png");
    background-size: 100% 100%;

    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    height: 56px;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 56px;

    &-left {
      font-size: 24px;
      color: #80AEFF;
      font-weight: 600;
    }

    &-right {
      font-size: 26px;
      color: #F3C88F;
      font-weight: 700;
    }
  }

  .list {
    flex: 1;

    margin: 20px;

    &-item {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      &:last-of-type {
        margin-bottom: 0;
      }

      &-title {
        color: #fff;
        font-size: 24px;
        line-height: 33px;

        margin-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

</style>
