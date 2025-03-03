import { useMutation } from '@tanstack/react-query';
import { getAllNews, getNewsById, addNews, deleteNews, updateNews } from '../actions/news/news';
import { Storage } from '@capacitor/storage';
import { useToast } from '../shared/ToastContext'; // Import Toast context

// Fetch all news mutation
export const useGetAllNews = () => {
  const { showToast } = useToast();
  
  const mutation = useMutation({
    mutationFn: async data => {
      const storedUser = await Storage.get({ key: 'userValue' });
      const userId = storedUser.value ? JSON.parse(storedUser.value).user._id : null;
      if (!userId) {
        throw new Error('User ID not found');
      }
      return getAllNews(userId);
    },
    onMutate: data => {
      return data;
    },
    onError: error => {
      showToast('close-circle', 'Error fetching news. Please try again.', 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Fetch a single news item by ID mutation
export const useGetNewsById = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: getNewsById,
    onSuccess: response => {
      showToast('checkmark-circle', 'News fetched successfully!', 'success'); // Success toast
    },
    onError: error => {
      showToast('close-circle', 'Error fetching news. Please try again.', 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Add news mutation
export const useAddNews = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: addNews,
    onSuccess: response => {
      showToast('checkmark-circle', 'News added successfully!', 'success'); // Success toast
    },
    onError: error => {
      showToast('close-circle', 'Error adding news. Please try again.', 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Delete news mutation
export const useDeleteNews = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteNews,
    onSuccess: response => {
      showToast('checkmark-circle', 'News deleted successfully!', 'success'); // Success toast
    },
    onError: error => {
      showToast('close-circle', 'Error deleting news. Please try again.', 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Update news mutation
export const useUpdateNews = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: { id: string; values: any }) => updateNews(data.id, data.values),
    onSuccess: response => {
      showToast('checkmark-circle', 'News updated successfully!', 'success'); // Success toast
    },
    onError: error => {
      showToast('close-circle', 'Error updating news. Please try again.', 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isPending };
};
