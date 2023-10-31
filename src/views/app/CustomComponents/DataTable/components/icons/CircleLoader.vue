<template>
  <feather-icon
    class="rotate text-secondary"
    icon="LoaderIcon" size="24"
  />
</template>

<style scoped>
.rotate {
  animation: 1s rotate linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
