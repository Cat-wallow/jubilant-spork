import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export interface ClientContact {
  id: string;
  client_id: string;
  name: string;
  position?: string | null;
  email?: string | null;
  phone?: string | null;
  is_primary?: boolean | null;
  is_authorized_signer?: boolean | null;
  is_billing_contact?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
  is_active?: boolean | null;
}

interface ContactsApiResponse {
  client_id: string;
  contacts: ClientContact[];
}

export const useClientContacts = (tenantId: string, clientId: string) => {
  return useQuery<ClientContact[]>({
    queryKey: ['clientContacts', tenantId, clientId],
    queryFn: async () => {
      const { data } = await api.get<ContactsApiResponse>(
        `/client/${clientId}/contacts`,
        {
          headers: {
            'X-Tenant-Id': tenantId,
          },
        },
      );

      return data.contacts || [];
    },
    enabled: !!tenantId && !!clientId,
  });
};

export interface UpsertContactPayload {
  tenantId: string;
  clientId: string;
  contactId?: string;
  data: Partial<
    Pick<
      ClientContact,
      | 'name'
      | 'position'
      | 'email'
      | 'phone'
      | 'is_primary'
      | 'is_authorized_signer'
      | 'is_billing_contact'
    >
  >;
}

export const useUpsertClientContact = () => {
  const queryClient = useQueryClient();

  return useMutation<any, unknown, UpsertContactPayload>({
    mutationFn: async ({ tenantId, clientId, contactId, data }) => {
      const headers = { 'X-Tenant-Id': tenantId };

      if (contactId) {
        const response = await api.put(
          `/client/${clientId}/contacts/${contactId}`,
          data,
          { headers },
        );
        return response.data;
      }

      const response = await api.post(
        `/client/${clientId}/contacts`,
        data,
        { headers },
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['clientContacts', variables.tenantId, variables.clientId],
      });
    },
  });
};
