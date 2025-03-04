import { api } from '../../services/api';
interface AssessmentData {
  userId: string;
  selectedMonth: number;
  selectedYear: number;
}

export const getMonthlyAssessments = async (data: AssessmentData): Promise<any> => {
  const response = await api.get(
    `/self-assessment/user/${data.userId}/analytics?month=${data.selectedMonth + 1}&year=${data.selectedYear}`
  );
  return response.data.data;
};

interface FormData {
  [key: string]: any;
}

export const addAssessmentApi = async (formData: FormData): Promise<any> => {
  const response = await api.post('/self-assessment/add', formData);
  return response.data;
};

export const getAllAssessments = async (data: AssessmentData) => {
  const response = await api.get(
        `/self-assessment/user/${data.userId}/monthly?month=${data.selectedMonth}&year=${data.selectedYear}`
  );
  return response.data.data;
};
export const getAllAssessmentsPoints = async (data: AssessmentData) => {
  const response = await api.get(
        `/self-assessment/overall/${data.userId}`
  );
  return response.data;
};
