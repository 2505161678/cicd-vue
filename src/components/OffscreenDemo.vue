<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvasRef.value) return
  
  // 检查浏览器是否支持 OffscreenCanvas
  if ('OffscreenCanvas' in window) {
    // 创建 OffscreenCanvas
    const offscreen = canvasRef.value.transferControlToOffscreen()
    
    // 创建 Worker
    const worker = new Worker(
      new URL('../workers/canvas.worker.ts', import.meta.url),
      { type: 'module' }
    )

    // 将 OffscreenCanvas 传递给 Worker
    worker.postMessage({ canvas: offscreen }, [offscreen])

     // 监听 Worker 的消息
     worker.onmessage = function(evt) {
      console.log('Received message from worker:', evt.data)
      // 在这里处理从 Worker 发来的消息
    }
  } else {
    console.log('你的浏览器不支持 OffscreenCanvas')
  }
})
</script>

<template>
  <div class="canvas-container">
    <canvas ref="canvasRef" width="400" height="400"></canvas>
  </div>
</template>

<style scoped>
.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

canvas {
  border: 1px solid #ccc;
  background: #fff;
}
</style>