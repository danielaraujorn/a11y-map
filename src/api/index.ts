import axios from 'axios';
import {
  LoginParamsType,
  NewPlaceParamsType,
  SignUpParamsType,
} from '../types/Forms';
import { PlaceModelType } from '../types/Models';
import { makeUseAxios } from 'axios-hooks';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../Navigation/paths';

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
  const navigate = useNavigate();
  const [{ data, loading }, fetch] = useAxios<
    { data: { places: PlaceModelType[] } },
    PaginationType
  >({
    url: '/places',
    method: 'GET',
  });

  const getPlaces = useCallback(async () => {
    try {
      await fetch();
    } catch (e) {
      navigate(paths.login);
    }
  }, []);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);
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
  const navigate = useNavigate();
  const [{ data, loading }, fetch] = useAxios<{ data: PlaceModelType }>({
    url: `/places/${id}`,
    method: 'GET',
  });

  const getPlaces = useCallback(async () => {
    try {
      await fetch();
    } catch (e) {
      navigate(paths.login);
    }
  }, []);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return [{ data, loading }];
};
