<template>
  <div class="glassCard">
    <slot />
  </div>
</template>

<style scoped>
  .glassCard {
    background: linear-gradient(to bottom right, rgba(40, 40, 40, 0.22), rgba(255, 255, 255, 0.22));
    backdrop-filter: blur(8px);
    border: 2px outset rgba(128, 128, 128, 0.25);
    border-radius: 4px;
    padding: 20px;
    color: white;
  }
</style>