<script setup lang="ts">
</script>

<template>
  <div>
    <!-- <NuxtLoadingIndicator :throttle="0" color="#FF00FF" :height="50" class="nuxt-loading-indicator" /> -->

    <NuxtPage />
  </div>
</template>

<style>
.nuxt-loading-indicator{
  view-transition-name: nuxt-loading-indicator-transition;
}
::view-transition-old(nuxt-loading-indicator-transition) {
  /* Don't show the frozen old view */
  display: none;
}

::view-transition-new(nuxt-loading-indicator-transition) {
  /* Don't fade the new view in */
  animation: none;
}

</style>
