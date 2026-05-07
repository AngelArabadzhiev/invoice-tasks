<script setup lang="ts">
import { ref } from 'vue';

interface NavItem {
  id: string;
  label: string;
  iconClass: string;
  path: string;
}

const navigation = ref<NavItem[]>([
  { id: 'dashboard', label: 'Dashboard', iconClass: 'pi pi-objects-column', path: '' },
  { id: 'invoices', label: 'Invoices', iconClass: 'pi pi-file', path: '' },
  { id: 'clients', label: 'Clients', iconClass: 'pi pi-users', path: '' },
  { id: 'settings', label: 'Settings', iconClass: 'pi pi-cog', path: '' },
]);

const activeItemId = ref('invoices');

function setActiveItem(id: string) {
  activeItemId.value = id;
}
</script>

<template>
  <aside class="sidebar">
    <header class="sidebar-header">
      <div class="avatar">IP</div>
      <div class="header-info">
        <h1 class="brand-title">InvoicePro</h1>
        <p class="admin-role">Enterprise Admin</p>
      </div>
    </header>

    <button class="btn-create-new">
      <i class="pi pi-plus" style="font-size: 1.25rem"></i>
      Create New
    </button>

    <nav class="sidebar-nav">
      <ul>
        <li
            v-for="item in navigation"
            :key="item.id"
            class="nav-item"
            :class="{ 'active': item.id === activeItemId }"
            @click="setActiveItem(item.id)"
        >
          <a href="#" class="nav-link">
            <i :class="[item.iconClass, 'nav-icon']"></i>
            <span class="nav-label">{{ item.label }}</span>
          </a>

          <div v-if="item.id === activeItemId" class="active-indicator"></div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
:root {
  --sidebar-bg: #F9FAFF;
  --main-content-bg: #FFFFFF;
  --primary-navy: #001D6E;
  --text-primary: #1F2937;
  --text-muted: #4F5C86;
}


.sidebar {
  width: 260px;
  background-color: white; /* Very light background */
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #001D6E20; /* Subtle navy border */
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.avatar {
  width: 48px;
  height: 48px;
  background-color: #001D6E;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px; /* Slightly rounded squares */
  font-weight: bold;
  font-size: 1.25rem;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.2rem;
  color: #1F2937;
  font-weight: 700;
  margin: 0;
}

.admin-role {
  color: #4F5C86;
  font-size: 0.9rem;
  margin: 0;
  font-weight: 400;
}

/* "Create New" Button */
.btn-create-new {
  background-color: #001D6E;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  transition: opacity 0.2s ease;
}

.btn-create-new:hover {
  opacity: 0.9;
}

/* Navigation Base Styles */
.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative; /* Essential for the absolute-positioned indicator */
  cursor: pointer;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  text-decoration: none;
  color: #4F5C86; /* Default color for inactive items */
  transition: color 0.2s ease;
}

.nav-icon {
  width: 24px;
  font-size: 1.25rem;
}

.nav-label {
  font-size: 1rem;
  font-weight: 500;
}

/* Active State Styling */
.nav-item.active .nav-link {
  color: #001D6E; /* Primary color for active icon and text */
}

/* The curved indicator bar on the right */
.active-indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -24px; /* Move it outside the padding of the sidebar itself */
  width: 5px;
  height: 28px;
  background-color: #001D6E;
  border-radius: 3px; /* Gives it the slight curvature seen in the picture */
}
</style>