import { NewPlaceParamsType } from '../types/Forms';
import { PaginationType, ErrorType } from '../types/Requests';
import { PlaceModelType, StatusEnum } from '../types/Models';
import { useAxios } from './useAxios';

const manual = true;

export type PlacesFilterType = {
  mine?: boolean;
  statuses?: StatusEnum[];
};

type PlacesRequestParams = PaginationType & PlacesFilterType;

export const useList = (options?: { manual: boolean }) =>
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

export const useCreate = () =>
  useAxios<unknown, NewPlaceParamsType>(
    {
      url: '/places',
      method: 'POST',
    },
    { manual }
  );

export const usePatch = (id?: string) =>
  useAxios<unknown, NewPlaceParamsType>(
    {
      url: `/places/${id}`,
      method: 'PATCH',
    },
    { manual }
  );

export const useGet = (id: string) =>
  useAxios<{ data: PlaceModelType }>({
    url: `/places/${id}`,
    method: 'GET',
  });
