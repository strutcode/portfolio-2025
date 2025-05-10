<template>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="name">
          <div class="logo" v-html="logo"></div>
          <a href="#" @click="closeMenu">Tristan Shelton</a>
        </div>

        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

        <nav :class="{ active: isMenuOpen }">
          <ul>
            <li><a href="#about" @click="closeMenu">About</a></li>
            <li><a href="#projects" @click="closeMenu">Projects</a></li>
            <li><a href="#skills" @click="closeMenu">Skills</a></li>
            <li><a href="#contact" @click="closeMenu">Contact</a></li>
            <li>
              <button class="theme-toggle" @click="emit('toggleTheme')" aria-label="Toggle theme">
                <span v-if="isDarkTheme" class="theme-icon">☀️</span>
                <span v-else class="theme-icon">🌙</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import logo from '../assets/logo.svg?raw'

  defineProps<{
    isDarkTheme: boolean
  }>()

  const emit = defineEmits(['toggleTheme'])

  const isMenuOpen = ref(false)

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }
</script>

<style scoped>
  header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--background-color);
    box-shadow: 0 1px 3px var(--shadow-color);
    padding: 1rem 0;
    transition: all 0.3s ease;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 1rem;
    color: var(--text-color);
  }

  ::v-deep(.logo svg) {
    width: 2.4rem;
    height: 2.4rem;
  }

  .name a {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
    text-decoration: none;
  }

  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
  }

  nav li {
    margin: 0 1rem;
  }

  nav a {
    color: var(--text-color);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  nav a:hover {
    color: var(--primary-color);
  }

  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle:hover {
    background-color: var(--background-alt-color);
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .bar {
    width: 25px;
    height: 3px;
    background-color: var(--text-color);
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
    }

    nav {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      background-color: var(--background-color);
      box-shadow: 0 4px 6px var(--shadow-color);
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    nav.active {
      max-height: 300px;
    }

    nav ul {
      flex-direction: column;
      padding: 1rem 0;
    }

    nav li {
      margin: 0.5rem 0;
    }
  }
</style>
