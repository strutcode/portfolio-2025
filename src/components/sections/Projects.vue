<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <h2 class="section-title">My Projects</h2>
      <p class="section-description">
        While my pursuit of knowledge has spawned many pet projects, here are a few of my favorites.
        I am always looking for new opportunities to learn and no challenge is too big or too small.
      </p>

      <div class="project-grid">
        <GlassCard
          v-for="project in projects"
          :key="project.title"
          class="project-card"
          @click.stop.prevent="openPopup(project)"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
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

      <transition name="fade-slide">
        <div class="project-popup" v-if="selectedProject" @click="closePopup" @pointerdown.stop>
          <div class="project-popup-content" @click.stop>
            <div class="project-popup-image">
              <img :src="selectedProject.image" :alt="selectedProject.title" />
            </div>
            <div class="project-popup-overlay">
              <h3 class="project-popup-title">{{ selectedProject.title }}</h3>
              <p
                class="project-popup-description"
                v-html="selectedProject.description.replace(/\n/g, '<br />')"
              ></p>
              <div class="project-popup-tags">
                <span v-for="tag in selectedProject.tags" class="tag">{{ tag }}</span>
              </div>
              <a :href="selectedProject.link" target="_blank" class="view-project">View Project</a>
            </div>
            <Icon class="close-popup" icon="solar:close-square-bold-duotone" @click="closePopup" />
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Icon } from '@iconify/vue'
  import GlassCard from '../GlassCard.vue'

  type Project = {
    title: string
    short: string
    description: string
    tags: string[]
    image: string
    link?: string
  }

  const selectedProject = ref<Project | null>(null)
  const closePopup = () => {
    selectedProject.value = null
  }
  const openPopup = (project: Project) => {
    selectedProject.value = project
  }

  // Sample project data
  const projects = ref<Project[]>([
    {
      title: 'CableCode',
      short:
        'Dynamic website builder that allows users to visually design websites and bring them to life by connecting nodes.',
      description: `I created CableCode to help users build websites without needing to know how to code. It allows users to visually design their website using an interface inspired by existing design tools, and then add functionality by connecting nodes.
      
The backend is built on a Node server that handles user authentication, data storage, and parsing of the connected nodes to generate code. I used MongoDB as a scalable data store and containerized the application using Docker for easy deployment to various environments.

The frontend is entirely custom-built using Vue 3 and Vite, providing a fast and responsive user experience.`,
      tags: ['Vue 3', 'TypeScript', 'Vite', 'MongoDB', 'Docker'],
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.0&auto=format&fit=crop&w=600&h=400&q=80',
      link: 'https://cable.strutcode.dev',
    },
    {
      title: 'Gameboy Emulator',
      short:
        'A simple from-scratch emulator for the SM2 microprocessor and related hardware that runs in a browser.',
      description: `While lamenting the current landscape of handheld gaming devices, I found myself on a nostalgia trip that led me to a rather leading question: "How exactly did the old handhelds actually work?"

My research led me into a deep dive into handheld gaming architecture and microprocessors. I chose the original SM2 Gameboy as the simple 8 bit processor seemed reasonably within my grasp.

The resulting project is a simple from-scratch emulator for the SM2 microprocessor and related hardware that runs in a browser built entirely in TypeScript and using Vite for a build platform.`,
      tags: ['TypeScript', 'Vite', 'Assembly', 'Hardware Emulation'],
      image:
        'https://images.unsplash.com/photo-1631896928992-90e5a2cc7a4e?ixlib=rb-4.0.0&auto=format&fit=crop&w=600&h=400&q=80',
      link: 'https://github.com/strutcode/gameboy',
    },
    {
      title: 'Super Penguin Bros DX',
      short: 'A dynamic multiplayer game using web technologies .',
      description: `While playing some of the classic *.io type web games, I found myself thinking that it would be fun to have a pick up and play cooperative experience that worked like those games.
      
I decided to build a simple multiplayer game where players control penguins and try to reach the end of the level without being caught in a trap.

I chose Godot as an engine for its free and open source nature and used WebRTC for peer-to-peer communication between players. The game is hosted on DigitalOcean and uses Docker for easy deployment.`,
      tags: ['Godot', 'Docker', 'WebRTC', 'DigitalOcean'],
      image:
        'https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?ixlib=rb-4.0.0&auto=format&fit=crop&w=600&h=400&q=80',
      link: 'https://pengiunbros.io',
    },
    {
      title: 'TristanScript',
      short:
        'My pet programming language built from the ground up using my own lexer, parser, interpreter and compiler.',
      description: `I thought it would be fun to build my own programming language from the ground up. I started with a simple lexer and parser, and then built an interpreter and compiler for the language.`,
      tags: ['Typescript', 'x86 Assembly'],
      image:
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.0&auto=format&fit=crop&w=600&h=400&q=80',
      link: 'https://github.com/strutcode/lang-dev',
    },
    {
      title: 'tOS',
      short:
        'My personal operating system project starting from the boot loader all the way up to a GUI.',
      description: `While exploring the web, I encountered a fascinating resource that explained the basics of how to create an operating system from scratch.
      
I was immediately intrigued and decided to embark on my own journey to create a simple operating system. I started with a simple bootloader and then built up from there, adding features like a simple file system.

The project is still in its early stages, but I am excited to see where it goes!`,
      tags: ['x86 Assembly', 'Hardware', 'C/C++'],
      image:
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.0&auto=format&fit=crop&w=600&h=400&q=80',
      link: 'https://github.com/strutcode/os-dev',
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
    box-shadow: 0 4px 6px var(--shadow-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
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

  .project-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .project-popup-content {
    position: relative;
    border-radius: 8px;
    max-width: 1200px;
    width: 90%;
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
  }

  .project-popup-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 100%;
    z-index: -1;
  }
  .project-popup-image img {
    height: 100%;
  }

  .project-popup-overlay {
    margin-left: 400px;
    padding: 2rem;
    padding-left: 7rem;
    color: var(--text-color);
    background: linear-gradient(to right, transparent, var(--card-bg-color) 10%);
  }

  .project-popup-title {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .project-popup-description {
    margin-bottom: 1.5rem;
    color: var(--text-muted-color);
  }

  .project-popup-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .project-popup .view-project {
    display: inline-block;
    margin-top: 1rem;
    background-color: var(--primary-color);
    padding: 0.75rem 1.5rem;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .close-popup {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .close-popup:hover {
    color: var(--primary-color);
    transform: scale(1.05);
  }
  .close-popup:focus {
    outline: none;
  }
  .close-popup:active {
    transform: scale(0.95);
  }

  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  @media (max-width: 768px) {
    .project-grid {
      grid-template-columns: 1fr;
    }

    .project-popup {
      align-items: end;
    }

    .project-popup-content {
      flex-flow: column nowrap;
      max-height: 100%;
      margin-bottom: 2rem;
    }

    .project-popup-image {
      width: 100%;
      height: 20vh;
      position: relative;
      background: var(--card-bg-color);
    }

    .project-popup-image img {
      width: 100%;
      object-fit: cover;
      mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    }

    .project-popup-overlay {
      margin-left: 0;
      padding: 2rem;
      background: var(--card-bg-color);
      max-height: 55vh;
      overflow-y: auto;
    }

    .project-popup-content .view-project {
      display: block;
      width: 50%;
      text-align: center;
      margin: auto;
    }
  }
</style>
