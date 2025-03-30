<template>
  <div class="min-h-screen bg-gray-100">
    <Sidebar ref="sidebar" />

    <div class="md:ml-64">
      <main class="p-4 md:p-6">
        <div v-if="error || detailsError" class="text-center py-10">
          <p class="text-red-600">
            Failed to load dashboard data. Please try again.
          </p>
        </div>

        <div v-else>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <template v-if="shouldShowBasicSkeleton">
              <div
                v-for="i in 4"
                :key="i"
                class="bg-white p-6 rounded-lg shadow-sm animate-pulse"
              >
                <div class="h-4 bg-gray-200 rounded w-3/4" />
                <div class="h-8 bg-gray-200 rounded w-1/2 mt-2" />
                <div class="h-4 bg-gray-200 rounded w-1/4 mt-2" />
              </div>
            </template>
            <template v-else>
              <StatsCard
                title="Total Emails Sent"
                :value="
                  getDetailedStats?.totalStats.emailsSent.toLocaleString() ||
                  '0'
                "
                type="emails"
                :show-trend="false"
                :loading="detailsLoading"
              />
              <StatsCard
                title="Total Leads Contacted"
                :value="
                  getDetailedStats?.totalStats.leadsContacted.toLocaleString() ||
                  '0'
                "
                type="default"
                :show-trend="false"
                :loading="detailsLoading"
              />
              <StatsCard
                title="Total Replies"
                :value="
                  getDetailedStats?.totalStats.replies.toLocaleString() || '0'
                "
                :percentage="
                  getDetailedStats?.totalStats.averageReplyRate || '0'
                "
                type="replies"
                :show-trend="false"
                :loading="detailsLoading"
              />
              <StatsCard
                title="Total Interested"
                :value="
                  getDetailedStats?.totalStats.interested.toLocaleString() ||
                  '0'
                "
                type="interested"
                :show-trend="false"
                :loading="detailsLoading"
              />
            </template>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 class="text-xl font-semibold mb-6">Workspace Performance</h2>
            <div>
              <WorkspaceChart 
                :workspaces="detailedWorkspaces" 
                :loading="detailsLoading"
              />
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 class="text-xl font-semibold mb-6">Monthly Performance</h2>
            <div>
              <MonthlyChart 
                :workspaces="detailedWorkspaces" 
                :loading="detailsLoading"
              />
            </div>
          </div>

          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-6">Workspace Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <template v-if="shouldShowDetailsSkeleton">
                <div
                  v-for="i in 4"
                  :key="i"
                  class="bg-white p-6 rounded-lg shadow-sm animate-pulse"
                >
                  <div class="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                  <div class="grid grid-cols-2 gap-4">
                    <div v-for="j in 4" :key="j">
                      <div class="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                      <div class="h-6 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              </template>
              <template v-else-if="getDetailedStats">
                <div
                  v-for="workspace in getDetailedStats.workspaceStats"
                  :key="workspace.name"
                  class="bg-white rounded-lg shadow-sm p-6"
                >
                  <h3 class="text-lg font-semibold mb-4">
                    {{ workspace.name }}
                  </h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">Capacity Utilization</p>
                      <p class="text-lg font-semibold">
                        {{ workspace.capacity.utilization }}%
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ workspace.capacity.scheduled }} /
                        {{ workspace.capacity.maxCapacity }}
                      </p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Reply Rate</p>
                      <p class="text-lg font-semibold">
                        {{ workspace.stats.replies.percentage }}%
                      </p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Interested Rate</p>
                      <p class="text-lg font-semibold">
                        {{ workspace.stats.interested.percentage }}%
                      </p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Bounce Rate</p>
                      <p class="text-lg font-semibold">
                        {{ workspace.stats.bounced.percentage }}%
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Sidebar from "../components/layout/Sidebar.vue";
import StatsCard from "../components/common/StatsCard.vue";
import WorkspaceChart from "../components/charts/WorkspaceChart.vue";
import MonthlyChart from "../components/charts/MonthlyChart.vue";
import { useDashboard } from "~/composables/useDashboard";

const {
  detailedWorkspaces,
  error,
  detailsError,
  shouldShowBasicSkeleton,
  shouldShowDetailsSkeleton,
  getDetailedStats,
  fetchDashboardBasic,
  fetchDashboardDetails,
  detailsLoading,
} = useDashboard();

onMounted(async () => {
  try {
    await Promise.all([fetchDashboardBasic(), fetchDashboardDetails()]);
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
  }
});
</script>
