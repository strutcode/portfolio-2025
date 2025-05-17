<template>
  <section id="about" class="section about-section">
    <div class="container">
      <h2 class="section-title">About This Site</h2>

      <div class="about-content">
        <p class="lead">Welcome to my personal portfolio site!</p>

        <p>
          I had a lot of fun designing and building it, and I hope you enjoy the result. I used a
          variety of technologies to create it, according to what I thought would be the best fit
          for each part of the site. The whole site runs on Vue 3 and is built using Vite.
        </p>

        <p>
          The landing section is a custom 3D scene built using the lovely twgl.js, a custom .obj
          file loader and a few GLSL shaders. The scene is rendered using a custom WebGL renderer
          that I built to be as lightweight as possible.
        </p>

        <p>
          You may also notice a subtle movement in background behind this text. That is a simple
          voronoi diagram using a pixel shader written in raw WebGL.
        </p>

        <p>
          As a fun experiment I tried to add some skuemorphic elements to the design by giving card
          elements a style evocative of panels of frosted glass.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import GlassCard from '../GlassCard.vue'
</script>

<style scoped>
  .about-section {
    width: 100%;
  }

  .section-title {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    color: var(--text-color);
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: var(--primary-color);
  }

  .about-content {
    /* display: flex; */
    gap: 2rem;
    align-items: center;
  }

  .about-image {
    flex: 1 1 40%;
    display: flex;
  }

  .image-container {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px var(--shadow-color);
  }

  .image-container::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100%;
    height: 100%;
    border: 3px solid var(--primary-color);
    border-radius: 8px;
    z-index: -1;
  }

  .image-container img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  .image-container:hover img {
    transform: scale(1.03);
  }

  .about-text {
    flex: 1 1 60%;
    color: var(--text-color);
  }

  .lead {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  .personal-interests {
    margin-top: 2rem;
  }

  .personal-interests h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .interests-list {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .interests-list .interest {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    transition: transform 0.3s ease;
  }

  .interests-list .interest:hover {
    transform: translateY(-5px);
  }

  .interest-icon {
    font-size: 1.5rem;
  }

  @media (max-width: 992px) {
    .about-content {
      flex-direction: column;
    }

    .about-image {
      margin-bottom: 2rem;
    }

    .interests-list {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
</style>
