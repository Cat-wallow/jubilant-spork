import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface ClientHistoryItem {
  id: string;
  client_id: string;
  action: "CREATED" | "UPDATED" | "TERMINATED" | "ACTIVATED" | "SOFT_DELETED" | "RESTORED";
  field?: string;
  old_value?: string | null;
  new_value?: string | null;
  performed_by: string;
  performed_by_role?: string;
  timestamp: string;
  details?: string;
  affected_projects?: { id: string; name: string; status: string }[];
}

export const useClientHistory = (tenantId: string, clientId: string) => {
  return useQuery<ClientHistoryItem[]>({
    queryKey: ["client-history", tenantId, clientId],
    queryFn: async () => {
      const { data } = await api.get<{ data: ClientHistoryItem[] }>(
        `/client-wp/api/clients/${clientId}/history`,
        {
          headers: {
            "X-Tenant-Id": tenantId,
          },
        }
      );
      
      return data.data || [];
    },
    enabled: !!tenantId && !!clientId,
  });
};
