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
        <h1 class="title">Tristan Shelton</h1>
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

          <h1>Current Equipment</h1>
          <div>Ryzen 9 5900HX</div>
          <div>RTX 3080 16GB</div>
          <div>64GB DDR4</div>
          <div>2x 1TB Samsung NVMe SSD</div>

          <h1>Proficiencies</h1>
          <div>Testing and Test Driven Development</div>
          <div>Debugging and Debug Tooling</div>
          <div>Performance Analysis and Optimization</div>
          <div>Asynchronous Programming/Multithreading</div>
          <div>Project Lifecycle Management</div>
          <div>Authentication & Cryptography</div>

          <h1>Unique Abilities</h1>
          <div>Embedded Systems</div>
          <div>Operating System Programming</div>
          <div>Programming Language Implementation</div>
        </div>
      </div>
    </div>

    <div class="banner purple">Equipped Skills</div>
    <div class="skills">
      <div class="skill shiny">
        <Icon icon="devicon:typescript" />
        <div class="skillTitle">Typescript</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:javascript" />
        <div class="skillTitle">Javascript</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:html5" />
        <div class="skillTitle">HTML</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:css3" />
        <div class="skillTitle">CSS</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:sass" />
        <div class="skillTitle">Sass</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon-plain:less-wordmark" />
        <div class="skillTitle">Less</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:postcss" />
        <div class="skillTitle">PostCSS</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:vuejs" />
        <div class="skillTitle">Vue 2.x/3.x</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:npm" />
        <div class="skillTitle">NPM</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:yarn" />
        <div class="skillTitle">Yarn</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:git" />
        <div class="skillTitle">Git</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:github" />
        <div class="skillTitle">GitHub</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:nodejs" />
        <div class="skillTitle">Node</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:linux" />
        <div class="skillTitle">Linux</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:vscode" />
        <div class="skillTitle">VS Code</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon-plain:bash" />
        <div class="skillTitle">Shell Script</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:vitest" />
        <div class="skillTitle">Vitest</div>
      </div>
      <div class="skill shiny">
        <Icon icon="logos:ava" />
        <div class="skillTitle">Ava</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:mocha" />
        <div class="skillTitle">Mocha</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:jasmine" />
        <div class="skillTitle">Jasmine</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:vite" />
        <div class="skillTitle">Vite</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:webpack" />
        <div class="skillTitle">Webpack</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:cypressio" />
        <div class="skillTitle">Cypress</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:puppeteer" />
        <div class="skillTitle">Puppeteer</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:playwright" />
        <div class="skillTitle">Playwright</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:docker" />
        <div class="skillTitle">Docker</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon-plain:circleci" />
        <div class="skillTitle">CircleCI</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:webgpu" />
        <div class="skillTitle">WebGL</div>
      </div>
      <div class="skill shiny">
        <Icon icon="logos:graphql" />
        <div class="skillTitle">GraphQL</div>
      </div>
    </div>

    <div class="banner red">Skill Deck</div>
    <div class="notable">
      <div class="skill shiny">
        <Icon icon="devicon:elasticsearch" />
        <div class="skillTitle">ElasticSearch</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:express" />
        <div class="skillTitle">Express.js</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:denojs" />
        <div class="skillTitle">Deno</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:bun" />
        <div class="skillTitle">Bun</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:c" />
        <div class="skillTitle">C</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:embeddedc" />
        <div class="skillTitle">Embedded C</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:cmake" />
        <div class="skillTitle">CMake</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:cplusplus" />
        <div class="skillTitle">C++</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:svelte" />
        <div class="skillTitle">Svelte</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:chartjs" />
        <div class="skillTitle">Chart.js</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:react" />
        <div class="skillTitle">React</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:redux" />
        <div class="skillTitle">Redux</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:rxjs" />
        <div class="skillTitle">RX.js</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:mongodb" />
        <div class="skillTitle">Mongo</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:godot" />
        <div class="skillTitle">Godot</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:unity" />
        <div class="skillTitle">Unity</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:unrealengine" />
        <div class="skillTitle">Unreal 5</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:blender" />
        <div class="skillTitle">Blender</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:dart" />
        <div class="skillTitle">Dart</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:capacitor" />
        <div class="skillTitle">Capacitor</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:digitalocean" />
        <div class="skillTitle">DigitalOcean</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:azure" />
        <div class="skillTitle">Azure</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:amazonwebservices-wordmark" />
        <div class="skillTitle">AWS</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:googlecloud" />
        <div class="skillTitle">Google Cloud</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:bootstrap" />
        <div class="skillTitle">Bootstrap</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:jquery" />
        <div class="skillTitle">jQuery</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:browserstack" />
        <div class="skillTitle">BrowserStack</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:babel" />
        <div class="skillTitle">BabelJS</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:figma" />
        <div class="skillTitle">Figma</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:firebase" />
        <div class="skillTitle">Firebase</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:eslint" />
        <div class="skillTitle">ESLint</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:csharp" />
        <div class="skillTitle">C#</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:heroku" />
        <div class="skillTitle">Heroku</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:ifttt" />
        <div class="skillTitle">IFTTT</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:laravel" />
        <div class="skillTitle">Laravel</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:php" />
        <div class="skillTitle">PHP</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:lodash" />
        <div class="skillTitle">Lodash</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:go" />
        <div class="skillTitle">Go</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:pixijs" />
        <div class="skillTitle">Pixi.js</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:python" />
        <div class="skillTitle">Python</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:ruby" />
        <div class="skillTitle">Ruby</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:flutter" />
        <div class="skillTitle">Flutter</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:redis" />
        <div class="skillTitle">Redis</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:nginx" />
        <div class="skillTitle">nginx</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:flask" />
        <div class="skillTitle">Flask</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:markdown" />
        <div class="skillTitle">Markdown</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:githubactions" />
        <div class="skillTitle">Github Actions</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:arduino" />
        <div class="skillTitle">Arduino</div>
      </div>
      <div class="skill shiny">
        <Icon icon="devicon:pnpm" />
        <div class="skillTitle">pnpm</div>
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

  .title {
    font-size: 4em;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1.5rem;

    /* Text gradient effect */
    color: transparent;
    background-image: linear-gradient(rgb(255, 0, 132) 30%, rgb(72, 0, 255) 40%);
    -webkit-background-clip: text;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.4em;
    color: #ccc;
    opacity: 0.6;
    margin-top: -1.5rem;
    margin-bottom: 2rem;
    margin-left: 1rem;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5rem;
    font-size: 2em;
    color: #eee;
    text-transform: uppercase;
    font-weight: 700;
    text-shadow:
      0.1rem 0 #000,
      -0.1rem 0 #000,
      0 0.1rem #000,
      0 -0.1rem #000;
    margin: 4rem 0;
    padding: 1rem 0;

    &.purple {
      background: linear-gradient(
          90deg,
          hsl(224, 35%, 8%),
          rgba(111, 66, 194, 0.25) 40%,
          rgba(111, 66, 194, 0.25) 60%,
          hsl(224, 35%, 8%)
        ),
        linear-gradient(
          0deg,
          rgba(111, 66, 194, 0.5),
          transparent 10%,
          transparent 90%,
          rgba(111, 66, 194, 0.5)
        );
    }

    &.red {
      background: rgba(207, 60, 143, 0.25);
      background: linear-gradient(
          90deg,
          hsl(224, 35%, 8%),
          rgba(207, 60, 143, 0.25) 40%,
          rgba(207, 60, 143, 0.25) 60%,
          hsl(224, 35%, 8%)
        ),
        linear-gradient(
          0deg,
          rgba(207, 60, 143, 0.5),
          transparent 10%,
          transparent 90%,
          rgba(207, 60, 143, 0.5)
        );
    }
  }

  .skill {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 10em;
    height: 11em;
    background: hsl(240, 20%, 67%);
    border-radius: 0.5em;
    text-align: center;
    box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5);
    border: 2px outset hsl(240, 20%, 67%);
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

    .skillTitle {
      font-size: 1.5em;
      color: #333;
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

      .sectionTitle {
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

      .skillTitle {
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
      background: linear-gradient(0deg, transparent, transparent 30%, rgba(255, 255, 255, 0.25));
      transform: rotate(-45deg);
      opacity: 0;
      transition: all 0.2s ease;
      transition-delay: 0.1s;
      pointer-events: none;
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

    .skillTitle {
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
