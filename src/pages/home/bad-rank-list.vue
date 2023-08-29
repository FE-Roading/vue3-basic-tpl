<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll"

import { useInspectStore } from "@/store/modules/inspect"

const { badRankProblems } = storeToRefs(useInspectStore())

</script>
<template>
  <div class="bad-rank-com">
    <div class="br-title">不良问题排行</div>
    <ul class="br-row br-head">
      <li class="br-column1">排行</li>
      <li class="br-column2">问题描述</li>
      <li class="br-column3">次数</li>
    </ul>
    <vue3-seamless-scroll :list="badRankProblems" class="br-list" :limitScrollNum="10" :delay="3000" :singleWaitTime="3000" :singleHeight="52" hover wheel>
      <ul class="br-row" v-for="(item, index) in badRankProblems" :key="index" style="height: 52px;line-height: 50px;">
        <li class="br-column1">{{ item.index }}</li>
        <li class="br-column2">{{ item.title }}</li>
        <li class="br-column3">{{ item.count }}</li>
      </ul>
    </vue3-seamless-scroll>
  </div>
</template>
<style lang="scss" scoped>
.bad-rank-com {
  display: flex;
  flex-direction: column;

  .br {
    &-title {
      margin-top: 58px;
      margin-bottom: 12px;
      flex: none;

      font-size: 26px;
      color: #01A7F0;
      font-weight: 600;
    }

    &-list {
      height: 0;
      min-height: 0;
      flex: 1;
      overflow: hidden;

      .br-row {
        &:nth-last-of-type(2n) {
          background-color: #183471;
        }
        &:nth-last-of-type(2n+1) {
          background-color: #172651;
        }

        &:nth-of-type(1) .br-column1{
          color: #C2721C!important;
        }
        &:nth-of-type(2) .br-column1 {
          color: #E3E54E!important;
        }
        &:nth-of-type(3) .br-column1 {
          color: #4FE4CA!important;
        }
      }
    }

    &-row {
      display: flex;
      flex-wrap: nowrap;
      background-color: #0D5ABB;
      border: 1px solid #0D5ABB;
      font-size: 24px;
      color: #fff;

      > * {
        height: 50px;
      }
    }

    &-head {
      background: #183471;
      color: #80AEFF;
      font-weight: 600;
      position: relative;
      z-index: 10;

      flex: none;
    }

    &-column1, &-column3 {
      flex: none;
      width: 100px;
      text-align: center;
      font-family: "DIN";
    }

    &-column2 {
      flex: 1;
      border-left: 1px solid #0D5ABB;
      border-right: 1px solid #0D5ABB;

      padding-left: 20px;
    }

    &-column1 {
      color: #39A9FE;
    }
  }
}

</style>