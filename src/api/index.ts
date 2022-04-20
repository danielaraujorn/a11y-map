import axios, { AxiosPromise } from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LoginParamsType,
  NewPlaceParamsType,
  SignUpParamsType,
} from '../types/Forms';
import { PlaceModelType, UserType } from '../types/Models';
import { paths } from '../Navigation/paths';
import { useAuth } from '../hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useIntl } from 'react-intl';

type ErrorType = {
  toJSON: () => { status: number };
};

const useVerifyAuthOnGet = <ReturnType>(
  fetch: () => ReturnType,
  callback?: (returned: ReturnType) => void
) => {
  const { setUser } = useAuth();
  const get = useCallback(async () => {
    try {
      const request = await fetch();
      callback?.(request);
    } catch (e) {
      const error = <Partial<ErrorType>>e;
      const { status } = error?.toJSON?.() || {};
      if (status === 401) {
        setUser?.();
      }
    }
  }, [setUser, fetch]);

  useEffect(() => {
    if (setUser) {
      get();
    }
  }, [get, setUser]);
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

export const useLogoutRequest = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const [, fetch] = useAxios<unknown, LoginParamsType>(
    {
      url: '/users/log_out',
      method: 'DELETE',
    },
    { manual: true }
  );
  const logout = useCallback(async () => {
    try {
      await fetch();
      navigate(paths.login);
      setUser?.();
    } catch (e) {
      enqueueSnackbar(formatMessage({ id: 'error.signOut' }), {
        variant: 'error',
      });
    }
  }, [setUser, navigate, fetch]);

  return logout;
};

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

export const useOwnUser = () => {
  const [{ data, loading }, fetch] = useAxios<
    { data: UserType },
    unknown,
    ErrorType
  >({
    url: '/users/own',
    method: 'GET',
  });

  const { setUser } = useAuth();

  useVerifyAuthOnGet<AxiosPromise<{ data: UserType }>>(fetch, async request => {
    const {
      data: { data: user },
    } = await request;
    setUser?.(user);
  });
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
