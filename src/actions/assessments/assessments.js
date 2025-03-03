import { api } from '../../services/api';
export const getMonthlyAssessments = async data => {
  const response = await api.get(
    `/self-assessment/user/${data.userId}/analytics?month=${data.selectedMonth + 1}&year=${data.selectedYear}`
  );
  return response.data.data;
};

export const addAssessmentApi = async formData => {
  const response = await api.post('/self-assessment/add', formData);
  return response.data;
};

export const getAllAssessments = async (data) => {
  const response = await api.get(
        `/self-assessment/user/${data.userId}/monthly?month=${data.selectedMonth}&year=${data.selectedYear}`
  );
  return response.data.data;
};
export const getAllAssessmentsPoints = async (data) => {
  const response = await api.get(
        `/self-assessment/overall/${data.userId}`
  );
  return response.data;
};
