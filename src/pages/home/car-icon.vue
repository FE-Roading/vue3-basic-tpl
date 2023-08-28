<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from "vue"
import carImgUri from "@/assets/images/inspect/car-bg.png"

const canvasRef = ref<HTMLCanvasElement>()
const containerRef = ref<HTMLDivElement>()
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

      createLines()
    }

    return
  }

  createLines()
}

function createLines() {
  const canvas: CanvasRenderingContext2D = canvasRef.value!.getContext("2d")
  canvas.drawImage(carImageData.data, (size.width - carImageData.width) / 2, 0)

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
  console.log(size.height, size.width)
  const leftTopLineData = {
    start: {
      left: size.width / 2 - 120,
      top: 68,
    },
    turning: {
      left: 38,
      top: 36,
    },
    stop: {
      left: 0,
      top: 36,
    },
  }
  const leftBottomLineData = {
    start: {
      left: size.width / 2 - 60,
      top: 206,
    },
    turning: {
      left: 38,
      top: size.height - 50,
    },
    stop: {
      left: 0,
      top: size.height - 50,
    },
  }
  const centerBottomLineData = {
    start: {
      left: size.width / 2,
      top: 190,
    },
    turning: {
      left: size.width / 2,
      top: size.height * 0.6,
    },
    stop: {
      left: size.width / 2,
      top: size.height,
    },
  }

  const rightTopLineData = {
    start: {
      left: size.width / 2 + 30,
      top: 117,
    },
    turning: {
      left: size.width - 38,
      top: 36,
    },
    stop: {
      left: size.width,
      top: 36,
    },
  }
  const rightBottomLineData = {
    start: {
      left: size.width / 2 + 86,
      top: 270,
    },
    turning: {
      left: size.width / 2 + 140,
      top: size.height - 50,
    },
    stop: {
      left: size.width,
      top: size.height - 50,
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