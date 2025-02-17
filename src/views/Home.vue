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
    width: 100vw;
    height: 100vh;
    margin: 0 -4rem;
    background-color: rgb(13, 17, 28);
  }

  .content {
    position: relative;
    z-index: +1;
  }
</style>
