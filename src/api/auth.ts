import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ForgotPasswordParamsType,
  LoginParamsType,
  SignUpParamsType,
} from '../types/Forms';
import { UserType } from '../types/Models';
import { ErrorType } from '../types/Requests';
import { paths } from '../Navigation/paths';
import { useAuth } from '../hooks/useAuth';
import { useAxios } from './useAxios';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

const manual = true;

export const useLogout = () => {
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

export const useForgotPassword = () =>
  useAxios<unknown, ForgotPasswordParamsType, ErrorType>(
    {
      url: '/users/reset_password',
      method: 'POST',
    },
    { manual }
  );

export const useNewPassword = (token: string) =>
  useAxios<unknown, ForgotPasswordParamsType, ErrorType>(
    {
      url: `/users/reset_password/${token}`,
      method: 'PATCH',
    },
    { manual }
  );

export const useLogin = (): [
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

export const useSignUp = () =>
  useAxios<unknown, SignUpParamsType>(
    {
      url: '/users/register',
      method: 'POST',
    },
    { manual }
  );
