import axios from "axios";
import { ref, computed } from "vue";

interface Campaign {
  id: number;
  name: string;
}

interface BasicWorkspaceStats {
  workspaceName: string;
  campaigns: Campaign[];
}

interface DetailedWorkspaceStats {
  workspaceName: string;
  totalScheduled: number;
  totalMaxCapacity: number;
  replyRatePercentage: number;
  monthlyStats: {
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
  }[];
  stats: {
    emailsSent: number;
    leadsContacted: number;
    opened: { count: number; percentage: string };
    replies: { count: number; percentage: string };
    bounced: { count: number; percentage: string };
    unsubscribed: { count: number; percentage: string };
    interested: { count: number; percentage: string };
  };
}

export function useDashboard() {
  const workspaces = ref<BasicWorkspaceStats[]>([]);
  const detailedWorkspaces = ref<DetailedWorkspaceStats[]>([]);
  const basicLoading = ref(true);
  const detailsLoading = ref(true);
  const error = ref<Error | null>(null);
  const detailsError = ref<Error | null>(null);

  const fetchDashboardBasic = async () => {
    try {
      basicLoading.value = true;
      error.value = null;
      const response = await axios.post<{ data: BasicWorkspaceStats[] }>(
        "/api/dashboard/basic"
      );
      workspaces.value = response.data.data || [];
      return response.data;
    } catch (err) {
      error.value = err as Error;
      console.error("Error fetching dashboard basic:", err);
      throw err;
    } finally {
      basicLoading.value = false;
    }
  };

  const fetchDashboardDetails = async () => {
    try {
      detailsLoading.value = true;
      detailsError.value = null;
      const response = await axios.post<{ data: DetailedWorkspaceStats[] }>(
        "/api/dashboard/details"
      );
      detailedWorkspaces.value = response.data.data || [];
      return response.data;
    } catch (err) {
      detailsError.value = err as Error;
      console.error("Error fetching dashboard details:", err);
      throw err;
    } finally {
      detailsLoading.value = false;
    }
  };

  const getBasicStats = computed(() => {
    if (!workspaces.value?.length) return null;

    return {
      totalWorkspaces: workspaces.value.length,
      totalCampaigns: workspaces.value.reduce(
        (sum, w) => sum + (w.campaigns?.length || 0),
        0
      ),
      workspaceStats: workspaces.value.map((workspace) => ({
        name: workspace.workspaceName,
        campaignCount: workspace.campaigns?.length || 0,
        campaigns: workspace.campaigns || [],
      })),
    };
  });

  const getDetailedStats = computed(() => {
    if (!detailedWorkspaces.value?.length) return null;

    const validWorkspaces = detailedWorkspaces.value.filter((w) => w?.stats);
    if (!validWorkspaces.length) return null;

    const totalStats = {
      emailsSent: validWorkspaces.reduce(
        (sum, w) => sum + w.stats.emailsSent,
        0
      ),
      leadsContacted: validWorkspaces.reduce(
        (sum, w) => sum + w.stats.leadsContacted,
        0
      ),
      replies: validWorkspaces.reduce(
        (sum, w) => sum + w.stats.replies.count,
        0
      ),
      bounced: validWorkspaces.reduce(
        (sum, w) => sum + w.stats.bounced.count,
        0
      ),
      interested: validWorkspaces.reduce(
        (sum, w) => sum + w.stats.interested.count,
        0
      ),
      averageReplyRate: (
        validWorkspaces.reduce(
          (sum, w) => sum + parseFloat(w.stats.replies.percentage),
          0
        ) / validWorkspaces.length
      ).toFixed(2),
    };

    return {
      totalStats,
      workspaceStats: validWorkspaces.map((workspace) => ({
        name: workspace.workspaceName,
        stats: workspace.stats,
        capacity: {
          scheduled: workspace.totalScheduled,
          maxCapacity: workspace.totalMaxCapacity,
          utilization: (
            (workspace.totalScheduled / workspace.totalMaxCapacity) *
            100
          ).toFixed(1),
        },
      })),
    };
  });

  const shouldShowBasicSkeleton = computed(() => {
    return basicLoading.value || !workspaces.value?.length;
  });

  const shouldShowDetailsSkeleton = computed(() => {
    return detailsLoading.value || !detailedWorkspaces.value?.length;
  });

  return {
    workspaces,
    detailedWorkspaces,
    basicLoading,
    detailsLoading,
    error,
    detailsError,
    shouldShowBasicSkeleton,
    shouldShowDetailsSkeleton,
    getBasicStats,
    getDetailedStats,
    fetchDashboardBasic,
    fetchDashboardDetails,
  };
}
