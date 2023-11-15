<template>
  <div class="d-flex align-items-center justify-content w-100">
    <b-badge variant="warning text-truncate" style="min-width: 50px;">
      <img :src="timerIcon" alt="timer">
      Preclassified
    </b-badge>
    <feather-icon
      class="ml-50 text-secondary"
      icon="ChevronRightIcon"
      size="18"
      style="flex-shrink: 0;"
    />
  </div>
</template>

<script>
import timerIcon from '@/assets/images/icons/timer.svg'

export default {
  name: 'StatusCol',
  data() {
    return {
      timerIcon,
    }
  },
}
</script>
