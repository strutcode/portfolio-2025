<template>
  <SpotLights />
  <div class="body">
    <Home />
    <About />
    <Portfolio />
    <Contact />
  </div>
  <Navigation />
  <img class="logo" src="@/assets/logo.svg" alt="Logo" />
</template>

<script setup lang="ts">
  import Navigation from './components/Navigation.vue'
  import SpotLights from './components/SpotLights.vue'

  import Home from './views/Home.vue'
  import About from './views/About.vue'
  import Portfolio from './views/Portfolio.vue'
  import Contact from './views/Contact.vue'
</script>

<style scoped>
  .body {
    margin: 0 4rem;
  }

  .logo {
    position: fixed;
    top: 4rem;
    left: 4rem;
    height: 6rem;
    z-index: 1;
    filter: drop-shadow(0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 1));
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.18s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
