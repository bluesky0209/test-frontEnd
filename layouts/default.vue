<template>
  <div>
    <Header @toggle-sidebar="toggleSidebar" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import Header from "../components/layout/Header.vue";
import { ref } from "vue";
const sidebar = ref(null);

const toggleSidebar = () => {
  if (sidebar.value) {
    (sidebar.value as { toggleSidebar: () => void }).toggleSidebar();
  }
};
</script>
