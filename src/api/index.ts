import axios, { AxiosResponse } from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ForgotPasswordParamsType,
  LoginParamsType,
  NewDeficiencyParamsType,
  NewPlaceParamsType,
  SignUpParamsType,
} from '../types/Forms';
import {
  DeficiencyType,
  PlaceModelType,
  RoleEnum,
  StatusEnum,
  UserType,
} from '../types/Models';
import { paths } from '../Navigation/paths';
import { useAuth } from '../hooks/useAuth';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

const manual = true;

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
    { manual }
  );

export const useLoginRequest = (): [
  { loading: boolean },
  (params: LoginParamsType) => void
] => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const [{ loading }, fetch] = useAxios<{ data: UserType }, LoginParamsType>(
    {
      url: '/users/log_in',
      method: 'POST',
    },
    { manual }
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
        enqueueSnackbar(formatMessage({ id: 'auth.error.signIn' }), {
          variant: 'error',
        });
      }
    },
    [setUser, navigate, fetch]
  );

  return [{ loading }, login];
};

export const useForgotPassword = () =>
  useAxios<unknown, ForgotPasswordParamsType, ErrorType>(
    {
      url: '/users/reset_password',
      method: 'POST',
    },
    { manual }
  );

export const useNewPasswordRequest = (token: string) =>
  useAxios<unknown, ForgotPasswordParamsType, ErrorType>(
    {
      url: `/users/reset_password/${token}`,
      method: 'PATCH',
    },
    { manual }
  );

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
    { manual }
  );
  const logout = useCallback(async () => {
    try {
      await fetch();
      navigate(paths.login);
      setUser?.();
    } catch (e) {
      enqueueSnackbar(formatMessage({ id: 'auth.error.signOut' }), {
        variant: 'error',
      });
    }
  }, [setUser, navigate, fetch]);

  return logout;
};

type PaginationType = {
  offset?: number;
  limit?: number;
  inserted_at?: string;
  inserted_at_start?: string;
  inserted_at_end?: string;
  sort?: 'inserted_at' | 'asc';
};

type PlacesRequestParams = PaginationType & {
  mine?: boolean;
  statuses?: StatusEnum[];
};

export const usePlacesRequest = (options?: { manual: boolean }) =>
  useAxios<
    { data: { places: PlaceModelType[] }; total: number },
    PlacesRequestParams,
    ErrorType
  >(
    {
      url: '/places',
      method: 'GET',
    },
    options
  );

export const useUsersRequest = () =>
  useAxios<
    { data: { users: UserType[] }; total: number },
    PaginationType & { roles: RoleEnum; email: string },
    ErrorType
  >(
    {
      url: '/users',
      method: 'GET',
    },
    { manual }
  );

export const useUserRequest = (id: string) =>
  useAxios<{ data: UserType }>({
    url: `/users/${id}`,
    method: 'GET',
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
    { manual }
  );

export const usePatchPlaceRequest = (id?: string) =>
  useAxios<unknown, NewPlaceParamsType>(
    {
      url: `/places/${id}`,
      method: 'PATCH',
    },
    { manual }
  );

export const usePlaceRequest = (id: string) =>
  useAxios<{ data: PlaceModelType }>({
    url: `/places/${id}`,
    method: 'GET',
  });

export const useUserRolePatchRequest = (): [
  { loading?: boolean },
  (
    id: string,
    params: { role: RoleEnum }
  ) => Promise<
    AxiosResponse<{
      data: UserType;
    }>
  >
] => {
  const [{ loading }, fetch] = useAxios<{ data: UserType }>(
    {
      method: 'PATCH',
    },
    { manual }
  );

  const changeRole = useCallback(
    async (id, params) => {
      return fetch({ url: `/users/${id}/role`, params });
    },
    [fetch]
  );

  return [{ loading }, changeRole];
};

export const useDeficienciesRequest = () =>
  useAxios<
    { data: { deficiencies: DeficiencyType[] }; total: number },
    PaginationType,
    ErrorType
  >(
    {
      url: '/deficiencies',
      method: 'GET',
    },
    { manual }
  );

export const useDeficiencyPatchRequest = (): [
  { loading?: boolean },
  (
    id: string,
    params: NewDeficiencyParamsType
  ) => Promise<
    AxiosResponse<{
      data: DeficiencyType;
    }>
  >
] => {
  const [{ loading }, fetch] = useAxios<{ data: DeficiencyType }>(
    {
      method: 'PATCH',
    },
    { manual }
  );

  const update = useCallback(
    async (id, params) => {
      return fetch({ url: `/deficiencies/${id}`, params });
    },
    [fetch]
  );

  return [{ loading }, update];
};

export const useCreateDeficiencyRequest = () =>
  useAxios<unknown, NewDeficiencyParamsType>(
    {
      url: '/deficiencies',
      method: 'POST',
    },
    { manual }
  );

export const useDeficiencyRequest = (id: string) =>
  useAxios<{ data: DeficiencyType }>({
    url: `/deficiencies/${id}`,
    method: 'GET',
  });

export const useDeleteDeficiencyRequest = (id: string) =>
  useAxios<{ data: DeficiencyType }>(
    {
      url: `/deficiencies/${id}`,
      method: 'DELETE',
    },
    { manual: true }
  );
