<template>
  <img class="logo" src="@/assets/logo.svg" alt="Logo" />
  <Navigation />
  <div class="body">
    <Home />
    <About />
    <Portfolio />
    <Contact />
  </div>
</template>

<script setup lang="ts">
  import Navigation from './components/Navigation.vue'
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
