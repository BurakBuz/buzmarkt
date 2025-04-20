// Auth Types
export interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Form Types
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues extends LoginFormValues {
  username: string;
}

// API Response Types
export interface AuthResponse {
  token: string;
  user?: User;
}

// Component Props Types
export interface InputFieldProps {
  label?: string;
  error?: string;
  touched?: boolean;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  [key: string]: any;
} 