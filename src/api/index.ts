import { AxiosRequestConfig } from 'axios';

export const registerRequest: AxiosRequestConfig<{
  email: string;
  password: string;
}> = { url: '/users/register', method: 'POST' };
export const loginRequest: AxiosRequestConfig<{
  email: string;
  password: string;
}> = { url: '/users/log_in', method: 'POST' };
