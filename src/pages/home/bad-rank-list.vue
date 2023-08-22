<script setup lang="ts">
import { ElTable, ElTableColumn } from "element-plus"
import { storeToRefs } from "pinia";

import { useInspectStore } from "@/store/modules/inspect"

const { badRankProblems } = storeToRefs(useInspectStore())

</script>
<template>
  <div class="bad-rank-com">
    <div class="br-title">不良问题排行</div>
    <ElTable class="br-list" row-class-name="br-row" border :data="badRankProblems" height="calc(100vh - 689px)">
      <ElTableColumn prop="index" label="排行" width="100" class-name="br-first"></ElTableColumn>
      <ElTableColumn prop="title" label="问题描述"></ElTableColumn>
      <ElTableColumn prop="count" label="次数" width="100" class-name="br-last"></ElTableColumn>
    </ElTable>
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
    }
  }
}

:deep(.el-table) {
  width: auto;
  background: transparent;
  --el-border-color-lighter: #0D5ABB;
  --el-table-row-hover-bg-color: #0D5ABB;

  .cell {
    font-size: 26px;
    line-height: 36px;

    color: #fff;
  }

  tr {
    &:nth-last-of-type(2n) {
      background-color: #183471;
    }
    &:nth-last-of-type(2n+1) {
      background-color: #172651;
    }

    
  }

  tbody tr {
    &:nth-of-type(1) .br-first .cell {
      color: #C2721C;
    }

    &:nth-of-type(2) .br-first .cell {
      color: #E3E54E;
    }

    &:nth-of-type(3) .br-first .cell {
      color: #4FE4CA;
    }
  }

  .br-first .cell {
    color: #39A9FE;
  }
  .br-first, .br-last {
    text-align: center;
  }

  th.el-table__cell {
    background: #1C427E;
    color: #80AEFF;
    font-weight: 600;
    
    padding: 6px 0;
  }
}
</style>