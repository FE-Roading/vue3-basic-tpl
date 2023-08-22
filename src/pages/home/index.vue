<script setup lang="ts" name="home">
import { ref, computed, } from "vue"
import { ElRow, ElCol, ElUpload, ElButton, UploadRawFile } from "element-plus"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"

import { useInspectStore } from "@/store/modules/inspect"
import { CheckedStatus } from "@/store/modules/inspect/type"
import Header from "@/components/header/index.vue"

import ResultList from "./result-list.vue"
import RateList from "./rate-list.vue"
import BadRankList from "./bad-rank-list.vue"
import StatusBar from "./status-bar.vue"

import stationStatusTitleUri from "@/assets/images/inspect/station-status-title.png"
import taskStatusTitleUri from "@/assets/images/inspect/task-status-title.png"
import carIconUri from "@/assets/images/inspect/car.png"
import vinIconUri from "@/assets/images/inspect/vin.png"

const router = useRouter()
const store = useInspectStore()
const { inspectedIndex, inspectedItems } = storeToRefs(store)
const isFinished = computed(() => inspectedIndex.value > 0 && inspectedItems.value.every(item => item.status != CheckedStatus.pending))
const isPending = computed(() => inspectedIndex.value == 0)

function onBeforeUpload(raw: UploadRawFile) {
  if (raw.name.includes("成功")) {
    store.startInspect(true, router)
  } else {
    store.startInspect(false, router)
  }

  return Promise.reject()
}

</script>

<template>
  <div class="home-pg">
    <Header class="home-header"/>
    <ElUpload class="home-uploader" :before-upload="onBeforeUpload" :disabled="!isFinished && !isPending">
      <template #trigger>
        <ElButton type="primary" :disabled="!isFinished && !isPending">上传演示视频并运行</ElButton>
      </template>
    </ElUpload>
    <div class="home-body">
      <div class="home-column home-left">
        <img :src="stationStatusTitleUri" class="home-column-title" />

        <div class="home-column-body">
          <div class="hl-info">
            <div class="hl-info-item">
              <img class="hl-info-icon" :src="carIconUri" />
              <div class="hl-info-right">
                <div class="hl-info-right-top">{{ isPending ? "--" : "CX765-2"  }}</div>
                <div class="hl-info-right-bottom">当前检测车型</div>
              </div>
            </div>
            <div class="hl-info-item">
              <img class="hl-info-icon" :src="vinIconUri" />
              <div class="hl-info-right">
                <div class="hl-info-right-top">{{ isPending ? "--" : "2890103734933565"  }}</div>
                <div class="hl-info-right-bottom">车辆VIN号</div>
              </div>
            </div>
          </div>

          <StatusBar class="hl-status-bar" :pending="isPending" :finished="isFinished" />

          <div class="hl-display">
            <ElRow :gutter="116" class="hl-result-row">
              <ElCol :span="8" class="hl-result-column">
                <ResultList title="车头检测" :items="inspectedItems" :is-started="inspectedIndex > 0" class="hl-result-item"/>
                <div class="hl-result-spacer" />
                <ResultList title="左侧检测" :items="inspectedItems" :is-started="inspectedIndex > 0" class="hl-result-item"/>
              </ElCol>
              <ElCol :span="8" class="hl-result-column-relative">
                <ResultList title="车顶检测" :items="inspectedItems" :is-started="inspectedIndex > 0" class="hl-result-center-bottom"/>
              </ElCol>
              <ElCol :span="8" class="hl-result-column">
                <ResultList title="右侧检测" :items="inspectedItems" :is-started="inspectedIndex > 0" class="hl-result-item"/>
                <div class="hl-result-spacer" />
                <ResultList title="车尾检测" :items="inspectedItems" :is-started="inspectedIndex > 0" class="hl-result-item"/>
              </ElCol>
            </ElRow>

          </div>
        </div>
      </div>
      <div class="home-spacer"></div>
      <div class="home-column home-right">
        <img :src="taskStatusTitleUri" class="home-column-title" />
        <ul class="hr-statistics">
          <li class="hr-statistics-item">
            <div class="hr-statistics-item-count">
              500
            </div>
            <div class="hr-statistics-item-title">
              今日计划产量
            </div>
          </li>
          <li class="hr-statistics-item">
            <div class="hr-statistics-item-count">
              132
            </div>
            <div class="hr-statistics-item-title">
              今日实际产量
            </div>
          </li>
          <li class="hr-statistics-item">
            <div class="hr-statistics-item-count">
              125
            </div>
            <div class="hr-statistics-item-title">
              CAL上线
            </div>
          </li>
        </ul>
        <RateList class="hr-rate" />
        <BadRankList class="hr-rank" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-pg {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #172651;
  overflow: hidden;

  .home {
    &-header {
      flex: none;
    }

    &-uploader {
      position: absolute;
      top: 60px;
      left: 32px;
    }

    &-body {
      width: 100%;
      height: 0;
      min-height: 0;
      flex: 1;
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;

      padding: 30px 20px 15px 20px;
      box-sizing: border-box;
    }

    &-column {
      flex: 1;
      overflow: hidden;

      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding: 10px;
      padding-top: 0;
      
      background-image: url("../../assets/images/inspect/column-bg.png");
      background-size: 100% 100%;

      &-title {
        justify-self: center;
      }

      &-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        padding: 44px;
      }
    }

    &-spacer {
      width: 10px;
    }

    &-right {
      padding-bottom: 54px;

      > * {
        margin-left: 51px;
        margin-right: 48px;
      }
    }
  }

  .hl {
    &-info {
      display: flex;
      justify-content: space-between;

      &-item {
        display: flex;
        align-items: center;
      }

      &-icon {
        width: 77px;
      }

      &-right {
        margin-left: 21px;

        &-top {
          font-size: 32px;
          line-height: 1;
          color: #F3C88F;
          font-weight: 700;
        }

        &-bottom {
          margin-top: 7px;

          font-size: 26px;
          line-height: 1;
          color: #fff;
        }
      }
    }

    &-status-bar {
      flex: none;
    }

    &-display {
      height: 0;
      min-height: 0;
      flex: 1;

      background-image: url("../../assets/images/inspect/passed-car.png");
      background-size: calc(100% - (100% - 232px) / 3 * 2) 65%;
      background-position: top center;
      background-repeat: no-repeat;

      position: relative;
    }

    &-result {
      &-row {
        height: 100%;
      }

      &-column {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: space-between;

        &-relative {
          position: relative;
        }
      }

      &-item {
        height: 0;
        min-height: 0;
        flex: 1;
      }

      &-spacer {
        height: 56px;
        flex: none;
      }

      &-center-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 65%;
      }
    }
  }

  .hr {
    &-statistics {
      flex: none;
      margin-top: 43px;

      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;

      &-item {
        &-count {
          font-size: 32px;
          color: #01A7F0;
          font-weight: 700;
        }

        &-title {
          margin-top: 7px;
          font-size: 26px;
          color: #fff;
        }
      }
    }

    &-rate {
      margin-top: 82px;
      flex: none;
    }

    &-rank {
      flex: 1;
    }
  } 
}
</style>
