import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  username?: string;
}

export interface AuthResponse {
  token: string;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register`, {
    email: data.email,
    password: data.password,
  });
  return response.data;
}; 