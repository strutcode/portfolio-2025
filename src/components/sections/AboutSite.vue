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
          file loader and a few GLSL shaders. The scene is rendered using a custom renderer that I
          built to be as lightweight as possible.
        </p>

        <p>
          You may also notice a subtle movement in background behind this text. That is a simple
          voronoi diagram using a pixel shader written in raw WebGL.
        </p>

        <p>
          As a fun experiment I tried to add a grounding aspect to the design by giving card
          elements a style evocative of panels of frosted glass. This is done using a combination of
          colors and CSS filters.
        </p>

        <a
          href="https://github.com/strutcode/portfolio-2025"
          target="_blank"
          class="cta btn primary-btn"
        >
          View The Source
        </a>
      </div>
    </div>
  </section>
</template>

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
    max-width: 800px;
    margin: auto;
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

  .cta {
    display: inline-block;
    margin-top: 2rem;
    text-align: center;
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

  @media (max-width: 992px) {
    .about-content {
      max-width: 100%;
    }
  }
</style>
