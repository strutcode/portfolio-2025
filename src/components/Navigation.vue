<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/portfolio">Portfolio</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>

    <button @click="toggleDarkMode">{{ lightDarkLabel }}</button>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import lightDark from '@/util/lightDarkMode'

  const getLightDarkLabel = () => {
    return lightDark.isDarkMode ? 'Light Mode' : 'Dark Mode'
  }

  const lightDarkLabel = ref(getLightDarkLabel())

  const toggleDarkMode = () => {
    lightDark.toggle()
    lightDarkLabel.value = getLightDarkLabel()
  }
</script>

<style scoped>
  nav {
    position: fixed;
    top: 20%;
    right: 1rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    padding: 2rem;
    box-shadow: 0 0 2vh 2vh rgba(0, 0, 0, 0.4);
    background: rgba(0, 0, 0, 0.4);
    text-shadow:
      0.1rem 0 #000,
      -0.1rem 0 #000,
      0 0.1rem #000,
      0 -0.1rem #000;

    img {
      height: 70px;
    }
  }

  :deep(a) {
    font-size: 2rem;
    color: #ccc;
    text-decoration: none;
  }

  :deep(a:hover) {
    text-decoration: underline;
  }
</style>
