<template>
  <div class="background" ref="element"></div>
</template>

<script setup lang="ts">
  import { useTemplateRef, onMounted, onBeforeUnmount } from 'vue'
  import BackgroundRenderer from './BackgroundRenderer'

  const element = useTemplateRef('element')

  onMounted(() => {
    const scene = new BackgroundRenderer(element.value!, 1.0)

    onBeforeUnmount(() => {
      scene.destroy()
    })
  })
</script>

<style scoped>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
    opacity: var(--background-opacity);
  }

  .background canvas {
    width: 100%;
    height: 100%;
    /* filter: blur(8px); */
  }
</style>
