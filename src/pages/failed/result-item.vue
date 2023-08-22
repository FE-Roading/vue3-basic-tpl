<script setup lang="ts">
import { computed } from "vue"
import { ElCarousel, ElCarouselItem } from "element-plus"

import { InspectItemType, CheckedStatus } from "@/store/modules/inspect/type"

type IndexProps = {
  title?: string
  items?: InspectItemType[]
}
const { items, title } = withDefaults(defineProps<IndexProps>(), {
  items: () => []
})
const vaildItems = computed(() => items.filter(item => item.module == title && item.status == CheckedStatus.failed))

</script>

<template>
  <div :class="['result-item', { 'result-item-success': vaildItems.length == 0, 'result-item-error': vaildItems.length > 0 }]">
    <div class="ri-title">
      <span class="ri-title-left">{{ title }}</span>
      <span class="ri-title-right" v-if="vaildItems.length > 0"><span class="ri-title-count">{{ vaildItems.length }}</span> 项异常</span>
    </div>
    <div class="ri-body ri-body-empty" v-if="vaildItems.length == 0">
      暂无异常
    </div>
    <ElCarousel autoplay class="ri-body" v-else indicator-position="none">
      <ElCarouselItem style="height: 282px;" v-for="(item, index) in vaildItems" :key="item.id" class="ri-carousel-item">
        <img :src="item.image" class="ri-carousel-image" />
        <span class="ri-carousel-describe">{{ `问题${index+1}/${vaildItems.length} ${item.problem}` }}</span>
      </ElCarouselItem>
    </ElCarousel>
  </div>
</template>

<style scoped lang="scss">
.result-item {
  height: 382px;
  box-sizing: border-box;
  padding-bottom: 30px;

  display: flex;
  flex-direction: column;

  &-success {
    background-image: url("../../assets/images/inspect/result-success-bg.png");
    background-size: 100% 100%;
  }

  &-error {
    background-image: url("../../assets/images/inspect/result-failed-bg.png");
    background-size: 100% 100%;
  }

  .ri {
    &-title {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;

      margin: 4px 20px 20px 30px;
      height: 46px;
      flex: none;

      &-left {
        font-size: 24px;
        color: #80AEFF;
        line-height: 36px;
        font-weight: 600;
      }

      &-right {
        font-size: 20px;
        color: #80AEFF;
        line-height: 36px;
      }

      &-count {
        color: #c80a17;
        margin-right: 4px;
      }
    }

    &-body {
      flex: 1;
      padding: 0 20px;

      &-empty {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 22px;
        color: #00A256;
        line-height: 36px;
        font-weight: 400;
      }
    }

    &-carousel {
      &-item {
        position: relative;
      }
      &-image {
        width: 100%;
        height: 100%;
      }

      &-describe {
        position: absolute;
        bottom: 13px;
        left: 14px;

        font-size: 22px;
        color: #FFFFFF;
      }
    }
  }
}

</style>
