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
        <h1>Tristan Shelton</h1>
        <h2 class="subtitle">Web Developer Extraordinaire</h2>

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

    <div class="banner purple">Core Strengths</div>
    <div class="skills">
      <div class="skill shiny">
        <Icon icon="devicon:typescript" />
        <div class="title">Typescript</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:javascript" />
        <div class="title">Javascript</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:html5" />
        <div class="title">HTML</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:css3" />
        <div class="title">CSS</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:sass" />
        <div class="title">Sass</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon-plain:less-wordmark" />
        <div class="title">Less</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:postcss" />
        <div class="title">PostCSS</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:vuejs" />
        <div class="title">Vue 2.x/3.x</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:npm" />
        <div class="title">NPM</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:yarn" />
        <div class="title">Yarn</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:git" />
        <div class="title">Git</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:github" />
        <div class="title">GitHub</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:nodejs" />
        <div class="title">Node</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:linux" />
        <div class="title">Linux</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:vscode" />
        <div class="title">VS Code</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon-plain:bash" />
        <div class="title">Shell Script</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:vitest" />
        <div class="title">Vitest</div>
      </div>
      <div class="skill shiny">
        <Icon icon="logos:ava" />
        <div class="title">Ava</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:mocha" />
        <div class="title">Mocha</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:jasmine" />
        <div class="title">Jasmine</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:vite" />
        <div class="title">Vite</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:webpack" />
        <div class="title">Webpack</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:cypressio" />
        <div class="title">Cypress</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:puppeteer" />
        <div class="title">Puppeteer</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:playwright" />
        <div class="title">Playwright</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:docker" />
        <div class="title">Docker</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon-plain:circleci" />
        <div class="title">CircleCI</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:webgpu" />
        <div class="title">WebGL</div>
      </div>
      <div class="skill shiny">
        <Icon icon="logos:graphql" />
        <div class="title">GraphQL</div>
      </div>
    </div>

    <div class="banner red">Notable Skills</div>
    <div class="notable">
      <div class="skill shiny">
        <Icon icon="devicon:elasticsearch" />
        <div class="title">ElasticSearch</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:express" />
        <div class="title">Express.js</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:denojs" />
        <div class="title">Deno</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:bun" />
        <div class="title">Bun</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:c" />
        <div class="title">C</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:embeddedc" />
        <div class="title">Embedded C</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:cmake" />
        <div class="title">CMake</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:cplusplus" />
        <div class="title">C++</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:svelte" />
        <div class="title">Svelte</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:chartjs" />
        <div class="title">Chart.js</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:react" />
        <div class="title">React</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:redux" />
        <div class="title">Redux</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:rxjs" />
        <div class="title">RX.js</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:mongodb" />
        <div class="title">Mongo</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:godot" />
        <div class="title">Godot</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:unity" />
        <div class="title">Unity</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:unrealengine" />
        <div class="title">Unreal 5</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:blender" />
        <div class="title">Blender</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:dart" />
        <div class="title">Dart</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:capacitor" />
        <div class="title">Capacitor</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:digitalocean" />
        <div class="title">DigitalOcean</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:azure" />
        <div class="title">Azure</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:amazonwebservices-wordmark" />
        <div class="title">AWS</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:googlecloud" />
        <div class="title">Google Cloud</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:bootstrap" />
        <div class="title">Bootstrap</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:jquery" />
        <div class="title">jQuery</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:browserstack" />
        <div class="title">BrowserStack</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:babel" />
        <div class="title">BabelJS</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:figma" />
        <div class="title">Figma</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:firebase" />
        <div class="title">Firebase</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:eslint" />
        <div class="title">ESLint</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:csharp" />
        <div class="title">C#</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:heroku" />
        <div class="title">Heroku</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:ifttt" />
        <div class="title">IFTTT</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:laravel" />
        <div class="title">Laravel</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:php" />
        <div class="title">PHP</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:lodash" />
        <div class="title">Lodash</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:go" />
        <div class="title">Go</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:pixijs" />
        <div class="title">Pixi.js</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:python" />
        <div class="title">Python</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:ruby" />
        <div class="title">Ruby</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:flutter" />
        <div class="title">Flutter</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:redis" />
        <div class="title">Redis</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:nginx" />
        <div class="title">nginx</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:flask" />
        <div class="title">Flask</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:markdown" />
        <div class="title">Markdown</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:githubactions" />
        <div class="title">Github Actions</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:arduino" />
        <div class="title">Arduino</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:pnpm" />
        <div class="title">pnpm</div>
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

