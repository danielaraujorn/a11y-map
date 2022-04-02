import axios, { AxiosRequestConfig } from 'axios';
import { makeUseAxios } from 'axios-hooks';

export const useAxios = makeUseAxios({
  axios: axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  }),
});

export type SignUpParamsType = {
  email: string;
  password: string;
};

export const signUpRequest: AxiosRequestConfig<SignUpParamsType> = {
  url: '/users/register',
  method: 'POST',
};

export type LoginParamsType = {
  email: string;
  password: string;
};

export const loginRequest: AxiosRequestConfig<LoginParamsType> = {
  url: '/users/log_in',
  method: 'POST',
};

export const placesRequest: AxiosRequestConfig<{
  offset: number;
  limit: number;
  inserted_at?: string;
  inserted_at_start?: string;
  inserted_at_end?: string;
  sort?: 'inserted_at' | 'asc';
}> = { url: '/places', method: 'GET' };

export type NewPlaceParamsType = {
  validator_comments: string;
  description?: string;
  status: 'inProgress' | 'validated' | 'needChanges';
};
