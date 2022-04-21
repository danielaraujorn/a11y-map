import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LoginParamsType,
  NewPlaceParamsType,
  SignUpParamsType,
} from '../types/Forms';
import { PlaceModelType, RoleEnum, UserType } from '../types/Models';
import { paths } from '../Navigation/paths';
import { useAuth } from '../hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useIntl } from 'react-intl';

type ErrorType = {
  toJSON: () => { status: number };
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

export const useLoginRequest = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const [, fetch] = useAxios<{ data: UserType }, LoginParamsType>(
    {
      url: '/users/log_in',
      method: 'POST',
    },
    { manual: true }
  );

  const login = useCallback(
    async params => {
      try {
        const {
          data: { data: user },
        } = await fetch({ params });
        setUser?.(user);
        navigate(paths.home);
      } catch (e) {
        enqueueSnackbar(formatMessage({ id: 'error.signIn' }), {
          variant: 'error',
        });
      }
    },
    [setUser, navigate, fetch]
  );

  return login;
};

export const useLogoutRequest = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const [, fetch] = useAxios(
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

export const usePlacesRequest = () =>
  useAxios<{ data: { places: PlaceModelType[] } }, PaginationType, ErrorType>({
    url: '/places',
    method: 'GET',
  });

export const useValidatorsRequest = () =>
  useAxios<{ data: { users: UserType[] } }, PaginationType, ErrorType>({
    url: '/users',
    method: 'GET',
    params: { role: RoleEnum.VALIDATOR },
  });

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

  const get = useCallback(async () => {
    try {
      const {
        data: { data: user },
      } = await fetch();
      setUser?.(user);
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

export const usePlaceRequest = (id: string) =>
  useAxios<{ data: PlaceModelType }>({
    url: `/places/${id}`,
    method: 'GET',
  });
