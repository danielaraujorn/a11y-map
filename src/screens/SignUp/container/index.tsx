import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { SignUpParamsType } from '../../../types/Forms';
import { SignUpPresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { useSignUpRequest } from '../../../api';

export const SignUpContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [, register] = useSignUpRequest();
  const { formatMessage } = useIntl();
  const methods = useForm<SignUpParamsType>();
  const onSubmit = useCallback(
    async ({ email, password }) => {
      try {
        await register({ params: { email, password } });
        enqueueSnackbar(formatMessage({ id: 'success.signUp' }));
        navigate(paths.login);
      } catch (e) {
        enqueueSnackbar(formatMessage({ id: 'error.signUp' }), {
          variant: 'error',
        });
      }
    },
    [register]
  );
  const onSecondaryClick = useCallback(() => {
    navigate(paths.login);
  }, [navigate]);

  return (
    <SignUpPresentation
      methods={methods}
      formatMessage={formatMessage}
      onSubmit={onSubmit}
      onSecondaryClick={onSecondaryClick}
    />
  );
};
