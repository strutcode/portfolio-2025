<template>
  <section id="contact" class="section contact-section">
    <div class="container">
      <h2 class="section-title">Contact Information</h2>
      <p class="section-description">
        I'm open to freelance opportunities, contract roles, and full-time positions. If you have a
        project that needs some creative development or just want to say hello, get in touch!
      </p>

      <div class="contact-container">
        <GlassCard>
          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon"><Icon icon="solar:map-arrow-down-bold-duotone" /></div>
              <div class="method-details">
                <h4>Location</h4>
                <p>Tacoma, Washington, USA</p>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon"><Icon icon="solar:mailbox-bold" /></div>
              <div class="method-details">
                <h4>Email</h4>
                <a href="mailto:tristan.m.shelton@gmail.com">tristan.m.shelton@gmail.com</a>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon"><Icon icon="cib:linkedin" /></div>
              <div class="method-details">
                <h4>LinkedIn</h4>
                <p>
                  <a href="https://www.linkedin.com/in/tristan-shelton-b3779793/" target="_blank">
                    linkedin.com/in/tristan-shelton-b3779793
                  </a>
                </p>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon"><Icon icon="cib:github" /></div>
              <div class="method-details">
                <h4>GitHub</h4>
                <p>
                  <a href="https://www.github.com/strutcode" target="_blank">
                    github.com/strutcode
                  </a>
                </p>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon"><Icon icon="cbi:discord" /></div>
              <div class="method-details">
                <h4>Discord</h4>
                <p>
                  <a href="https://discord.com/users/311604135860371468" target="_blank">
                    @tristans4007
                  </a>
                </p>
              </div>
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

  const formData = ref({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const isSubmitting = ref(false)
  const formSubmitted = ref(false)
  const formError = ref(false)

  // Converts text to HTML entities to stop email scrapers
  const obfuscate = (text: string) => {
    return text.replace(/./g, (match) => `&#${match.charCodeAt(0)};`)
  }

  const submitForm = async () => {
    isSubmitting.value = true

    // Send form submission to the server
    const response = await fetch('/api/send_mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Contact Form Submission',
        message: 'Hello, I would like to get in touch with you.',
      }),
    })

    if (response.ok) {
      isSubmitting.value = false
      formSubmitted.value = true

      // Reset submission status after some time
      setTimeout(() => {
        formSubmitted.value = false

        // Clear the form
        formData.value = {
          name: '',
          email: '',
          subject: '',
          message: '',
        }
      }, 5000)
    } else {
      formError.value = true
    }
  }
</script>

<style scoped>
  .contact-section {
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

  .contact-container {
    max-width: 800px;
    margin: auto;
    /* display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: stretch; */
    box-shadow: 0 10px 30px var(--shadow-color);
  }

  .contact-info {
    padding: 2rem;
    background-color: var(--card-bg-color);
    border-radius: 8px;
    box-shadow: 0 4px 6px var(--shadow-color);
  }

  .contact-info h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
  }

  .contact-methods {
    margin-top: 2rem;
  }

  .contact-method {
    display: flex;
    margin-bottom: 1.5rem;
  }

  .method-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  .method-details h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }

  .method-details p {
    margin: 0;
    color: var(--text-muted-color);
  }

  .contact-form {
    padding: 2rem;
    background-color: var(--card-bg-color);
    border-radius: 8px;
    box-shadow: 0 4px 6px var(--shadow-color);
  }

  .form-group {
    margin-bottom: 1.5rem;
    overflow: hidden;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: inherit;
    transition: border-color 0.3s ease;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  .submit-btn {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .submit-btn:hover {
    background-color: var(--accent-color);
  }

  .submit-btn:disabled {
    background-color: var(--text-muted-color);
    cursor: not-allowed;
  }

  .form-alert {
    padding: 0.75rem 1rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .form-alert.success {
    background-color: rgba(46, 213, 115, 0.15);
    color: #2ed573;
    border: 1px solid rgba(46, 213, 115, 0.3);
  }

  .form-alert.error {
    background-color: rgba(255, 71, 87, 0.15);
    color: #ff4757;
    border: 1px solid rgba(255, 71, 87, 0.3);
  }

  @media (max-width: 992px) {
    .contact-container {
      grid-template-columns: 1fr;
    }

    .contact-info {
      margin-bottom: 2rem;
    }
  }
</style>
