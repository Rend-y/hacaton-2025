<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template> 
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap');

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Montserrat', Arial, sans-serif;
  overflow-x: hidden;
  background-color: #f8f9fa;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
