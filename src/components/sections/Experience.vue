<template>
  <section id="experience" class="section projects-section stripe">
    <div class="container">
      <h2 class="section-title">Professional Experience</h2>
      <p class="section-description">
        Following are some of the projects I have worked on, showcasing my skills in web development
        and design. Each project reflects my commitment to quality and attention to detail, and I am
        always eager to take on new challenges and expand my skill set.
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
      title: 'Sonar',
      short:
        'Operational Support Software for internet service providers to handle all aspects of day-to-day operation.',
      description: `Sonar is a leading OSS/BSS platform for ISPs, providing a comprehensive solution for billing, support, service calls, network management, and much more. I joined a small team of talented frontend engineers tasked with building "version 2" of the existing application from the ground up at break-neck pace.

Using cutting edge technology, we created a sleek and modern web application that allows ISPs to manage their operations efficiently. I later transitioned into more senior roles including Frontend Architect and Staff Engineer where my responsibilities expanded to include mentoring new developers, conducting code reviews, and collaborating with cross-functional teams to ensure the successful delivery new features.

Major contributions on my part included building key componets, architectural projects such as transitioning the existing code base from Flow types to TypeScript, and contributing original ideas that became well-received features. I played an important role in elevating Sonar to one of the top OSS/BSS platforms in the world for ISPs.`,
      tags: ['Vue.js', 'TypeScript', 'Webpack', 'PHP', 'Laravel', 'ElasticSearch'],
      image: '/portfolio-image/sonar-software.png',
      link: '#',
    },
    {
      title: 'Applied Educational Systems',
      short:
        'A comprehensive learning management system for trade skill and career readiness cirriculum.',
      description: `When starting at Applied Educational Systems, I was tasked with taking the existing monolithic Ruby on Rails application and expanding it with a brand new frontend based on the then emerging React ecosystem.

The goal was to modernize and create a more dynamic and user-friendly experience for students and teachers while allowing the existing staff to focus on the backend architecture and server maintenance.

The result was a fully functional and responsive React application that allowed for rapid development of new features and functionality. The new system was built with a focus on performance, scalability, and maintainability, allowing the team to quickly iterate and improve the product.`,
      tags: ['React', 'Redux', 'Javascript', 'Webpack', 'Ruby on Rails'],
      image: '/portfolio-image/applied-educational-systems.png',
      link: '#',
    },
    {
      title: 'JetBlue Careers',
      short:
        'The all-in-one job portal for JetBlue Airways, one of the largest providers in the United States.',
      description: `One of the largest airlines in the United States, JetBlue was looking to support its continued growth with a new informational directory for prospective employees. I was contracted to handle all technical aspects of this important project while the design was developed separately.

The result was an attractive and efficient information portal based on the Wordpress platform. This structure allowed JetBlue's human resources staff to easily maintain and update essential information with familiar and well established interfaces.

Duties and services included hand crafting an eye-catching template from scratch (HTML5, CSS3 and PHP5), working closely with existing JetBlue technical staff to ensure smooth integration with existing properties, and management of existing server resources in conjunction with deployment of new assets including emergency handling of issues during off hours.`,
      tags: ['Wordpress', 'PHP', 'Bootstrap', 'MySQL', 'Javascript'],
      image: '/portfolio-image/jetblue-careers.jpg',
      link: '#',
    },
    {
      title: "Bali Children's Project",
      short:
        'A non-profit organization dedicated to improving education and opportunities for children in Bali.',
      description: `I provided affordable reduced cost development services for this non-profit charitable organization and used knowledge of HTML4, CSS2 and PHP4 to translate existing design specifications into functional plugins and themes to function with Wordpress 4.1.

Additional responsibilities on this project included automating rapid deployment of large quantities of existing content and providing technical consultation on certain aspects of user interface design and technology choices to best serve the client's present and future needs.`,
      tags: ['Wordpress', 'PHP', 'Javascript'],
      image: '/portfolio-image/bali-childrens-project.jpg',
      link: '#',
    },
    {
      title: 'A Natural Chef',
      short: 'The personal website of a chef specializing in natural and organic cuisine.',
      description: `This project consisted of full stack web development based on Wordpress 4.3. Responsibilities included server and database set-up, platform configuration, security and initial content deployment.

Look and feel of the site was achieved with a hand coded template based on Photoshop design files including flexible menu and sidebar systems using existing Wordpress features.`,
      tags: ['Symphony', 'PHP', 'Javascript', 'jQuery'],
      image: '/portfolio-image/a-natural-chef.jpg',
      link: '#',
    },
    {
      title: 'Something Fabulous',
      short:
        'Wedding planning and event design company specializing in custom floral arrangements and decor.',
      description:
        'I provided supplementary programming and server management services to an external design team for an existing Wordpress-based website. Services rendered included security evaluation, restoration of damaged databases and migration/reconstruction of content across multiple servers.',
      tags: ['Wordpress', 'PHP', 'Javascript'],
      image: '/portfolio-image/something-fabulous.jpg',
      link: '#',
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
