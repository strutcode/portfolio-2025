<template>
  <Navigation :isDarkTheme="isDarkTheme" @toggleTheme="toggleTheme" />
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
  <About />
  <Footer />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import HeroScene from './raytracing/HeroScene.vue'
  import GlassCard from './components/GlassCard.vue'
  import About from './components/sections/About.vue'
  import Background from './background/Background.vue'
  import Navigation from './components/Navigation.vue'
  import Footer from './components/Footer.vue'

  const isDarkTheme = ref(false)

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
    document.documentElement.classList.toggle('dark-theme')
  }
</script>

<style scoped>
  .wrapper {
    max-width: 1200px;
    margin: 5rem auto;
  }
</style>
