<template>
  <div ref="output" class="scene">
    <slot />
  </div>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
  import RayTracer from './RayTracer'

  const output = useTemplateRef('output')

  onMounted(() => {
    const scene = new RayTracer(output.value)

    onBeforeUnmount(() => {
      scene.destroy()
    })
  })
</script>

<style scoped>
  .scene {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #000;
    overflow: hidden;
  }
</style>
