import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Preferences } from '@capacitor/preferences';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  resendOTP,
  changeEmail,
  verifyEmail,
  updatePassword
} from '../actions/auth/auth';
import { useToast } from '../shared/ToastContext';
import { useIonRouter } from '@ionic/react';

export const useLogin = () => {
  const { showToast } = useToast();
  const router = useIonRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (response: { user?: any }) => {
      console.log('Login response:', response);
      if (!response.user) {
        showToast('Invalid response from server.', 'error');
        return;
      }
      await Preferences.set({ key: 'userValue', value: JSON.stringify(response) });
      showToast('Login successful!', 'success');
      router.push('/tabs/home', 'forward');
    },
    onError: error => {
      showToast((error as any)?.response?.data?.message || 'Login failed.', 'error');
    }
  });
};

export const useRegisterUser = () => {
  const { showToast } = useToast();
  const router = useIonRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: async (response, userData) => {
      if (response.message) {
        showToast(response.message, 'success');
        await Preferences.set({ key: 'userSaved', value: JSON.stringify(response?.user) });
        router.push(`/verifyOtp?type=signup&email=${response.user?.email || userData.email}`, 'forward');
      } else {
        showToast('Unexpected response from server', 'error');
      }
    },
    onError: error => {
      showToast((error as any)?.response?.data?.message || 'Registration failed.', 'error');
    }
  });
};

export const useForgotPassword = () => {
  const { showToast } = useToast();
  const router = useIonRouter();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response: { message?: string }, variables: { email: string }) => {
      showToast(response.message || 'Check your email for reset instructions.', 'success');
      router.push(`/resetPassword?email=${variables.email}`, 'forward');
    },
    onError: error => {
      showToast((error as any)?.response?.data?.message || 'Failed to send reset instructions.', 'error');
    }
  });
};

export const useResetPassword = () => {
  const { showToast } = useToast();
  const router = useIonRouter();

  return useMutation({
    mutationFn: (variables: { email: string; otp: string; password: string }) => resetPassword(variables),
    onSuccess: () => {
      showToast('Password reset successful!', 'success');
      router.push('/accountSuccess?type=resetPassword', 'forward');
    },
    onError: error => {
      showToast((error as any)?.response?.data?.message || 'Password reset failed.', 'error');
    }
  });
};

export const useResendOTP = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: resendOTP,
    onSuccess: () => {
      showToast('OTP resent successfully!', 'success');
    },
    onError: error => {
      showToast((error as any)?.response?.data?.message || 'Failed to resend OTP.', 'error');
    }
  });
};

export const useChangeEmail = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: changeEmail,
    onSuccess: () => showToast('Email changed successfully!', 'success'),
    onError: error => showToast((error as any)?.response?.data?.message, 'error')
  });
};

interface VerifyEmailVariables {
  email: string;
  otp: string;
}

interface VerifyEmailResponse {
  message?: string;
}

export const useVerifyEmail = (from: 'signup' | 'forgotPassword' | 'other') => {
  const { showToast } = useToast();
  const router = useIonRouter();

  return useMutation<VerifyEmailResponse, any, VerifyEmailVariables>({
    mutationFn: ({ email, otp }: VerifyEmailVariables) => verifyEmail(email, otp) as Promise<VerifyEmailResponse>,
    onSuccess: async (response, variables) => {
      showToast(response?.message || 'Email verified successfully!', 'success');
      const userSaved = await Preferences.get({ key: 'userSaved' });
      if (userSaved.value) {
        let parsedUser = JSON.parse(userSaved.value);
        parsedUser.isVerified = true;
        await Preferences.set({ key: 'userSaved', value: JSON.stringify(parsedUser) });
      }
      if (from === 'signup') router.push('/accountSuccess?type=signup', 'forward');
      else if (from === 'forgotPassword') router.push(`/resetPassword?email=${variables.email}&otp=${variables.otp}`, 'forward');
      else router.push('/login', 'forward');
    },
    onError: error => {
      showToast(error?.response?.data?.message || 'Verification failed.', 'error');
    }
  });
};

export const useUpdatePassword = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: ({ password, newPassword }: { password: string; newPassword: string }) => updatePassword(password, newPassword),
    onSuccess: () => showToast('Password updated successfully!', 'success'),
    onError: error => {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data?.message || 'An error occurred.', 'error');
      } else {
        showToast('An error occurred.', 'error');
      }
    }
  });
};
