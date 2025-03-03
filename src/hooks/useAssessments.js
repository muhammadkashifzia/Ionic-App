import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getMonthlyAssessments,
  getAllAssessments,
  addAssessmentApi,
  getAllAssessmentsPoints
} from '../actions/assessments/assessments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from '../shared/ToastContext'; // Import the Toast context

// Fetch Monthly Assessments mutation
export const useGetMonthlyAssessments = params => {
  const { showToast } = useToast();

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ['monthlyAssessments', params], // Unique key for caching
    queryFn: async () => {
      const storedUser = await AsyncStorage.getItem('userValue');
      params.userId = JSON.parse(storedUser).user._id;
      return getMonthlyAssessments(params);
    },
    onSuccess: response => {
      showToast(
        'checkmark-circle',
        'Monthly assessments fetched successfully!',
        'success'
      );
      return response;
    },
    onError: error => {
      showToast('close-circle', error?.response?.data?.message, 'error');
    }
  });

  return { data, error, isPending , refetch };
};

// Add Assessment mutation
export const useAddAssessment = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: addAssessmentApi,
    onSuccess: response => {
      showToast(
        'checkmark-circle',
        'Assessment added successfully!',
        'success'
      ); // Success toast
    },
    onError: error => {
      showToast('close-circle', error?.response?.data?.message, 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isPending };
};


export const useGetAllAssessments = params => {
  const { showToast } = useToast();

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ['monthlyAssessments', params], // Unique key for caching
    queryFn: async () => {
      const storedUser = await AsyncStorage.getItem('userValue');
      params.userId = JSON.parse(storedUser).user._id;
      return getAllAssessments(params);
    },
    onSuccess: response => {
      showToast(
        'checkmark-circle',
        'Monthly assessments fetched successfully!',
        'success'
      );
      return response;
    },
    onError: error => {
     
      showToast('close-circle', error?.response?.data?.message, 'error');
    }
  });

  return { data, error, isPending, refetch };
};
export const useGetAllAssessmentsPoints = params => {
  const { showToast } = useToast();

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ['monthlyAssessments', params], // Unique key for caching
    queryFn: async () => {
      const storedUser = await AsyncStorage.getItem('userValue');
      params.userId = JSON.parse(storedUser).user._id;
      return getAllAssessmentsPoints(params);
    },
    onSuccess: response => {
      showToast(
        'checkmark-circle',
        ' assessments fetched successfully!',
        'success'
      );
      return response;
    },
    onError: error => {
      showToast('close-circle', error?.response?.data?.message, 'error');
    }
  });

  return { data, error, isPending, refetch };
};

