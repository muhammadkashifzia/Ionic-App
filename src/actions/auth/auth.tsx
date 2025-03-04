import { api } from '../../services/api';
import axios from 'axios';

// Register API Call
interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterUserData): Promise<any> => {
  try {
    const response = await api.post('/auth/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
  return undefined;
};

// Login API Call
interface LoginUserData {
  email: string;
  password: string;
}

interface ApiResponse {
  data: any;
  user?: any; // Optional user object
}

export const    loginUser = async (values: LoginUserData): Promise<ApiResponse> => {
  try {
    const response = await api.post('/auth/login', values);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('❌ Login API Error:', error.response || error.message);
    } else {
      console.log('❌ Login API Error:', error);
    }
    throw error; // Re-throw the error to be handled by `useMutation`
  }
};

// Forgot Password API Call
interface ForgotPasswordResponse {
  data: any;
  message?: string;
}

export const forgotPassword = async ({ email }: { email: string }): Promise<ForgotPasswordResponse> => {
  
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
        if (axios.isAxiosError(error)) {
          console.log('❌ Forgot Password API Error:', error.response || error.message);
        } else {
          console.log('❌ Forgot Password API Error:', error.message);
        }
    
      throw error;
    }
  }
  return { data: null }; // Ensure a return value in case of an error
};

// Reset Password API Call
interface ResetPasswordData {
  email: string;
  otp: string;
  password: string;
}

interface ResetPasswordResponse {
  data: any;
}

export const resetPassword = async (data: ResetPasswordData): Promise<ResetPasswordResponse> => {
  try {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('❌ Reset Password API Error:', error.response || error.message);
    } else {
      console.log('❌ Reset Password API Error:', error);
    }
    throw error;
  }
};

//  Resend OTP API Call
interface ResendOTPResponse {
  data: any;
}

export const resendOTP = async (email: string): Promise<ResendOTPResponse> => {
  try {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('❌ Resend OTP Error:', error.response || error.message);
    } else {
      console.log('❌ Resend OTP Error:', error);
    }
    throw error;
  }
};

interface ChangeEmailResponse {
  data: any;
}

export const changeEmail = async (email: string): Promise<ChangeEmailResponse> => {
  const response = await api.put('/user/change-email', { email });
  return response.data;
};

// Verify Email API Call
interface VerifyEmailData {
  email: string;
  otp: string;
}

interface VerifyEmailResponse {
  data: any;
}

export const verifyEmail = async (email: string, otp: string): Promise<VerifyEmailResponse> => {
  try {
    const response = await axios.post('/verify-email', { email, otp });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('❌ Verify Email API Error:', error.response || error.message);
    } else {
      console.log('❌ Verify Email API Error:', error);
    }
    throw error;
  }
};

interface UpdatePasswordData {
  password: string;
  newPassword: string;
}

interface UpdatePasswordResponse {
  data: any;
}

export const updatePassword = async (password: string, newPassword: string): Promise<UpdatePasswordResponse> => {
  const response = await api.put('/auth/change-password', {
    password,
    newPassword
  });
  return response.data;
};
