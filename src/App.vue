<template>
  <Navigation :isDarkTheme="isDarkTheme" @toggleTheme="toggleTheme" />
  <Background />
  <HeroScene />
  <Projects />
  <About />
  <Skills />
  <Contact />
  <Footer />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import Navigation from './components/Navigation.vue'
  import HeroScene from './raytracing/HeroScene.vue'
  import About from './components/sections/About.vue'
  import Background from './background/Background.vue'
  import Skills from './components/sections/Skills.vue'
  import Contact from './components/sections/Contact.vue'
  import Footer from './components/Footer.vue'
  import Projects from './components/sections/Projects.vue'

  const isDarkTheme = ref(false)

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
    document.documentElement.classList.toggle('dark-theme')
  }
</script>
