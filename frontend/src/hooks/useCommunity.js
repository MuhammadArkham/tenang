import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useCommunity() {
  const queryClient = useQueryClient();

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['communityPosts'],
    queryFn: async () => {
      const res = await api.get('/community/posts');
      return res.data;
    }
  });

  const { mutateAsync: createPost, isPending: isCreatingPost } = useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/community/posts', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
    }
  });

  return {
    posts,
    isLoadingPosts,
    createPost,
    isCreatingPost
  };
}

export function useCommunityPost(postId) {
  const queryClient = useQueryClient();

  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ['communityPost', postId],
    queryFn: async () => {
      const res = await api.get(`/community/posts/${postId}`);
      return res.data;
    },
    enabled: !!postId
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ['communityComments', postId],
    queryFn: async () => {
      const res = await api.get(`/community/posts/${postId}/comments`);
      return res.data;
    },
    enabled: !!postId
  });

  const { mutateAsync: addComment, isPending: isAddingComment } = useMutation({
    mutationFn: async (data) => {
      const res = await api.post(`/community/posts/${postId}/comments`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityComments', postId] });
      queryClient.invalidateQueries({ queryKey: ['communityPost', postId] });
    }
  });

  return {
    post,
    isLoadingPost,
    comments,
    isLoadingComments,
    addComment,
    isAddingComment
  };
}
