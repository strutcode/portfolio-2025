<template>
  <div class="container">
    <div class="left">
      <img src="../assets/me.jpg" alt="Profile photograph of me" class="heroimage" />
    </div>
    <div class="right">
      <h1>About Me</h1>

      <nav>
        <RouterLink to="/about/summary">Summary</RouterLink>
        <RouterLink to="/about/confidences">Confidences</RouterLink>
      </nav>

      <RouterView />
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }

  .left,
  .right {
    width: 40%;
    display: inline-block;
  }

  .heroimage {
    width: 100%;
    border-radius: 10px;
  }

  a {
    font-size: 1.5em;
    color: #ccc;
    text-decoration: none;
  }
</style>
