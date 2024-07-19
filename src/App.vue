<template>
  <div>
    <router-view />
    <Notification />
  </div>
</template>

<script setup lang="ts">
import Notification from './components/Notification.vue';
</script>

<style>
#app {
  height: 100vh;
}
</style>
