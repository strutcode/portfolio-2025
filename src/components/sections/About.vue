<template>
  <section id="about" class="section about-section">
    <div class="container">
      <h2 class="section-title">About Me</h2>

      <div class="about-content">
        <div class="about-image">
          <div class="image-container">
            <!-- Professional developer profile image -->
            <img
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.0&auto=format&fit=crop&w=400&h=500&q=80"
              alt="Tristan Shelton"
            />
          </div>
        </div>

        <div class="about-text">
          <p class="lead">
            Hi, I'm Tristan! I'm a passionate developer and lover of all things digital.
          </p>

          <p>
            With a broad portfolio of skills and particular expertise in Vue.js and TypeScript, I
            bring ideas to life with clean code and intuitive user interfaces. My approach combines
            technical excellence with creative problem-solving to deliver experiences that are a cut
            above the rest.
          </p>

          <p>
            I'm constantly exploring new technologies and techniques to expand my repertiore ad stay
            on the cutting edge of technology. My goal is to be able to unleash my creativity by
            being able to build anything I can imagine!
          </p>

          <div class="personal-interests">
            <h3>When I'm not working I might be...</h3>
            <div class="interests-list">
              <GlassCard class="interest">
                <span class="interest-icon">🎮</span>
                <span class="interest-text">Playing and developing video games</span>
              </GlassCard>
              <GlassCard class="interest">
                <span class="interest-icon">💻</span>
                <span class="interest-text">Exploring OS and programming language development</span>
              </GlassCard>
              <GlassCard class="interest">
                <span class="interest-icon">🎓</span>
                <span class="interest-text">Learning entirely new skills like carpentry</span>
              </GlassCard>
              <GlassCard class="interest">
                <span class="interest-icon">🔧</span>
                <span class="interest-text">Tinkering with hardware and embedded systems</span>
              </GlassCard>
              <GlassCard class="interest">
                <span class="interest-icon">🏔️</span>
                <span class="interest-text">Hiking and enjoying nature</span>
              </GlassCard>
            </div>
          </div>
        </div>
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
    display: flex;
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
