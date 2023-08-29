<script setup lang="ts">
import Chart from "@/components/chart/index.vue"
import genPassRateOptions from "./options/passRate"
import genFttPassRateOptions from "./options/fttPassRate"

const passRateOptions = genPassRateOptions(75, 100)
const fttPassedCount = 7
const fttTotoalCount = 89
const fttPassRateOptions = genFttPassRateOptions(fttPassedCount, fttTotoalCount)

</script>
<template>
  <div class="rate-list-com">
    <div class="rl-item">
      <Chart class="rl-item-chart" :options="passRateOptions"></Chart>
      <div class="rl-item-right">
        <div class="rl-item-title">完成率</div>
        <div class="rl-item-value">
          <span>完成率</span>
          <span class="rl-item-count">75%</span>
        </div>
      </div>
    </div>
    <div class="rl-item">
      <Chart class="rl-item-chart" :options="fttPassRateOptions"></Chart>
      <div class="rl-item-right">
        <div class="rl-item-title">FTT通过率</div>
        <div class="rl-item-value">
          <div>未通过车辆<span class="rl-item-count rl-item-count-bad">{{ fttPassedCount }}</span>辆</div>
          <div style="margin-top: 4px;"><span style="letter-spacing: 6.2px;">问题数量</span><span class="rl-item-count rl-item-count-pass">{{ fttTotoalCount }}</span>个</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .rate-list-com {
    display: flex;


    .rl {
      &-item {
        flex-basis: 50%;
        display: flex;
        flex-wrap: nowrap;

        &-chart {
          width: 0.8rem;
          height: 0.8rem;
        }

        &-right {
          margin-left: 24px;
        }

        &-title {
          font-size: 26px;
          color: #FFFFFF;
          font-weight: 600;
        }

        &-value {
          margin-top: 4px;

          opacity: 0.7;
          font-size: 24px;
          color: #FFFFFF;
          line-height: 36px;
        }

        &-count {
          display: inline-block;
          width: 40px;
          text-align: center;
          font-weight: 700;
          font-family: "DIN";

          &-bad {
            color: #c80a17;
          }
          &-pass {
            color: #01A6EE;
          }
        }
      }
    }
  }
</style>