<template>
  <section id="hero" class="hero-section">
    <div class="container">
      <GlassCard class="hero-content">
        <h1>Tristan Shelton</h1>
        <h2 class="subtitle">FRONTEND WEB DEVELOPER</h2>
        <p class="tagline">Crafting beautiful, innovative, and user-friendly web experiences</p>
        <div class="cta-buttons">
          <a href="#projects" class="btn primary-btn">View My Work</a>
          <a href="#about" class="btn secondary-btn">Learn More</a>
        </div>
      </GlassCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  import GlassCard from '../GlassCard.vue'
</script>

<style scoped>
  .hero-section {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    margin-top: -3rem;
    transform: translateX(-50%);
    height: 100vh;
    color: var(--text-color);
  }

  .hero-content {
    text-align: center;
    padding: 2rem;
    border-radius: 10px;
    overflow: hidden;
    backdrop-filter: none;
    background: var(--hero-contrast-color);
    /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2); */
  }

  :root:not(.dark-theme) .hero-content {
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  :root.dark-theme .hero-content {
    background: rgba(20, 20, 20, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  h1,
  .subtitle,
  .tagline {
    /* text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25); */
  }

  :root.dark-theme h1,
  :root.dark-theme .subtitle,
  :root.dark-theme .tagline {
    /* text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); */
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    animation: fadeInDown 1s ease-out;
    font-weight: 700;
    color: var(--primary-color);
  }

  .subtitle {
    font-size: 1.4rem;
    margin-top: -1rem;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    animation: fadeInDown 1s ease-out 0.2s both;
  }

  .tagline {
    font-size: 1.25rem;
    max-width: 600px;
    margin: 0 auto 2rem;
    font-weight: 600;
    animation: fadeInDown 1s ease-out 0.4s both;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    animation: fadeInUp 1s ease-out 0.6s both;
  }

  .btn {
    padding: 0.8rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .primary-btn {
    background-color: var(--primary-color);
    color: white;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  }

  .primary-btn:hover {
    background-color: var(--primary-color-dark, var(--primary-color));
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 8px rgba(0, 0, 0, 0.2);
  }

  .secondary-btn {
    background-color: transparent;
    color: var(--text-color);
    border: 2px solid var(--text-color);
    /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
  }

  .secondary-btn:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  .shape-divider {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .shape-divider svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 80px;
  }

  .shape-divider .shape-fill {
    fill: var(--background-color);
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .hero-section {
      width: 100%;
      padding: 2rem 1rem;
    }

    h1 {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.5rem;
    }

    .cta-buttons {
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>
