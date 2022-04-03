import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { LoginParamsType } from '../../../types/Forms';
import { LoginPresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { useLoginRequest } from '../../../api';

export const LoginContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [, login] = useLoginRequest();
  const { formatMessage } = useIntl();
  const methods = useForm<LoginParamsType>();
  const onSubmit = useCallback(
    async ({ email, password }: LoginParamsType) => {
      try {
        await login({ params: { email, password } });
        navigate(paths.home);
      } catch (e) {
        enqueueSnackbar(formatMessage({ id: 'error.signIn' }), {
          variant: 'error',
        });
      }
    },
    [login]
  );
  const navigate = useNavigate();
  const onSecondaryClick = useCallback(() => {
    navigate(paths.signUp);
  }, [navigate]);
  return (
    <LoginPresentation
      onSubmit={onSubmit}
      formatMessage={formatMessage}
      methods={methods}
      onSecondaryClick={onSecondaryClick}
    />
  );
};
