<template>
  <div class="portfolio">
    <div class="banner red">Past Adventures</div>
    <div class="carousel">
      <div class="entry">
        <div class="preview">
          <img src="@/assets/portfolio/sonar-software.png" />
        </div>
        <div>
          <h1>Sonar Software</h1>
          <h3>Professional Experience; 4 Years</h3>
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
      <div class="entry">
        <div class="preview">
          <img src="@/assets/portfolio/applied-educational-systems.png" />
        </div>
        <div>
          <h1>Applied Educational Systems</h1>
          <h3>Professional Experience; 2 Years</h3>
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
      <div class="entry">
        <div class="preview">
          <img src="@/assets/portfolio/sonar-software.png" />
        </div>
        <div>
          <h1>Game Boy Emulator</h1>
          <h3>Challenge Project</h3>
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
      <div class="entry">
        <div class="preview">
          <img src="@/assets/portfolio/sonar-software.png" />
        </div>
        <div>
          <h1>Cable Code</h1>
          <h3>Personal Project</h3>
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
      <div class="entry">
        <div class="preview">
          <img src="@/assets/portfolio/jetblue-careers.jpg" />
        </div>
        <div>
          <h1>JetBlue Careers</h1>
          <h3>Professional Experience</h3>
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
  </div>
</template>

<style scoped>
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  .slide {
    flex: 0 0 220px;
    height: 300px;
    scroll-snap-align: start;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    margin: 0 1rem;
  }

  .entry {
    flex: 0 0 100vw;
    display: flex;
    flex-flow: row nowrap;
    gap: 2rem;
    scroll-snap-align: start;
  }

  .preview {
    flex: 0 0 40vw;
    height: 100vh;
    border-radius: 10px;
    overflow: hidden;

    img {
      width: 100%;
      mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }
  }

  nav {
    display: flex;
    justify-content: space-around;
    padding: 1rem 0;
  }

  a {
    font-size: 1.5em;
    color: #ccc;
    text-decoration: none;
  }
</style>
