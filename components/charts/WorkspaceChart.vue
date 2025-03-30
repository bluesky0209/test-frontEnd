<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <div v-if="loading" class="w-full h-[400px] flex items-center justify-center">
      <div class="flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        <p class="text-center text-gray-500 mt-4">Loading chart data...</p>
      </div>
    </div>
    <Bar v-else-if="chartData" :data="chartData" :options="chartOptions" :height="400" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

interface WorkspaceStats {
  workspaceName: string;
  stats: {
    emailsSent: number;
    leadsContacted: number;
    replies: { count: number; percentage: string };
    interested: { count: number; percentage: string };
  };
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{
  workspaces: WorkspaceStats[];
  loading?: boolean;
  metric?: string;
}>();

const chartData = computed(() => ({
  labels: props.workspaces.map((w) => w.workspaceName),
  datasets: [
    {
      label: "Emails Sent",
      backgroundColor: "#3B82F6",
      data: props.workspaces.map((w) => w.stats.emailsSent),
    },
    {
      label: "Replies",
      backgroundColor: "#10B981",
      data: props.workspaces.map((w) => w.stats.replies.count),
    },
    {
      label: "Interested",
      backgroundColor: "#6366F1",
      data: props.workspaces.map((w) => w.stats.interested.count),
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Workspace Performance",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
} as const;
</script>
