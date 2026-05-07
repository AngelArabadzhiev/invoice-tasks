<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import 'primeicons/primeicons.css'
import { RouterView } from 'vue-router';


</script>

<template>
  <div class="app-layout">
    <Sidebar />

    <main class="main-content">
      <RouterView/>
    </main>
  </div>
</template>

<style>



/* 1. The Wrapper */
.app-layout {
  display: flex;
  min-height: 100vh; /* Ensures the layout stretches to the bottom of the screen */
}

/* 2. The Main Content Area */
.main-content {
  flex: 1; /* This tells the main area to expand and fill all remaining space */
  background-color: #121212;
  color: white; /* Added so text is visible on dark background */
  padding: 2rem;
}

/* Base body styles usually belong in a global CSS file, but they work here if this is App.vue */
body {
  margin: 0; /* Reset default browser margins */
  background-color: #242424;
}

header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: flex-start;
  }
}
</style>