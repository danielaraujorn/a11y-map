import { AxiosResponse } from 'axios';
import { useCallback } from 'react';

import { NewDeficiencyParamsType } from '../types/Forms';
import { DeficiencyType } from '../types/Models';
import { PaginationType, ErrorType } from '../types/Requests';
import { useAxios } from './useAxios';

const manual = true;

export const useList = (options?: { manual?: boolean }) =>
  useAxios<
    { data: { deficiencies: DeficiencyType[] }; total: number },
    PaginationType,
    ErrorType
  >(
    {
      url: '/deficiencies',
      method: 'GET',
    },
    options
  );

export const usePatch = (): [
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

export const useCreate = () =>
  useAxios<unknown, NewDeficiencyParamsType>(
    {
      url: '/deficiencies',
      method: 'POST',
    },
    { manual }
  );

export const useGet = (id: string) =>
  useAxios<{ data: DeficiencyType }>({
    url: `/deficiencies/${id}`,
    method: 'GET',
  });

export const useDelete = (id: string) =>
  useAxios<{ data: DeficiencyType }>(
    {
      url: `/deficiencies/${id}`,
      method: 'DELETE',
    },
    { manual: true }
  );
