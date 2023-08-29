<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from "vue"
import carImgUri from "@/assets/images/inspect/car-bg.png"

const canvasRef = ref<HTMLCanvasElement>()
const containerRef = ref<HTMLDivElement>()
const carScaleRef = ref(1)
const size = reactive({ width: 0, height: 0 })
const carImageData = reactive<{
  width: number
  height: number
  data: any
}>({
  width: 0,
  height: 0,
  data: null
})
type PositionData = {
  left: number
  top: number
}
type LineData = {
  start: PositionData
  turning: PositionData
  stop: PositionData
}

onMounted(() => {
  window.addEventListener("resize", onSizeChange)

  window.addEventListener("load", onSizeChange)
  setTimeout(onSizeChange , 500)
})
onUnmounted(() => {
  window.removeEventListener("resize", onSizeChange)
})

function createIamge() {
  if (!carImageData.data) {
    const carImg = new Image()
    carImg.src = carImgUri
    carImg.onload = function (e) {
      // @ts-ignore
      carImageData.width = e.target.width
      // @ts-ignore
      carImageData.height = e.target.height
      carImageData.data = this
      carScaleRef.value = Math.min(Math.min(carImageData.height, size.height)/carImageData.height, Math.min(carImageData.width, size.width)/carImageData.width)

      createLines()
    }

    return
  }
  carScaleRef.value = Math.min(Math.min(carImageData.height, size.height)/carImageData.height, Math.min(carImageData.width, size.width)/carImageData.width)

  createLines()
}

function createLines() {
  // @ts-ignore
  const canvas: CanvasRenderingContext2D = canvasRef.value!.getContext("2d")
  canvas.clearRect(0, 0, size.width, size.height)
  canvas.drawImage(carImageData.data, (size.width - carImageData.width * carScaleRef.value ) / 2 , 0, carImageData.width * carScaleRef.value, carImageData.height * carScaleRef.value)

  const {
    leftTopLineData,
    leftBottomLineData,
    centerBottomLineData,
    rightTopLineData,
    rightBottomLineData,
  } = getLineData()

  createGauideLine(canvas, leftTopLineData)
  createGauideLine(canvas, leftBottomLineData)
  createGauideLine(canvas, centerBottomLineData)
  createGauideLine(canvas, rightTopLineData)
  createGauideLine(canvas, rightBottomLineData)
}

function createGauideLine(canvas: CanvasRenderingContext2D, data: LineData) {
  canvas.beginPath()
  canvas.moveTo(data.start.left, data.start.top,)
  canvas.lineTo(data.turning.left, data.turning.top,)
  canvas.lineTo(data.stop.left, data.stop.top,)
  canvas.strokeStyle = "#01A6EE"
  canvas.lineWidth = 2
  canvas.stroke()
  canvas.closePath()

  canvas.beginPath()
  // 绘制开始的端点
  canvas.arc(data.start.left, data.start.top, 8, 0, Math.PI * 2)
  canvas.fillStyle = "#01A6EE"
  canvas.fill()
  canvas.closePath()
  canvas.beginPath()
  canvas.arc(data.start.left, data.start.top, 4, 0, Math.PI * 2)
  canvas.fillStyle = "#fff"
  canvas.fill()
  canvas.closePath()
}

function getLineData() {
  const bottomTop = Math.max(size.height - 50 * carScaleRef.value, 340 * carScaleRef.value)

  const leftTopLineData = {
    start: {
      left: size.width / 2 - 120 * carScaleRef.value,
      top: 68 * carScaleRef.value,
    },
    turning: {
      left: 38 * carScaleRef.value,
      top: 36 * carScaleRef.value,
    },
    stop: {
      left: 0,
      top: 36 * carScaleRef.value,
    },
  }
  const leftBottomLineData = {
    start: {
      left: size.width / 2 - 60 * carScaleRef.value,
      top: 206 * carScaleRef.value,
    },
    turning: {
      left: 38 * carScaleRef.value,
      top: bottomTop,
    },
    stop: {
      left: 0,
      top: bottomTop,
    },
  }
  const centerBottomLineData = {
    start: {
      left: size.width / 2,
      top: 190 * carScaleRef.value,
    },
    turning: {
      left: size.width / 2,
      top: 200 * carScaleRef.value,
    },
    stop: {
      left: size.width / 2,
      top: size.height,
    },
  }

  const rightTopLineData = {
    start: {
      left: size.width / 2 + 30 * carScaleRef.value,
      top: 117 * carScaleRef.value,
    },
    turning: {
      left: size.width - 38 * carScaleRef.value,
      top: 36 * carScaleRef.value,
    },
    stop: {
      left: size.width,
      top: 36 * carScaleRef.value,
    },
  }
  const rightBottomLineData = {
    start: {
      left: size.width / 2 + 86 * carScaleRef.value,
      top: 270 * carScaleRef.value,
    },
    turning: {
      left: size.width / 2 + 140 * carScaleRef.value,
      top: bottomTop,
    },
    stop: {
      left: size.width,
      top: bottomTop,
    },
  }

  return {
    leftTopLineData,
    leftBottomLineData,
    centerBottomLineData,
    rightTopLineData,
    rightBottomLineData,
  }
}

function onSizeChange() {
  size.width = containerRef.value!.clientWidth
  size.height = containerRef.value!.clientHeight
  canvasRef.value?.setAttribute("width", size.width + "px")
  canvasRef.value?.setAttribute("height", size.height + "px")

  createIamge()
}

</script>
<template>
  <div ref="containerRef">
    <canvas ref="canvasRef" />
  </div>
</template>