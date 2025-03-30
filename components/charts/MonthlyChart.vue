<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <div v-if="loading" class="w-full h-[400px] flex items-center justify-center">
      <div class="flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        <p class="text-center text-gray-500 mt-4">Loading chart data...</p>
      </div>
    </div>
    <Line v-else-if="chartData" :data="chartData" :options="chartOptions" :height="400" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "vue-chartjs";

interface MonthlyStats {
  year: number;
  month: number;
  stats: {
    emails_sent: number;
    total_leads_contacted: number;
    opened: number;
    unique_replies: number;
    bounced: number;
    unsubscribed: number;
    interested: number;
  };
}

interface WorkspaceData {
  workspaceName: string;
  monthlyStats: MonthlyStats[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{
  workspaces: WorkspaceData[];
  loading?: boolean;
}>();

const chartData = computed(() => {
  const allMonths = new Set<string>();
  props.workspaces.forEach((workspace) => {
    workspace.monthlyStats.forEach((stat) => {
      allMonths.add(`${stat.year}-${stat.month}`);
    });
  });

  const sortedMonths = Array.from(allMonths).sort();

  const datasets = props.workspaces.map((workspace, index) => {
    const colors = [
      "#3B82F6", // blue
      "#10B981", // green
      "#6366F1", // indigo
      "#F59E0B", // amber
      "#EF4444", // red
    ];

    return {
      label: workspace.workspaceName,
      data: sortedMonths.map((month) => {
        const [year, monthNum] = month.split("-").map(Number);
        const stat = workspace.monthlyStats.find(
          (s) => s.year === year && s.month === monthNum
        );
        return stat ? stat.stats.emails_sent : 0;
      }),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      tension: 0.4,
      fill: false,
    };
  });

  return {
    labels: sortedMonths.map((month) => {
      const [year, monthNum] = month.split("-").map(Number);
      return new Date(year, monthNum - 1).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
    }),
    datasets,
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Email Performance by Workspace",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Emails Sent",
      },
    },
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
  },
} as const;
</script> 