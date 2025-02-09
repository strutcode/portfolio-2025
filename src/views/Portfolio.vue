<template>
  <div>
    <nav>
      <RouterLink to="/">Past Work</RouterLink>
      <RouterLink to="/">Side Projects</RouterLink>
    </nav>

    <div class="carousel">
      <div v-for="img in entries" class="slide">
        <div class="preview">
          <img :src="img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // Dynamically import all view components
  const modules = import.meta.glob('../assets/portfolio/*.(jpg|png)', { eager: true })

  const entries = ref(
    Object.keys(modules)
      .map((filepath) => {
        const isImage = !!filepath.match(/\.(png|jpg)$/)

        return isImage ? modules[filepath].default : undefined
      })
      .filter((v) => v),
  )
</script>

<style scoped>
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    border: thin solid rgba(87, 203, 215, 0.25);
    border-width: 4px 0;
    padding: 2rem 0;
  }

  .slide {
    flex: 0 0 220px;
    height: 300px;
    scroll-snap-align: start;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    margin: 0 1rem;
  }

  .preview {
    border-radius: 10px;
    max-height: 300px;
    overflow: hidden;
  }

  img {
    width: 100%;
  }

  nav {
    display: flex;
    justify-content: space-around;
    padding: 1rem 0;
  }

  a {
    font-size: 1.5em;
    color: #ccc;
    text-decoration: none;
  }
</style>
