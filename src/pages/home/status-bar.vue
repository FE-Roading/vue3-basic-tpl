<script setup lang="ts">
import { computed } from 'vue';

type IndexProps = {
  pending: boolean
  finished: boolean
  failed: boolean
}

const props = withDefaults(defineProps<IndexProps>(), {
  pending: true,
  finished: false,
  failed: false,
})

const placeholder = computed(() => props.pending ? "等待检测" : props.finished ? "检测通过" : props.failed ? "检测失败" : "正在检测")

</script>
<template>
  <div :class="['status-bar-com', { 'status-bar-com-pending': pending, 'status-bar-com-finished': finished, 'status-bar-com-failed': failed, }]">
    <span class="sb-text">{{ placeholder }}</span>
  </div>
</template>
<style lang="scss" scoped>
  .status-bar-com {
    margin-top: 41px;
    margin-bottom: 31px;
    height: 60px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url("../../assets/images/inspect/status-inspecting-bg.png");
    background-size: 100% 100%;

    .sb-text {
      color: white;
      font-size: 30px;
      letter-spacing: 10.38px;
      font-weight: 600;
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#E0BF9B ));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &-pending {
      background-image: url("../../assets/images/inspect/status-pending-bg.png");

      .sb-text {
        color: #AAA;
        background-image: none;
        -webkit-text-fill-color: #AAA;
      }
    }

    &-finished {
      background-image: url("../../assets/images/inspect/status-succeeded-bg.png");

      .sb-text {
        color: #02C825;
        background-image: none;
        -webkit-text-fill-color: #02C825;
      }
    }

    &-failed {
      background-image: url("../../assets/images/inspect/status-failed-bg.png");

      .sb-text {
        color: #FF2828;
        background-image: none;
        -webkit-text-fill-color: #FF2828;
      }
    }
  }
</style>