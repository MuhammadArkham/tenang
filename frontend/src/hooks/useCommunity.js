import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = 'http://localhost:8000';

export function useCommunity() {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuthStore(state => state.token);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/community/posts`, config);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchPostDetail = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/community/posts/${id}`, config);
      setCurrentPost(response.data);
    } catch (error) {
      console.error('Failed to fetch post detail:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const createPost = async (title, content, isAnonymous) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/community/posts`, {
        title,
        content,
        is_anonymous: isAnonymous
      }, config);
      setPosts([response.data, ...posts]);
      return response.data;
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createComment = async (postId, content, isAnonymous) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/community/posts/${postId}/comments`, {
        content,
        is_anonymous: isAnonymous
      }, config);
      
      if (currentPost && currentPost.id === postId) {
        setCurrentPost({
          ...currentPost,
          comments: [response.data, ...currentPost.comments]
        });
      }
      return response.data;
    } catch (error) {
      console.error('Failed to create comment:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    posts,
    currentPost,
    isLoading,
    fetchPosts,
    fetchPostDetail,
    createPost,
    createComment
  };
}
