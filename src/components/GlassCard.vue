<template>
  <div class="glassCard">
    <slot />
  </div>
</template>

<style scoped>
  .glassCard {
    background: linear-gradient(
      to bottom right,
      rgba(40, 40, 40, 0.22),
      rgba(0, 0, 0, 0.12),
      rgba(0, 0, 0, 0.22)
    );
    backdrop-filter: blur(8px);
    border: 2px outset white;
    border-radius: 10px;
    border-color: rgba(255, 255, 255, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(255, 255, 255, 0.1);
    padding: 20px;
  }
</style>
