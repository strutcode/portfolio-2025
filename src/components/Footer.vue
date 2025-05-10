<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <h3>Tristan Shelton</h3>
          <p>Web Developer Extraordinaire</p>
        </div>

        <div class="footer-social">
          <h4>Connect With Me</h4>
          <div class="social-icons">
            <a href="https://www.github.com/strutcode" class="social-icon" aria-label="GitHub">
              <Icon icon="cib:github" />
            </a>
            <a
              href="https://www.linkedin.com/in/tristan-shelton-b3779793/"
              class="social-icon"
              aria-label="LinkedIn"
            >
              <Icon icon="cib:linkedin-in" />
            </a>
            <a
              href="https://discord.com/users/311604135860371468"
              class="social-icon"
              aria-label="Discord"
            >
              <Icon icon="cbi:discord" />
            </a>
          </div>
        </div>

        <div class="footer-nav">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Tristan Shelton. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  // Get current year for copyright
  const currentYear = new Date().getFullYear()
</script>

<style scoped>
  .footer {
    background-color: var(--background-alt-color);
    color: var(--text-color);
    padding: 4rem 0 2rem;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
  }

  .footer-logo h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    color: var(--text-color);
  }

  .footer-logo p {
    margin: 0;
    color: var(--text-muted-color);
  }

  .footer-social h4,
  .footer-nav h4 {
    margin-top: 0;
    margin-bottom: 1.25rem;
    font-size: 1.1rem;
    color: var(--text-color);
  }

  .social-icons {
    display: flex;
    gap: 1rem;
  }

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: all 0.3s ease;
  }

  .social-icon svg {
    width: 24px;
    height: 24px;
  }

  .social-icon:hover {
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-3px);
  }

  .footer-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-nav li {
    margin-bottom: 0.75rem;
  }

  .footer-nav a {
    color: var(--text-muted-color);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-nav a:hover {
    color: var(--primary-color);
  }

  .footer-bottom {
    padding-top: 2rem;
    text-align: center;
  }

  .footer-bottom p {
    margin: 0;
    color: var(--text-muted-color);
    font-size: 0.9rem;
  }

  @media (max-width: 992px) {
    .footer-content {
      grid-template-columns: 1fr 1fr;
    }

    .footer-logo {
      grid-column: 1 / -1;
      text-align: center;
      margin-bottom: 1.5rem;
    }
  }

  @media (max-width: 576px) {
    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .social-icons {
      justify-content: center;
    }
  }
</style>
