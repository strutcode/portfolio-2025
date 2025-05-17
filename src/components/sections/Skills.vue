<template>
  <section id="skills" class="section skills-section">
    <div class="container">
      <h2 class="section-title">Skills & Expertise</h2>
      <p class="section-description">
        While there are far too many to list exhaustively, here are some highlights of my skill set.
      </p>

      <div class="skills-container">
        <GlassCard v-for="category in skillCategories" :key="category.name" class="skill-category">
          <div class="category-header">
            <span class="category-icon"><Icon :icon="category.icon" /></span>
            <h3 class="category-name">{{ category.name }}</h3>
          </div>

          <div class="skills-list">
            <div v-for="(icon, skill) in category.skills" :key="skill" class="skill-item">
              <span class="skill-icon"><Icon :icon="icon" /></span>
              <span class="skill-name">{{ skill }}</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Icon } from '@iconify/vue'
  import GlassCard from '../GlassCard.vue'

  type SkillCategory = {
    name: string
    icon: string
    skills: Record<string, string>
  }

  // Skill categories with their respective skills
  const skillCategories = ref<SkillCategory[]>([
    {
      name: 'Frontend',
      icon: 'fluent-color:planet-32',
      skills: {
        Typescript: 'devicon:typescript',
        Javascript: 'devicon:javascript',
        HTML: 'devicon:html5',
        CSS: 'devicon:css3',
        Vue: 'devicon:vuejs',
        React: 'devicon:react',
        Redux: 'devicon:redux',
        Svelte: 'devicon:svelte',
        Sass: 'devicon:sass',
        Less: 'devicon-plain:less-wordmark',
        PostCSS: 'devicon:postcss',
        Vite: 'devicon:vite',
        Webpack: 'devicon:webpack',
        BabelJS: 'devicon:babel',
        ESLint: 'devicon:eslint',
        PWA: 'logos:pwa',
        WebGL: 'devicon:webgpu',
        WebRTC: 'logos:webrtc',
      },
    },
    {
      name: 'Backend',
      icon: 'fluent-color:coin-multiple-32',
      skills: {
        ElasticSearch: 'devicon:elasticsearch',
        'Express.js': 'devicon:express',
        GraphQL: 'logos:graphql',
        MongoDB: 'devicon:mongodb',
        Azure: 'devicon:azure',
        AWS: 'devicon:amazonwebservices-wordmark',
        'Google Cloud': 'devicon:googlecloud',
        Redis: 'devicon:redis',
        nginx: 'devicon:nginx',
        Flask: 'devicon:flask',
        Laravel: 'devicon:laravel',
        PHP: 'devicon:php',
      },
    },
    {
      name: 'Testing & Quality',
      icon: 'fluent-color:puzzle-piece-32',
      skills: {
        Vitest: 'devicon:vitest',
        Ava: 'logos:ava',
        Mocha: 'devicon:mocha',
        Jasmine: 'devicon:jasmine',
        Cypress: 'devicon:cypressio',
        Puppeteer: 'devicon:puppeteer',
        Playwright: 'devicon:playwright',
        BrowserStack: 'devicon:browserstack',
      },
    },
    {
      name: 'Tools & Practices',
      icon: 'fluent-color:wrench-screwdriver-32',
      skills: {
        Git: 'devicon:git',
        GitHub: 'devicon:github',
        'VS Code': 'devicon:vscode',
        'Shell Script': 'devicon-plain:bash',
        Docker: 'devicon:docker',
        CircleCI: 'devicon-plain:circleci',
        Firebase: 'devicon:firebase',
        DigitalOcean: 'devicon:digitalocean',
        Markdown: 'devicon:markdown',
        'Github Actions': 'devicon:githubactions',
        Lodash: 'devicon:lodash',
      },
    },
    {
      name: 'Design & UI/UX',
      icon: 'fluent-color:design-ideas-48',
      skills: {
        Figma: 'devicon:figma',
        Photoshop: 'devicon:photoshop',
        Illustrator: 'devicon:illustrator',
        Sketch: 'devicon:sketch',
        TailwindCSS: 'devicon:tailwindcss',
        Bootstrap: 'devicon:bootstrap',
        'Material Design': 'devicon:materialui',
        Krita: 'cib:krita',
        'Element UI': 'logos:element',
        Quasar: 'devicon:quasar',
      },
    },
    {
      name: 'Mobile',
      icon: 'fluent-color:phone-48',
      skills: {
        Ionic: 'devicon:ionic',
        Capacitor: 'devicon:capacitor',
        Flutter: 'devicon:flutter',
        NativeScript: 'logos:nativescript',
        'React Native': 'devicon:reactnative',
        Dart: 'devicon:dart',
      },
    },
    {
      name: 'Other Skills',
      icon: 'fluent-color:heart-48',
      skills: {
        Linux: 'devicon:linux',
        C: 'devicon:c',
        'Embedded C': 'devicon:embeddedc',
        'C++': 'devicon:cplusplus',
        CMake: 'devicon:cmake',
        Godot: 'devicon:godot',
        Unity: 'devicon:unity',
        'Unreal 5': 'devicon:unrealengine',
        'C#': 'devicon:csharp',
        Go: 'devicon:go',
        Python: 'devicon:python',
        Ruby: 'devicon:ruby',
        Arduino: 'devicon:arduino',
        Assembly: 'logos:nasm',
      },
    },
  ])
</script>

<style scoped>
  .skills-section {
    color: var(--text-color);
  }

  .section-title {
    text-align: center;
    margin-bottom: 1rem;
    position: relative;
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

  .skills-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .skill-category {
    /* background-color: var(--card-bg-color); */
    /* border-radius: 8px; */
    padding: 1.5rem;
    box-shadow: 0 4px 6px var(--shadow-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .skill-category:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--shadow-color);
  }

  .category-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .category-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }

  .category-name {
    font-size: 1.4rem;
    margin: 0;
    color: var(--text-color);
  }

  .skills-list {
    display: flex;
    flex-flow: row wrap;
    gap: 1.2rem;
    overflow: hidden;
  }

  .skill-item {
    display: inline-flex;
    align-items: center;
    background: var(--subtle-highlight-color);
    border-radius: 1.3rem;
    height: 2.6rem;
    overflow: hidden;
    padding: 0 1rem;
  }

  .skill-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.6rem;
    height: 2.6rem;
    margin-left: -0.8rem;
  }

  .skill-icon svg {
    width: 1.4rem;
    height: 1.4rem;
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.25));
  }

  .skill-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .skill-name {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .skills-container {
      grid-template-columns: 1fr;
    }
  }
</style>
