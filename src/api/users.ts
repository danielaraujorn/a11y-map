import { AxiosResponse } from 'axios';
import { useCallback, useEffect } from 'react';

import { PaginationType, ErrorType } from '../types/Requests';
import { RoleEnum, UserType } from '../types/Models';
import { useAuth } from '../hooks/useAuth';
import { useAxios } from './useAxios';

const manual = true;

export const useList = () =>
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

export const useGet = (id: string) =>
  useAxios<{ data: UserType }>({
    url: `/users/${id}`,
    method: 'GET',
  });

export const useUpdate = (): [
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

export const useOwn = () => {
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
