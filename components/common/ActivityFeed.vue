<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
    <div class="space-y-4">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-center p-3 bg-gray-50 rounded-lg"
      >
        <div :class="['w-2 h-2 rounded-full mr-3', activity.color]" />
        <p class="text-gray-700">{{ activity.text }}</p>
        <span class="ml-auto text-sm text-gray-500">{{ activity.time }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const activities = [
  {
    id: 1,
    text: "New user registration",
    time: "2 minutes ago",
    color: "bg-blue-500",
  },
  {
    id: 2,
    text: 'Project "Dashboard" updated',
    time: "1 hour ago",
    color: "bg-green-500",
  },
  {
    id: 3,
    text: 'New comment on "Analytics"',
    time: "3 hours ago",
    color: "bg-purple-500",
  },
];
</script>
