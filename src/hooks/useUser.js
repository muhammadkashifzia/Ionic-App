import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllUsers, getUserById, deleteUser, searchUsers ,updateUserById,changeEmail,verifyEmail,updatePassword} from '../actions/user/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from '../shared/ToastContext'; // Import Toast context

// Fetch all users mutation
export const useGetAllUsers = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: getAllUsers,
    onSuccess: response => {
      showToast('checkmark-circle', 'All users fetched successfully!', 'success'); // Success toast
    },
    onError: error => {
      showToast('close-circle', 'Error fetching users. Please try again.', 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isPending };
};

// Fetch a user by ID mutation



export const useGetUserById = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: async data => {
      const storedUser = await AsyncStorage.getItem('userValue');
      const userId = JSON.parse(storedUser).user._id;
      return getUserById(userId);
    },
  
    onSuccess: response => {
      // showToast('checkmark-circle', 'User fetched successfully!', 'success'); // Success toast
    },
  
    onError: error => {
      showToast('close-circle', 'Error fetching user. Please try again.', 'error'); // Error toast
    }
  });
  

  return { ...mutation, isLoading: mutation.isPending };
};

// Delete user mutation
export const useDeleteUser = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: response => {
      showToast('checkmark-circle', 'User deleted successfully!', 'success'); // Success toast
    },
    onError: error => {
      showToast('close-circle', 'Error deleting user. Please try again.', 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isLoading };
};

// Search users mutation
export const useSearchUsers = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: searchUsers,
    onSuccess: response => {
      showToast('checkmark-circle', 'Users searched successfully!', 'success'); // Success toast
    },
    onError: error => {
      showToast('close-circle', 'Error searching users. Please try again.', 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isPending };
};



export const useUpdateUser = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: async data => {
      const storedUser = await AsyncStorage.getItem('userValue');
      const userId = JSON.parse(storedUser).user._id;
      return updateUserById(userId,data );
    },
  
    onSuccess: response => {
      showToast('checkmark-circle', 'User updated successfully!', 'success'); // Success toast
    },
  
    onError: error => {
      showToast('close-circle', 'Error updating user. Please try again.', 'error'); // Error toast
    }
  });
  

  return { ...mutation, isLoading: mutation.isPending };
};


export const useChangeEmail = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: changeEmail,
    onSuccess: response => {
      showToast('checkmark-circle', 'Email changed successfully!', 'success'); // Success toast
    },
    onError: error => {
      showToast('close-circle', error?.response?.data?.message, 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isPending };
};
export const useVerifyEmail = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: response => {
      showToast('checkmark-circle', 'Email changed successfully!', 'success'); // Success toast
    },
    onError: error => {
      showToast('close-circle', error?.response?.data?.message, 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isLoading };
};
export const usePasswordChange = () => {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: response => {
      showToast('checkmark-circle', 'Email changed successfully!', 'success'); // Success toast
    },
    onError: error => {
      showToast('close-circle', error?.response?.data?.message, 'error'); // Error toast
    }
  });

  return { ...mutation, isLoading: mutation.isPending };
};