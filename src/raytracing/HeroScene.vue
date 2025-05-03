<template>
  <div ref="output" class="scene">
    <HeroContent />

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <defs>
        <clipPath id="hero-clip-path" clipPathUnits="objectBoundingBox">
          <path
            d="M82.14%,77.36%C75.56%,60%,68.65%,25.83%,62.82%,11.83%c-6.85%-14.46%-14%-13.63%-20.81%,0.33%-4.79%,9.8%-9.5%,25.96%-14.33%,35.05%A50.02%,50.02%,0,0,1,0%,22.79%V100%H100%V79.83%C94.35%,99.1%,87.98%,92.76%,82.14%,77.36%Z"
          />
        </clipPath>
      </defs>
      <path
        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
      />
    </svg>
  </div>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
  import RayTracer from './RayTracer'
  import HeroContent from '../components/sections/HeroContent.vue'

  const output = useTemplateRef('output')

  onMounted(() => {
    const scene = new RayTracer(output.value)

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
    /* clip-path: url(#hero-clip-path); */
    /* clip-path: path(
      'M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
    ); */
    /* clip-path: circle(40%); */
    /* clip-path: path('M0,0 L500 0 L500 500 L0 500 Z'); */
  }
</style>
