<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <div class="flex items-end justify-between">
      <div v-if="loading" class="w-32 h-8 bg-gray-200 rounded animate-pulse" />
      <p v-else class="text-3xl font-bold" :class="getValueColor">{{ value }}</p>
      <div v-if="showTrend && !loading" class="flex items-center">
        <span class="text-sm" :class="getTrendColor">
          {{ percentage }}%
          <span class="ml-1">
            <svg
              v-if="parseFloat(percentage) >= 0"
              class="w-4 h-4 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
              />
            </svg>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: string;
  percentage?: string;
  type?: "default" | "emails" | "replies" | "interested";
  showTrend?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "default",
  showTrend: true,
  percentage: "0",
  loading: false,
});

const getValueColor = computed(() => {
  switch (props.type) {
    case "emails":
      return "text-blue-600";
    case "replies":
      return "text-green-600";
    case "interested":
      return "text-purple-600";
    default:
      return "text-gray-900";
  }
});

const getTrendColor = computed(() => {
  const value = parseFloat(props.percentage);
  return value >= 0 ? "text-green-600" : "text-red-600";
});
</script>
