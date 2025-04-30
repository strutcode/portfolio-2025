<template>
  <Background />
  <HeroScene />
  <div class="wrapper">
    <GlassCard>
      <h2>Sample title</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </GlassCard>
  </div>
</template>

<script setup lang="ts">
  import HeroScene from './raytracing/HeroScene.vue'
  import GlassCard from './components/GlassCard.vue'
  import Background from './background/Background.vue'
</script>

<style scoped>
  .wrapper {
    max-width: 1200px;
    margin: 5rem auto;
  }
</style>
