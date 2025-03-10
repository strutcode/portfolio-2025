<template>
  <div>
    <canvas ref="canvas"></canvas>
    <div class="fadeOut"></div>
    <div class="content">
      <div class="catchline" v-split="catchlineSplitSettings" @click="resetAnimation">
        If you want to make an <span class="big">impact</span> you need<br /><span class="big"
          >talent</span
        >
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

  const catchlineSplitSettings = {
    className: 'print',
    iterate: (el: HTMLElement, i: number) => {
      const t = 0.03
      // Delay each character by `t` compared to the last using its index
      el.style.animationDelay = `${i * t}s`
    },
  }

  const resetAnimation = (ev: MouseEvent) => {
    // This function is manually assigned so we can cast safely
    const catchline = ev.target as HTMLElement

    // Remove the class to clear animation state
    catchline.classList.remove('catchline')

    // Force a recalculation of styles or this will have no effect
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    void catchline.offsetWidth

    // Re-add the class to restart the animation
    catchline.classList.add('catchline')
  }

  onMounted(() => {
    if (!canvas.value) throw new Error('Canvas not found')

    // Set up the 3D scene
    scene = new HomeScene(canvas.value)
  })

  onUnmounted(() => {
    // Cleanup
    if (scene) scene.dispose()
  })
</script>

<style scoped>
  canvas {
    position: relative;
    width: 100vw;
    height: 110vh;
    margin: 0 -4rem;
    background-color: rgb(13, 17, 28);
  }

  .fadeOut {
    position: absolute;
    top: 100vh;
    left: 0;
    width: 100vw;
    height: 10vh;
    background: linear-gradient(transparent, rgb(13, 17, 28));
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
    font-size: 4.5vh;
    color: #eee;
    text-align: left;
    font-weight: 300;
    text-transform: uppercase;
    text-shadow:
      0.25rem 0 0.25rem rgba(0, 0, 0, 0.5),
      -0.25rem 0 0.25rem rgba(0, 0, 0, 0.5),
      0 0.25rem 0.25rem rgba(0, 0, 0, 0.5),
      0 -0.25rem 0.25rem rgba(0, 0, 0, 0.5);
    counter-reset: delay;

    .print {
      position: relative;
      top: 2vh;
      left: 2vh;
      opacity: 0;
      animation-name: catchline-in;
      animation-duration: 0.1s;
      animation-fill-mode: forwards;
    }

    .big {
      font-size: 6vh;
      color: #fff;
      font-weight: 400;
    }
  }

  @keyframes catchline-in {
    from {
      top: 2vh;
      left: 2vh;
      opacity: 0;
    }
    to {
      top: 0;
      left: 0;
      opacity: 1;
    }
  }
</style>
