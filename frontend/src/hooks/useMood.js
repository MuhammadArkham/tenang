import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useMood() {
  const queryClient = useQueryClient();

  // Fetch recent mood entries
  const { data: moodEntries, isLoading: isLoadingEntries } = useQuery({
    queryKey: ['moodEntries'],
    queryFn: async () => {
      const res = await api.get('/mood/');
      return res.data;
    }
  });

  // Fetch weekly aggregation
  const { data: weeklyMood, isLoading: isLoadingWeekly } = useQuery({
    queryKey: ['weeklyMood'],
    queryFn: async () => {
      const res = await api.get('/mood/weekly');
      return res.data;
    }
  });

  // Submit new mood entry
  const { mutateAsync: submitMood, isPending: isSubmitting } = useMutation({
    mutationFn: async (moodData) => {
      const res = await api.post('/mood/', moodData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moodEntries'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyMood'] });
    }
  });

  // Delete a mood entry
  const { mutateAsync: deleteMood } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/mood/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moodEntries'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyMood'] });
    }
  });

  return {
    moodEntries,
    isLoadingEntries,
    weeklyMood,
    isLoadingWeekly,
    submitMood,
    isSubmitting,
    deleteMood
  };
}
