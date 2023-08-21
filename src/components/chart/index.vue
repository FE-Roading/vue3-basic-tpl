<script lang="ts" setup>
  import { ref, watch, onMounted, onUnmounted } from "vue"
  import * as echarts from "echarts"

  // eslint-disable-next-line
  type IndexProps = {
    options: any   // echart options 主要类型校验问题，因此直接写入any

    initCb?: (echarts, instace: echarts.ECharts) => void
  }

  const props = defineProps<IndexProps>()
  const chartDomRef = ref<HTMLElement>()
	const resizeTimer = ref<NodeJS.Timeout>()
	const echartInstance = ref<echarts.ECharts>()

  function resizeHandler() {
    if (resizeTimer.value) return

    resizeTimer.value = setTimeout(() => {
      if (echartInstance.value) {
        echartInstance.value.resize()
      }

      resizeTimer.value = null
    }, 500)
  } 

  onMounted(() => {
    const _echartInstance = echarts.init(chartDomRef.value!)
    echartInstance.value = _echartInstance
    props.initCb?.(echarts, _echartInstance)

    _echartInstance.setOption(props.options)

    window.addEventListener("resize", resizeHandler)
  })

  onUnmounted(() => {
    if (resizeTimer.value) {
      clearTimeout(resizeTimer.value)
    }

    window.removeEventListener("resize", resizeHandler)
  })

  watch(() => props.options, (options) => {
    echartInstance.value?.setOption(options)
  })

</script>
<template>
  <div ref="chartDomRef" class="com-chart-dom">
  </div>
</template>
<style lang="scss">
  .com-chart-dom {
  }
</style>
