<script setup lang="ts">
import { computed } from "vue"
import { ElProgress, ElRow, ElCol,  } from "element-plus"
import { storeToRefs } from "pinia"

import { useInspectStore } from "@/store/modules/inspect"
import { CheckedStatus } from "@/store/modules/inspect/type"
import Header from "@/components/header/index.vue"
import ResultItem from "./result-item.vue"

import carIconUri from "@/assets/images/inspect/car.png"
import vinIconUri from "@/assets/images/inspect/vin.png"

const store = useInspectStore()
const { inspectedItems } = storeToRefs(store)
const inspectedCount = computed(() => inspectedItems.value.filter(item => item.status != CheckedStatus.pending).length)
const failedCount = computed(() => inspectedItems.value.filter(item => item.status == CheckedStatus.failed).length)
const inspectPercentage = computed(() => Math.ceil(inspectedCount.value / inspectedItems.value.length * 100))

</script>
<template>
  <div class="test-bad-pg">
    <Header class="tb-header" showTitle :disabled="inspectPercentage > 0 && inspectPercentage < 99"/>

    <div class="tb-body">
      <div class="tb-nav">
        <div class="tb-info tb-info-first">
          <img class="tb-info-icon" :src="carIconUri" />
          <div class="tb-info-title">当前检测车型</div>
          <div class="tb-info-value">{{ inspectPercentage == 0 ? "--" : "CX765-2"  }}</div>
        </div>
        <div class="tb-info  tb-info-last">
          <img class="tb-info-icon" :src="vinIconUri" />
          <div class="tb-info-title">车辆VIN号</div>
          <div class="tb-info-value">{{ inspectPercentage == 0 ? "--" : "2890103734933565" }}</div>
        </div>

        <div class="tb-progress">
          <ElProgress :percentage="inspectPercentage" :stroke-width="56" color="#1256CE" :show-text="false" />
          <div class="tb-progress-content">
            <span class="tb-progress-status tb-progress-content-item">已检测出项<span class="tb-progress-status-count">{{ failedCount }}</span>问题，请即刻处理</span>
            <span class="tb-progress-fixed tb-progress-content-item">已处理<span class="tb-progress-fixed-count">0/{{ failedCount }}</span></span>
            <span class="tb-progress-spacer"></span>
            <span class="tb-progress-value tb-progress-content-item">检测进度：<span class="tb-progress-value-count">{{ inspectedCount }}/{{ inspectedItems.length }}</span></span>
          </div>
        </div>
      </div>

      <div class="tb-result">
        <ElRow :gutter="39" class="tb-result-row tb-result-row-first">
          <ElCol :span="8" class="tb-result-column">
            <ResultItem title="车头检测" :items="inspectedItems" />
          </ElCol>
          <ElCol :offset="8" :span="8" class="tb-result-column">
            <ResultItem title="右侧检测" :items="inspectedItems" />
          </ElCol>
        </ElRow>
        <div class="tb-result-spacer" />
        <ElRow :gutter="39" class="tb-result-row">
          <ElCol :span="8" class="tb-result-column">
            <ResultItem title="左侧检测" :items="inspectedItems" describe-left="35px"/>
          </ElCol>
          <ElCol :span="8" class="tb-result-column-relative">
            <ResultItem title="车顶检测" :items="inspectedItems" />
          </ElCol>
          <ElCol :span="8" class="tb-result-column">
            <ResultItem title="车尾检测" :items="inspectedItems" />
          </ElCol>
        </ElRow>

      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.test-bad-pg {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #172651;
  overflow: hidden;

  .tb {
    &-header {
      flex: none;
    }

    &-body {
      width: 100%;
      flex: 1;

      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      overflow: hidden;

      padding: 30px 64px 49px 65px;
      box-sizing: border-box;
      background-image: url("../../assets/images/inspect/column-bg.png");
      background-size: 100% 100%;
    }

    &-nav {
      margin: 30px 0;
      width: 100%;

      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
    }

    &-info {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      font-size: 26px;

      > * {
        white-space: nowrap;
      }

      &-icon {
        width: 60px;
      }

      &-title {
        color: #fff;
        margin-left: 9px;
      }

      &-value {
        color: #F3C88F;
        font-weight: 700;
        margin-left: 6px;
      }

      &-first {
        margin-right: 50px;
      }

      &-last {
        margin-right: 60px;
      }
    }

    &-progress {
      flex: 1;
      position: relative;
      height: 56px;
      background: #1E4183;
      overflow: hidden;
      --el-border-color-lighter: #1E4183;

      &-content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        padding-left: 16px;
        padding-right: 20px;

        display: flex;
        flex-wrap: nowrap;
        align-items: center;

        font-size: 26px;
        line-height: 37px;

        &-item {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          white-space: nowrap;

          > *{
            white-space: nowrap;
            > * {
              white-space: nowrap;
            }
          }
        }
      }

      &-status {
        color: #80AEFF;

        &-count {
          font-family: "DIN";
          color: #FF2236;
          font-weight: 700;
          padding: 0 10px;
          position: relative;
        }
      }

      &-fixed {
        margin-left: 20px;
        color: #72B0FF;

        &-count {
          font-family: "DIN";
          color: #00A256;
          font-weight: 700;
          margin-left: 10px;
          position: relative;
        }
      }

      &-spacer {
        flex: 1;
      }

      &-value {
        color: #80AEFF;
        font-size: 22px;

        &-count {
          font-family: "DIN";
          color: #fff;
        }
      }
    }

    &-result {
      height: 0;
      min-height: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      background-image: url("../../assets/images/inspect/result-failed-car-bg.png");
      background-size: calc(100% / 3 + 55px) calc(100% - 364px);
      background-position: top center;
      background-repeat: no-repeat;

      &-spacer {
        flex: 1;
      }
    }
  }

  :deep(.el-progress-bar__outer), :deep(.el-progress-bar__inner) {
    border-radius: 0;
  }
}
</style>