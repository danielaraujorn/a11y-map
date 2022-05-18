import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { ForgotPasswordParamsType } from '../../../types/Forms';
import { ForgotPasswordPresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { useForgotPassword } from '../../../api';

export const ForgotPasswordContainer = () => {
  const [{ loading }, fetch] = useForgotPassword();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const methods = useForm<ForgotPasswordParamsType>();
  const navigate = useNavigate();
  const onSecondaryClick = useCallback(() => {
    navigate(paths.login);
  }, [navigate]);

  const onSubmit = useCallback(async ({ email }) => {
    try {
      await fetch({
        params: { email, url: `${location.origin}${paths.newPassword}` },
      });
      enqueueSnackbar(formatMessage({ id: 'auth.success.forgotPassword' }), {
        variant: 'success',
      });
      navigate(paths.login);
    } catch {
      enqueueSnackbar(formatMessage({ id: 'auth.error.forgotPassword' }), {
        variant: 'error',
      });
    }
  }, []);

  return (
    <ForgotPasswordPresentation
      loading={loading}
      onSubmit={onSubmit}
      formatMessage={formatMessage}
      methods={methods}
      onSecondaryClick={onSecondaryClick}
    />
  );
};
