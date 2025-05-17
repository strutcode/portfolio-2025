<template>
  <div ref="output" class="scene">
    <!-- <HeroContent /> -->

    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="hero-clip-path" clipPathUnits="objectBoundingBox">
          <path
            d="M0 0 L0 0.95 C0.3 1.01,0.35 0.93,0.55 0.93 C0.77 0.93, 0.88 1.01, 1 0.98 L 1 0 Z"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
  import HeroScene from '../../hero/HeroScene'
  import HeroContent from './HeroContent.vue'

  const output = useTemplateRef('output')

  onMounted(() => {
    const scene = new HeroScene(output.value)

    // Only render when the element is in view to save resources
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scene.resume()
          } else {
            scene.pause()
          }
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(scene.element)

    onBeforeUnmount(() => {
      scene.destroy()
    })
  })
</script>

<style scoped>
  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 10vh;
    pointer-events: none;
  }

  .scene {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #000;
    overflow: hidden;
    clip-path: url(#hero-clip-path);
  }

  .scene canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
