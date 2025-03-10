import { useMutation } from '@tanstack/react-query';
import {
  getAllUsers,
  getUserById,
  deleteUser,
  searchUsers,
  updateUserById,
  changeEmail,
  verifyEmail,
  updatePassword,
} from '../actions/user/user';
import { Storage } from '@capacitor/storage';
import { useToast } from '../shared/ToastContext';

// Fetch all users mutation
export const useGetAllUsers = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: getAllUsers,
    onSuccess: () => {
      showToast('✅', 'All users fetched successfully!', 'success');
    },
    onError: () => {
      showToast('❌', 'Error fetching users. Please try again.', 'error');
    },
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Fetch a user by ID mutation
export const useGetUserById = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const storedUser = await Storage.get({ key: 'userValue' });
      const userId = JSON.parse(storedUser.value || '{}').user?._id;
      return getUserById(userId);
    },
    onError: () => {
      showToast('❌', 'Error fetching user. Please try again.', 'error');
    },
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Delete user mutation
export const useDeleteUser = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      showToast('✅', 'User deleted successfully!', 'success');
    },
    onError: () => {
      showToast('❌', 'Error deleting user. Please try again.', 'error');
    },
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Search users mutation
export const useSearchUsers = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ search, page }: { search: string; page: number }) => searchUsers(search, page),
    onSuccess: () => {
      showToast('✅', 'Users searched successfully!', 'success');
    },
    onError: () => {
      showToast('❌', 'Error searching users. Please try again.', 'error');
    },
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Update user mutation
export const useUpdateUser = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const storedUser = await Storage.get({ key: 'userValue' });
      const userId = JSON.parse(storedUser.value || '{}').user?._id;
      return updateUserById(userId, data);
    },
    onSuccess: () => {
      showToast('✅', 'User updated successfully!', 'success');
    },
    onError: () => {
      showToast('❌', 'Error updating user. Please try again.', 'error');
    },
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Change email mutation
export const useChangeEmail = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: changeEmail,
    onSuccess: () => {
      showToast('✅', 'Email changed successfully!', 'success');
    },
    onError: (error: any) => {
      showToast('❌', error?.response?.data?.message || 'Error changing email.', 'error');
    },
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Verify email mutation
export const useVerifyEmail = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      showToast('✅', 'Email verified successfully!', 'success');
    },
    onError: (error: any) => {
      showToast('❌', error?.response?.data?.message || 'Error verifying email.', 'error');
    },
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Change password mutation
export const usePasswordChange = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      showToast('✅', 'Password changed successfully!', 'success');
    },
    onError: (error: any) => {
      showToast('❌', error?.response?.data?.message || 'Error changing password.', 'error');
    },
  });

  return { ...mutation, isLoading: mutation.isPending };
};
