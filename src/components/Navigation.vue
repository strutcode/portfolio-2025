<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/portfolio">Portfolio</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>
  </nav>
</template>

<style scoped>
  nav {
    position: fixed;
    top: 20%;
    right: 1rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    padding: 1.5rem 0;
    z-index: +1;
    text-shadow:
      1px 0 #000,
      -1px 0 #000,
      0 1px #000,
      0 -1px #000,
      0 0 4px #000;

    img {
      height: 70px;
    }
  }

  :deep(a) {
    font-size: 2rem;
    color: #ccc;
    text-decoration: none;
  }

  :deep(a:hover) {
    text-decoration: underline;
  }
</style>
