<template>
  <div class="backgroundEffect">
    <div class="spotlight redLight" :style="styles.redLight"></div>
    <div class="spotlight purpleLight" :style="styles.purpleLight"></div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  const styles = ref({
    redLight: {
      top: '50%',
      left: '50%',
    },
    purpleLight: {
      top: '50%',
      left: '50%',
    },
  })

  const updateLightPosition = (ev: MouseEvent) => {
    const { clientX, clientY } = ev
    const { innerWidth, innerHeight } = window

    styles.value.redLight = {
      top: `${clientY}px`,
      left: `${clientX}px`,
    }
    styles.value.purpleLight = {
      top: `${innerHeight - clientY}px`,
      left: `${innerWidth - clientX}px`,
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', updateLightPosition)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', updateLightPosition)
  })
</script>

<style scoped>
  .backgroundEffect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }

  .spotlight {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
    transform: translate(-50%, -50%);
  }

  .redLight {
    background: radial-gradient(circle, rgba(192, 0, 64, 0.2), rgba(255, 0, 0, 0) 66%);
  }

  .purpleLight {
    background: radial-gradient(circle, rgba(128, 0, 128, 0.2), rgba(128, 0, 128, 0) 66%);
  }
</style>
