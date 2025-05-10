<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <h2 class="section-title">My Projects</h2>
      <p class="section-description">
        While my pursuit of knowledge has spawned many pet projects, here are a few of my favorites.
        I am always looking for new opportunities to learn and no challenge is too big or too small.
      </p>

      <div class="project-grid">
        <GlassCard v-for="project in projects" :key="project.title" class="project-card">
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay">
              <a :href="project.link" class="view-project">View Project</a>
            </div>
          </div>
          <div class="project-details">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.short }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" class="tag">{{ tag }}</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import GlassCard from '../GlassCard.vue'

  // Sample project data
  const projects = ref([
    {
      title: 'CableCode',
      short:
        'Dynamic website builder that allows users to visually design websites and bring them to life by connecting nodes.',
      description: ``,
      tags: ['Vue 3', 'TypeScript', 'Vite', 'MongoDB', 'Docker'],
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.0&auto=format&fit=crop&w=600&h=400&q=80',
      link: 'https://cable.strutcode.dev',
    },
    {
      title: 'Gameboy Emulator',
      short:
        'A simple from-scratch emulator for the SM2 microprocessor and related hardware that runs in a browser.',
      description: ``,
      tags: ['TypeScript', 'Vite', 'Assembly', 'Hardware Emulation'],
      image:
        'https://images.unsplash.com/photo-1631896928992-90e5a2cc7a4e?ixlib=rb-4.0.0&auto=format&fit=crop&w=600&h=400&q=80',
      link: 'https://gameboy.strutcode.dev',
    },
    {
      title: 'Super Penguin Bros DX',
      short: 'A dynamic multiplayer game using web technologies .',
      description: ``,
      tags: ['Godot', 'Docker', 'WebRTC', 'DigitalOcean'],
      image:
        'https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?ixlib=rb-4.0.0&auto=format&fit=crop&w=600&h=400&q=80',
      link: 'https://pengiunbros.io',
    },
    {
      title: 'TristanScript',
      short:
        'My pet programming language built from the ground up using my own lexer, parser, interpreter and compiler.',
      description: ``,
      tags: ['Typescript', 'x86 Assembly'],
      image:
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.0&auto=format&fit=crop&w=600&h=400&q=80',
      link: 'tscript.strutcode.dev',
    },
    {
      title: 'tOS',
      short:
        'My personal operation system project starting from the boot loader all the way up to a GUI.',
      description: ``,
      tags: ['x86 Assembly', 'Hardware', 'C/C++', 'Linux'],
      image:
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.0&auto=format&fit=crop&w=600&h=400&q=80',
      link: 'tos.strutcode.dev',
    },
  ])
</script>

<style scoped>
  .section-title {
    text-align: center;
    margin-bottom: 1rem;
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

  .section-description {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 3rem;
    color: var(--text-muted-color);
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  .project-card {
    border-radius: 8px;
    overflow: hidden;
    /* background-color: var(--card-bg-color); */
    box-shadow: 0 4px 6px var(--shadow-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px var(--shadow-color);
  }

  .project-image {
    position: relative;
    overflow: hidden;
    height: 200px;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .project-card:hover .project-image img {
    transform: scale(1.1);
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-card:hover .project-overlay {
    opacity: 1;
  }

  .view-project {
    color: white;
    background-color: var(--primary-color);
    padding: 0.75rem 1.5rem;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .view-project:hover {
    background-color: var(--accent-color);
    transform: scale(1.05);
  }

  .project-details {
    padding: 1.5rem;
  }

  .project-title {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: var(--text-color);
  }

  .project-description {
    color: var(--text-muted-color);
    margin-bottom: 1.5rem;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    background-color: var(--subtle-highlight-color);
    color: var(--text-color);
    padding: 0.4rem 0.8rem;
    border-radius: 30px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .project-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
