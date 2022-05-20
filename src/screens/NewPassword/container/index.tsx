import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router';
import { useSnackbar } from 'notistack';

import { NewPasswordParamsType } from '../../../types/Forms';
import { NewPasswordPresentation } from '../presentation';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';

export const NewPasswordContainer = () => {
  const { search } = useLocation();
  const token = useMemo(() => {
    const params = new URLSearchParams(search);
    return params?.get('token') || '';
  }, [search]);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [{ loading }, changePassword] = api.auth.useNewPassword(token);
  const { formatMessage } = useIntl();
  const methods = useForm<NewPasswordParamsType>();

  const onSubmit = useCallback(async ({ password, passwordConfirmation }) => {
    try {
      await changePassword({
        params: {
          new_password: password,
          new_password_confirmation: passwordConfirmation,
        },
      });
      enqueueSnackbar(
        formatMessage(
          { id: 'auth.success.NewPassword' },
          {
            variant: 'success',
          }
        )
      );
      navigate(paths.login);
    } catch (e) {
      enqueueSnackbar(formatMessage({ id: 'auth.error.NewPassword' }), {
        variant: 'error',
      });
    }
  }, []);

  const onSecondaryClick = useCallback(() => {
    navigate(paths.login);
  }, [navigate]);

  return (
    <NewPasswordPresentation
      loading={loading}
      methods={methods}
      formatMessage={formatMessage}
      onSubmit={onSubmit}
      onSecondaryClick={onSecondaryClick}
    />
  );
};
