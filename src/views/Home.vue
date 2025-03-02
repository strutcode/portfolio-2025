<template>
  <div>
    <canvas ref="canvas"></canvas>
    <div class="content">
      <div class="catchline">
        To make a big <span class="big">impact</span> you need<br /><span class="big">talent</span>
        that can keep pace with your vision
      </div>
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .catchline {
    position: absolute;
    top: 70%;
    left: 50%;
    width: 70%;
    transform: translate(-50%, -50%);
    font-size: 5vh;
    color: #eee;
    text-align: left;
    font-weight: 300;
    text-shadow:
      0.25rem 0 0.25rem rgba(0, 0, 0, 0.25),
      -0.25rem 0 0.25rem rgba(0, 0, 0, 0.25),
      0 0.25rem 0.25rem rgba(0, 0, 0, 0.25),
      0 -0.25rem 0.25rem rgba(0, 0, 0, 0.25);

    .big {
      font-size: 6vh;
      color: #fff;
      font-weight: 400;
    }
  }
</style>
