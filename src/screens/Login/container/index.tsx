import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { LoginParamsType } from '../../../types/Forms';
import { LoginPresentation } from '../presentation';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';

export const LoginContainer = () => {
  const [{ loading }, login] = api.auth.useLogin();
  const { formatMessage } = useIntl();
  const methods = useForm<LoginParamsType>();
  const navigate = useNavigate();
  const onSecondaryClick = useCallback(() => {
    navigate(paths.signUp);
  }, [navigate]);

  const forgotPassword = useCallback(() => {
    navigate(paths.forgotPassword);
  }, [navigate]);

  return (
    <LoginPresentation
      loading={loading}
      forgotPassword={forgotPassword}
      onSubmit={login}
      formatMessage={formatMessage}
      methods={methods}
      onSecondaryClick={onSecondaryClick}
    />
  );
};
