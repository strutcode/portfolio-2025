<template>
  <Navigation :isDarkTheme="isDarkTheme" @toggleTheme="toggleTheme" />
  <Background />
  <HeroScene />
  <About />
  <Experience class="stripe" />
  <Projects />
  <Skills class="stripe" />
  <Contact />
  <Footer />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import Navigation from './components/Navigation.vue'
  import HeroScene from './components/sections/HeroSection.vue'
  import Projects from './components/sections/Projects.vue'
  import Experience from './components/sections/Experience.vue'
  import About from './components/sections/About.vue'
  import Background from './background/Background.vue'
  import Skills from './components/sections/Skills.vue'
  import Contact from './components/sections/Contact.vue'
  import Footer from './components/Footer.vue'

  // Check if the user has a preference for dark mode
  function getDarkModePreference() {
    const userTheme = localStorage.getItem('theme')
    if (userTheme === 'dark') return true
    if (userTheme === 'light') return false

    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    console.log('User prefers dark mode:', userPrefersDark)
    return userPrefersDark
  }

  // Set the initial theme based on user preference
  const isDarkTheme = ref(getDarkModePreference())

  // Apply the theme to the document
  const applyTheme = () => {
    if (isDarkTheme.value) {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }
  }

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
    applyTheme()
    localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
  }

  // Set the initial state of the theme
  applyTheme()
</script>
