import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router';
import { useSnackbar } from 'notistack';

import { NewPasswordParamsType } from '../../../types/Forms';
import { NewPasswordPresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { useNewPasswordRequest } from '../../../api';

export const NewPasswordContainer = () => {
  const { search } = useLocation();
  const token = useMemo(() => {
    const params = new URLSearchParams(search);
    return params?.get('token') || '';
  }, [search]);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [{ loading }, changePassword] = useNewPasswordRequest(token);
  const { formatMessage } = useIntl();
  const methods = useForm<NewPasswordParamsType>();

  const onSubmit = useCallback(async ({ password, passwordConfirmation }) => {
    console.log({ password, passwordConfirmation, token });
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
