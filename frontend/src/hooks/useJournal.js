import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useJournal() {
  const queryClient = useQueryClient();

  const { data: journalEntries, isLoading: isLoadingEntries } = useQuery({
    queryKey: ['journalEntries'],
    queryFn: async () => {
      const res = await api.get('/journal/');
      return res.data;
    }
  });

  const getJournalDetail = (id) => {
    return useQuery({
      queryKey: ['journal', id],
      queryFn: async () => {
        const res = await api.get(`/journal/${id}`);
        return res.data;
      },
      enabled: !!id
    });
  };

  const { mutateAsync: submitJournal, isPending: isSubmitting } = useMutation({
    mutationFn: async (content) => {
      const res = await api.post('/journal/', { content });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
    }
  });

  const { mutateAsync: deleteJournal } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/journal/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
    }
  });

  return {
    journalEntries,
    isLoadingEntries,
    getJournalDetail,
    submitJournal,
    isSubmitting,
    deleteJournal
  };
}
