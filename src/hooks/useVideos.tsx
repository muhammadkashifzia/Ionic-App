import { useMutation } from '@tanstack/react-query';
import {
  getAllVideos,
  deleteVideo,
  addVideo,
  saveVideoOrder
} from '../actions/videos/videos';
import { Preferences } from '@capacitor/preferences';
import { useToast } from '../shared/ToastContext'; // Import Toast context
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import { useIonToast } from '@ionic/react';

// Fetch all videos mutation
export const useGetAllVideos = () => {
  const [present] = useIonToast();

  const mutation = useMutation({
    mutationFn: getAllVideos
  });

  return { ...mutation, isLoading: mutation.status === 'pending' };
};

// Delete a video mutation
export const useDeleteVideo = () => {
  const [present] = useIonToast();

  const mutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      present({ message: 'Video deleted successfully!', duration: 2000, color: 'success', icon: checkmarkCircle });
    },
    onError: () => {
      present({ message: 'Error deleting video. Please try again.', duration: 2000, color: 'danger', icon: closeCircle });
    }
  });

  return { ...mutation, isLoading: mutation.status === 'pending' };
};

// Add a video mutation
export const useAddVideo = () => {
  const [present] = useIonToast();

  const mutation = useMutation({
    mutationFn: addVideo,
    onSuccess: () => {
      present({ message: 'Video added successfully!', duration: 2000, color: 'success', icon: checkmarkCircle });
    },
    onError: () => {
      present({ message: 'Error adding video. Please try again.', duration: 2000, color: 'danger', icon: closeCircle });
    }
  });

  return { ...mutation, isLoading: mutation.status === 'pending' };
};

// Save video order mutation
export const useSaveVideoOrder = () => {
  const [present] = useIonToast();

  const mutation = useMutation({
    mutationFn: saveVideoOrder,
    onSuccess: () => {
      present({ message: 'Video order saved successfully!', duration: 2000, color: 'success', icon: checkmarkCircle });
    },
    onError: () => {
      present({ message: 'Error saving video order. Please try again.', duration: 2000, color: 'danger', icon: closeCircle });
    }
  });

  return { ...mutation, isLoading: mutation.status === 'pending' };
};
