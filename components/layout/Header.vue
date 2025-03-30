<template>
  <div class="bg-white shadow-sm">
    <div class="flex items-center justify-between px-4 md:px-6 py-4">
      <button
        class="md:hidden p-2 text-gray-600 hover:text-gray-800"
        @click="$emit('toggle-sidebar')"
      >
        <span class="text-xl">☰</span>
      </button>

      <h2 class="text-lg font-semibold text-gray-800">Welcome Back</h2>

      <div class="flex items-center">
        <button class="p-2 text-gray-600 hover:text-gray-800">
          <span class="text-xl">🔔</span>
        </button>
        <div class="ml-4">
          <img
            src="https://ui-avatars.com/api/?name=User"
            alt="User"
            class="w-8 h-8 rounded-full"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["toggle-sidebar"]);
</script>
