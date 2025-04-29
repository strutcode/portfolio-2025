<template>
  <div class="background" ref="element"></div>
</template>

<script setup lang="ts">
  import { useTemplateRef, onMounted, onBeforeUnmount } from 'vue'
  import BackgroundRenderer from './BackgroundRenderer'

  const element = useTemplateRef('element')

  onMounted(() => {
    const scene = new BackgroundRenderer(element.value)

    onBeforeUnmount(() => {
      scene.destroy()
    })
  })
</script>
