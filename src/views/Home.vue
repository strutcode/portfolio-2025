<template>
  <div>
    <canvas ref="canvas"></canvas>
    <div class="content">
      <!-- <h1>Building Awesome Stuff</h1> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, useTemplateRef } from 'vue'
  import HomeScene from '../babylon/scenes/home/HomeScene'

  const canvas = useTemplateRef('canvas')
  let scene: any = null

  onMounted(() => {
    if (!canvas.value) return

    scene = new HomeScene(canvas.value)
  })

  onUnmounted(() => {
    // Cleanup
    if (scene) {
      scene.dispose()
    }
  })
</script>

<style scoped>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .content {
    position: relative;
    z-index: +1;
  }
</style>
