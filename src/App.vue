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



.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  background-color: #121212;
  color: white;
  padding: 2rem;
}

body {
  margin: 0;
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