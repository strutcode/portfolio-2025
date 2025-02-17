<template>
  <div class="about">
    <div class="container">
      <div class="left">
        <img class="heroImage" :src="activeImage" alt="Profile photograph of me" />

        <div class="alternateImages">
          <img
            v-for="img in images"
            :key="img"
            :src="img"
            alt="Profile photograph of me"
            class="thumbnailImage"
            @click="activeImage = img"
          />
        </div>
      </div>
      <div class="right">
        <h1>About Me</h1>

        <div class="summary">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>

    <div class="confidences">
      <div>
        <div class="title strong">Core Strengths</div>
        <ul>
          <li>Vue 2.x/3.x</li>
          <li>JavaScript ES5/ES6/ESNext</li>
          <li>TypeScript</li>
          <li>Debugging/Debug Tooling</li>
          <li>HTML 4/5 + XML</li>
          <li>CSS 2.x/3.x</li>
          <li>CSS Preprocessors (Sass/Less)</li>
          <li>RESTful APIs</li>
          <li>Asynchronous Code</li>
          <li>Multithreading</li>
          <li>Regular Expressions</li>
          <li>Performance Analysis & Optimization</li>
          <li>Git SCM</li>
          <li>Docker + Containerization</li>
          <li>Linux</li>
          <li>Browser Compatibility</li>
          <li>Game Development</li>
          <li>Test-Driven Development (TDD)</li>
          <li>Unit Testing</li>
          <li>Integration Testing</li>
          <li>End-to-End Testing</li>
          <li>Code Quality Metrics</li>
          <li>Test Coverage</li>
          <li>Vite</li>
          <li>Webpack</li>
          <li>Mocha</li>
          <li>Ava</li>
          <li>Vitest</li>
          <li>Github Actions</li>
          <li>CircleCI</li>
          <li>Godot/GDScript</li>
        </ul>
      </div>

      <div>
        <div class="title medium">Knowledgable/Past Experience</div>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Immutable</li>
          <li>Jest</li>
          <li>SQL</li>
          <li>Postgres</li>
          <li>MySQL</li>
          <li>MariaDB</li>
          <li>CouchDB</li>
          <li>Mongo</li>
          <li>SQLite</li>
          <li>PHP</li>
          <li>Laravel</li>
          <li>GraphQL</li>
          <li>Python</li>
          <li>C/C++</li>
          <li>Ruby</li>
          <li>Flutter</li>
          <li>Express</li>
          <li>Ruby on Rails</li>
          <li>Pug Templates</li>
          <li>Handlebars Templates</li>
          <li>C#</li>
          <li>Cloud Computing (AWS, GCP,)</li>
          <li>ElasticSearch</li>
          <li>Project Management</li>
          <li>Customer Support</li>
          <li>Authentication + Cryptography</li>
          <li>Memory Stores (Redis)</li>
          <li>CI/CD (Circle/Jenkins)</li>
          <li>Unity C#</li>
          <li>Unreal Engine 4/5</li>
        </ul>
      </div>

      <div>
        <div class="title light">Other Skills</div>
        <ul>
          <li>Rust</li>
          <li>Kubernetes</li>
          <li>Capacitor/Ionic</li>
          <li>x86 Assembly</li>
          <li>Java</li>
          <li>Network Architecture</li>
          <li>AI Development</li>
          <li>Graphic Design</li>
          <li>Operating Systems Programming</li>
          <li>Geographic Information Systems (GIS)</li>
          <li>Embedded Systems</li>
          <li>RxJS</li>
          <li>Static Code Analysis</li>
          <li>Abstract Syntax Trees</li>
          <li>Programming Language Implementation</li>
          <li>Wordpress</li>
          <li>Drupal</li>
          <li>Tailwind CSS</li>
          <li>GitLab</li>
          <li>WebRTC</li>
          <li>Perl</li>
          <li>Discord API</li>
          <li>Slack API</li>
          <li>Lua</li>
          <li>Arduino</li>
          <li>Flask</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const images = [
    'https://companionpetvet.com/wp-content/uploads/2015/09/fall-kittens.jpg',
    'https://healthyhabitsforpets.com/sites/default/files/2023-02/2_02%20Treating%20Fleas%20on%20Kittens%20Hero_Mobile.jpg',
    'https://hhvh.net/files/2022/02/Pic-from-O-2.jpg',
    'https://uk.frontline.com/sites/default/files/2023-01/Kittens-x3-Spoke-41-M-320x228.jpg',
  ]

  const activeImage = ref(images[0])
</script>

<style scoped>
  .about {
    margin-top: 4rem;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .left,
  .right {
    width: calc(50% - 2rem);
    display: inline-block;
  }

  /* Shared styles for images */
  .heroImage,
  .thumbnailImage {
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .heroImage {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 1.5rem;
  }

  .alternateImages {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    gap: 1rem;

    .thumbnailImage {
      width: calc(50% - 1rem);
      border-radius: 8px;
      cursor: pointer;
    }
  }

  a {
    font-size: 1.5em;
    color: #ccc;
    text-decoration: none;
  }

  .confidences {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 2rem;
    margin: 4rem auto;

    & > div {
      flex: 1 1 100%;
    }

    ul {
      padding: 0;
      list-style: circle inside;
      line-height: 150%;
    }

    .title {
      padding: 0.5rem 0;
      text-transform: uppercase;
      font-weight: 700;
      border-style: solid;
      border-width: 2px 0;
      text-align: center;

      &.strong {
        border-color: #40b782;
        background-color: rgba(64, 183, 130, 0.5);
      }

      &.medium {
        border-color: #52a3e0;
        background-color: rgba(82, 163, 224, 0.5);
      }

      &.light {
        border-color: #ce7449;
        background-color: rgba(206, 116, 73, 0.5);
      }
    }
  }
</style>
