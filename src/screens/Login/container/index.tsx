import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { LoginParamsType } from '../../../types/Forms';
import { LoginPresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { useLoginRequest } from '../../../api';

export const LoginContainer = () => {
  const login = useLoginRequest();
  const { formatMessage } = useIntl();
  const methods = useForm<LoginParamsType>();
  const navigate = useNavigate();
  const onSecondaryClick = useCallback(() => {
    navigate(paths.signUp);
  }, [navigate]);

  return (
    <LoginPresentation
      onSubmit={login}
      formatMessage={formatMessage}
      methods={methods}
      onSecondaryClick={onSecondaryClick}
    />
  );
};