<script setup lang="ts">
  import { ref } from 'vue'
  import { Icon } from '@iconify/vue'

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

  .subtitle {
    font-size: 1.2em;
    color: #ccc;
    opacity: 0.6;
    margin-top: -1.5rem;
    margin-bottom: 2rem;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5rem;
    font-size: 2em;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    text-shadow:
      0.1rem 0 #000,
      -0.1rem 0 #000,
      0 0.1rem #000,
      0 -0.1rem #000;
    border-style: solid;
    border-width: 0.5rem 0;
    margin: 4rem 0;

    &.purple {
      background-color: rgba(111, 66, 194, 0.25);
      border-color: rgba(111, 66, 194, 0.75);
    }

    &.red {
      background-color: rgba(207, 60, 143, 0.25);
      border-color: rgba(207, 60, 143, 0.75);
    }
  }

  .skill {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 10em;
    height: 11em;
    background: #556;
    border-radius: 0.5em;
    text-align: center;
    box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5);
    border: 2px outset #556;
    box-sizing: border-box;
    transition: transform 0.2s;
    transition-delay: 0.1s;

    &:hover {
      transition-delay: 0s;
      transform: perspective(100vh) translateZ(10vh) rotate3d(1, 0, -0.1, 15deg);
    }

    svg {
      width: 5.5rem;
      height: 5.5rem;
    }

    .title {
      font-size: 1.5em;
      color: #cce;
      text-shadow:
        0 0.1rem 0.1rem rgba(0, 0, 0, 0.2),
        0 -0.1rem 0.1rem rgba(0, 0, 0, 0.2),
        0.1rem 0 0.1rem rgba(0, 0, 0, 0.2),
        -0.1rem 0 0.1rem rgba(0, 0, 0, 0.2);
      font-weight: 600;
    }
  }

  .skills {
    display: flex;
    flex-flow: row wrap;
    align-items: space-between;
    margin: 4rem auto;
    gap: 1rem;

    .skill {
      svg {
        margin-top: 1rem;
        filter: drop-shadow(0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.5));
      }

      .title {
        margin-top: 1rem;
      }

      ::before {
        transform: rotate(-45deg);
      }

      &:hover ::before {
        transform: rotate(-45deg) translateY(50%);
      }
    }
  }

  .notable {
    display: flex;
    flex-flow: row wrap;
    align-items: space-between;
    margin: 4rem auto;
    gap: 1rem;

    .skill {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      width: 12em;
      height: 3em;

      svg {
        margin-left: 0.75rem;
        width: 1.5rem;
        height: 1.5rem;
        filter: drop-shadow(0.05rem 0.05rem 0.05rem rgba(0, 0, 0, 0.5));
      }

      .title {
        margin-left: 0.75rem;
        font-size: 1.1em;
      }

      ::before {
        transform: rotate(-10deg);
      }

      &:hover ::before {
        transform: rotate(-10deg) translateY(40%);
      }
    }
  }

  .shiny {
    overflow: hidden;

    ::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(0deg, transparent, transparent 30%, rgba(255, 255, 255, 0.15));
      transform: rotate(-45deg);
      opacity: 0;
      transition: all 0.2s ease;
      transition-delay: 0.1s;
    }

    &:hover ::before {
      opacity: 1;
      transition-delay: 0s;
      transform: rotate(-45deg) translateY(100%);
    }
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
