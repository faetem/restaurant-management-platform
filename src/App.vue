<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="app-main">
    <router-view />
  </main>
</template>

<style scoped>
.app-main {
  min-height: calc(100vh - 4.25rem);
  padding: 0;
}
</style>
