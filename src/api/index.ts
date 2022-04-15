import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LoginParamsType,
  NewPlaceParamsType,
  SignUpParamsType,
} from '../types/Forms';
import { PlaceModelType } from '../types/Models';
import { paths } from '../Navigation/paths';
import { useAuth } from '../hooks/useAuth';

type ErrorType = {
  toJSON: () => { status: number };
};

const useVerifyAuthOnGet = (fetch: () => void) => {
  const navigate = useNavigate();
  const { setLogged } = useAuth();
  const get = useCallback(async () => {
    try {
      await fetch();
      setLogged?.(true);
    } catch (e) {
      const { status } = (<ErrorType>e).toJSON();
      if (status === 401) {
        navigate(paths.login);
        setLogged?.(false);
      }
    }
  }, [setLogged, navigate, fetch]);

  useEffect(() => {
    if (setLogged) {
      get();
    }
  }, [get, setLogged]);
};

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

export const useSignUpRequest = () =>
  useAxios<unknown, SignUpParamsType>(
    {
      url: '/users/register',
      method: 'POST',
    },
    { manual: true }
  );

export const useLoginRequest = () =>
  useAxios<unknown, LoginParamsType>(
    {
      url: '/users/log_in',
      method: 'POST',
    },
    { manual: true }
  );

type PaginationType = {
  offset: number;
  limit: number;
  inserted_at?: string;
  inserted_at_start?: string;
  inserted_at_end?: string;
  sort?: 'inserted_at' | 'asc';
};

export const usePlacesRequest = () => {
  const [{ data, loading }, fetch] = useAxios<
    { data: { places: PlaceModelType[] } },
    PaginationType,
    ErrorType
  >({
    url: '/places',
    method: 'GET',
  });

  useVerifyAuthOnGet(fetch);
  return [{ data, loading }];
};

export const useCreatePlaceRequest = () =>
  useAxios<unknown, NewPlaceParamsType>(
    {
      url: '/places',
      method: 'POST',
    },
    { manual: true }
  );

export const usePatchPlaceRequest = (id?: string) =>
  useAxios<unknown, NewPlaceParamsType>(
    {
      url: `/places/${id}`,
      method: 'PATCH',
    },
    { manual: true }
  );

export const usePlaceRequest = (id: string) => {
  const [{ data, loading }, fetch] = useAxios<{ data: PlaceModelType }>({
    url: `/places/${id}`,
    method: 'GET',
  });

  useVerifyAuthOnGet(fetch);
  return [{ data, loading }];
};
