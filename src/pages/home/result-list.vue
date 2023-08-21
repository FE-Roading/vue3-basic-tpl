<script setup lang="ts">
import { computed } from "vue"
import { ElScrollbar, } from "element-plus"

import { InspectItemType, CheckedStatus } from "@/store/modules/inspect/type"
import passedIconUri from "@/assets/images/inspect/success.png"

type IndexProps = {
  title?: string
  items?: InspectItemType[]
  isStarted?: boolean
}
const props = withDefaults(defineProps<IndexProps>(), {
  items: () => [],
  isStarted: true,
})


const validItems = computed(() => props.items.filter(item => item.module == props.title))
const passedCount = computed(() => validItems.value.filter(item => item.status == CheckedStatus.succeeded).length)

</script>

<template>
  <div class="passed-list">
    <div class="title">
      <span class="title-left">{{ title }}</span>
      <span class="title-right">{{ validItems.length }}/{{ passedCount }}</span>
    </div>
    <ElScrollbar class="list">
      <div class="list-item" v-for="item in validItems">
        <span class="list-item-title">{{ item.title }}</span>
        <template v-if="isStarted">
          <img :src="passedIconUri" v-if="item.status == CheckedStatus.succeeded" />
          
        </template>
        <span v-else class="list-item-pending">--</span>
      </div>
    </ElScrollbar>
  </div>
</template>

<style scoped lang="scss">
.passed-list {
  display: flex;
  flex-direction: column;
  
  background-image: url("../../assets/images/inspect/passed-list-bg.png");
  background-size: 100% 100%;

  .title {
    flex: none;
    background-image: url("../../assets/images/inspect/passed-list-title-bg.png");
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

      &-pending {
        color: #666;
        font-size: 24px;
      }
    }
  }
}

</style>
