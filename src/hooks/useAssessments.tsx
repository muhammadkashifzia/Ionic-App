import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getMonthlyAssessments,
  getAllAssessments,
  addAssessmentApi,
  getAllAssessmentsPoints
} from '../actions/assessments/assessments.js';
import { Storage } from '@capacitor/storage';
import { useToast } from '../shared/ToastContext';

interface AssessmentParams {
  userId?: string;
  selectedMonth?: number;
  selectedYear?: number;
  [key: string]: any;
}

export const useGetMonthlyAssessments = (params: AssessmentParams) => {
  const { showToast } = useToast();

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ['monthlyAssessments', params],
    queryFn: async () => {
      const { value: storedUser } = await Storage.get({ key: 'userValue' });
      const userId = storedUser ? JSON.parse(storedUser).user._id || '' : '';
      
      if (!params.selectedMonth || !params.selectedYear) {
        throw new Error('selectedMonth and selectedYear are required');
      }

      return getMonthlyAssessments({ ...params, userId, selectedMonth: Number(params.selectedMonth), selectedYear: Number(params.selectedYear) });
    },
    // onSuccess: () => {
    //   showToast('checkmark-circle', 'Monthly assessments fetched successfully!', 'success');
    // },
    // onError: (error: any) => {
    //   showToast('close-circle', error?.response?.data?.message || 'Error fetching assessments', 'error');
    // }
  });

  return { data, error, isPending, refetch };
};

export const useAddAssessment = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: addAssessmentApi,
    onSuccess: () => {
      showToast('checkmark-circle', 'Assessment added successfully!', 'success');
    },
    onError: (error: any) => {
      showToast('close-circle', error?.response?.data?.message || 'Error adding assessment', 'error');
    }
  });

  return { ...mutation, isPending: mutation.isPending };
};

export const useGetAllAssessments = (params: AssessmentParams) => {
  const { showToast } = useToast();

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ['allAssessments', params],
    queryFn: async () => {
      const { value: storedUser } = await Storage.get({ key: 'userValue' });
      const userId = storedUser ? JSON.parse(storedUser).user._id : '';

      if (!params.selectedMonth || !params.selectedYear) {
        throw new Error('selectedMonth and selectedYear are required');
      }

      return getAllAssessments({ ...params, userId, selectedMonth: Number(params.selectedMonth), selectedYear: Number(params.selectedYear) });
    },
    // onSuccess: () => {
    //   showToast('checkmark-circle', 'Assessments fetched successfully!', 'success');
    // },
    // onError: (error: any) => {
    //   showToast('close-circle', error?.response?.data?.message || 'Error fetching assessments', 'error');
    // }
  });

  return { data, error, isPending, refetch };
};

export const useGetAllAssessmentsPoints = (params: AssessmentParams) => {
  const { showToast } = useToast();

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ['assessmentPoints', params],
    queryFn: async () => {
      const { value: storedUser } = await Storage.get({ key: 'userValue' });
      const userId = storedUser ? JSON.parse(storedUser).user._id : '';

      if (!params.selectedMonth || !params.selectedYear) {
        throw new Error('selectedMonth and selectedYear are required');
      }

      return getAllAssessmentsPoints({ ...params, userId, selectedMonth: Number(params.selectedMonth), selectedYear: Number(params.selectedYear) });
    },
    // onSuccess: () => {
    //   showToast('checkmark-circle', 'Assessment points fetched successfully!', 'success');
    // },
    // onError: (error: any) => {
    //   showToast('close-circle', error?.response?.data?.message || 'Error fetching assessment points', 'error');
    // }
  });

  return { data, error, isPending, refetch };
};
