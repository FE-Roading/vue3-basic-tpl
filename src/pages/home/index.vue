<script setup lang="ts" name="home">
import { ElRow, ElCol } from "element-plus"

import Header from "@/components/header/index.vue"

import { CheckedStatus, PassedItemType } from "./type"
import ResultList from "./result-list.vue"

import stationStatusTitleUri from "@/assets/images/measure/station-status-title.png?uri"
import taskStatusTitleUri from "@/assets/images/measure/task-status-title.png?uri"
import carIconUri from "@/assets/images/measure/car.png?uri"
import vinIconUri from "@/assets/images/measure/vin.png?uri"

const checkItems: { 
  head: PassedItemType[]
  right: PassedItemType[]
  left: PassedItemType[]
  top: PassedItemType[]
  footer: PassedItemType[]
 } = {
  head: [
   { title: "车头灯", status: CheckedStatus.succeeded }, 
   { title: "前保", status: CheckedStatus.succeeded }, 
   { title: "前档", status: CheckedStatus.succeeded }, 
   { title: "雨刮", status: CheckedStatus.succeeded }, 
   { title: "前标", status: CheckedStatus.succeeded }, 
  ],
  right: [
   { title: "右前车轮", status: CheckedStatus.succeeded }, 
   { title: "右后车轮", status: CheckedStatus.succeeded }, 
   { title: "右前车窗", status: CheckedStatus.succeeded }, 
   { title: "右后车窗", status: CheckedStatus.succeeded }, 
   { title: "右前车门", status: CheckedStatus.succeeded }, 
   { title: "右后车门", status: CheckedStatus.succeeded }, 
   { title: "右后视镜", status: CheckedStatus.succeeded }, 
  ],
  left: [
   { title: "左前车轮", status: CheckedStatus.succeeded }, 
   { title: "左后车轮", status: CheckedStatus.succeeded }, 
   { title: "左前车窗", status: CheckedStatus.succeeded }, 
   { title: "左后车窗", status: CheckedStatus.succeeded }, 
   { title: "左前车门", status: CheckedStatus.succeeded }, 
   { title: "左后车门", status: CheckedStatus.succeeded }, 
   { title: "左后视镜", status: CheckedStatus.succeeded }, 
  ],
  top: [
   { title: "天窗", status: CheckedStatus.succeeded }, 
   { title: "行李架", status: CheckedStatus.succeeded }, 
   { title: "鲨鱼鳍", status: CheckedStatus.succeeded }, 
  ],
  footer: [
   { title: "车尾灯", status: CheckedStatus.succeeded }, 
   { title: "车尾标", status: CheckedStatus.succeeded }, 
   { title: "后保", status: CheckedStatus.succeeded }, 
   { title: "尾箱标牌", status: CheckedStatus.succeeded }, 
   { title: "扰流板", status: CheckedStatus.succeeded }, 
  ],
}




</script>

<template>
  <div class="home-pg">
    <Header class="home-header"/>
    <div class="home-body">
      <div class="home-column home-left">
        <img :src="stationStatusTitleUri" class="home-column-title" />

        <div class="home-column-body">

          <div class="hl-info">
            <div class="hl-info-item">
              <img class="hl-info-icon" :src="carIconUri" />
              <div class="hl-info-right">
                <div class="hl-info-right-top">CX765-2</div>
                <div class="hl-info-right-bottom">当前检测车型</div>
              </div>
            </div>
            <div class="hl-info-item">
              <img class="hl-info-icon" :src="vinIconUri" />
              <div class="hl-info-right">
                <div class="hl-info-right-top">2890103734933565</div>
                <div class="hl-info-right-bottom">车辆VIN号</div>
              </div>
            </div>
          </div>

          <div class="hl-result">
            <span class="hl-result-text">检查通过</span>
          </div>

          <div class="hl-display">
            <ElRow :gutter="116" class="hl-result-row">
              <ElCol :span="8" class="hl-result-column">
                <ResultList title="车头检测" :items="checkItems.head" class="hl-result-item"/>
                <div class="hl-result-spacer" />
                <ResultList title="左侧检测" :items="checkItems.left" class="hl-result-item"/>
              </ElCol>
              <ElCol :span="8" class="hl-result-column-relative">
                <ResultList title="车顶检测" :items="checkItems.top" class="hl-result-center-bottom"/>
              </ElCol>
              <ElCol :span="8" class="hl-result-column">
                <ResultList title="右侧检测" :items="checkItems.right" class="hl-result-item"/>
                <div class="hl-result-spacer" />
                <ResultList title="车尾检测" :items="checkItems.footer" class="hl-result-item"/>
              </ElCol>
            </ElRow>

          </div>
        </div>
      </div>
      <div class="home-spacer"></div>
      <div class="home-column home-right">
        <img :src="taskStatusTitleUri" class="home-column-title" />

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

    &-body {
      width: 100%;
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
      
      background-image: url("../../assets/images/measure/column-bg.png");
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

    &-result {
      margin-top: 41px;
      margin-bottom: 31px;
      background-image: url("../../assets/images/measure/passed-result-bg.png");
      background-size: 100% 100%;
      height: 60px;

      display: flex;
      justify-content: center;
      align-items: center;

      &-text {
        color: white;
        font-size: 30px;
        letter-spacing: 10.38px;
        font-weight: 600;
        background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#E0BF9B ));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    &-display {
      flex: 1;

      background-image: url("../../assets/images/measure/passed-car.png");
      background-size: calc(100% - (100% - 232px) / 3 * 2) 61.5%;
      background-position: top center;
      background-repeat: no-repeat;

      position: relative;
    }

    &-result {
      &-row {
        height: calc(100% - 70px);
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
        height: calc(50% - 28px);
        flex: none;
      }

      &-center-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }

}
</style>
