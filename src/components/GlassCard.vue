<template>
  <div class="glassCard">
    <slot />
  </div>
</template>

<style scoped>
  .glassCard {
    background: var(--glass-background);
    /* backdrop-filter: blur(5px); */
    border: 2px solid white;
    border-radius: 10px;
    border-color: rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.2)
      rgba(255, 255, 255, 0.2);
    padding: 20px;
  }
</style>
