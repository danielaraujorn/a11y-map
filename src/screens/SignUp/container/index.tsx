import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { SignUpParamsType } from '../../../types/Forms';
import { SignUpPresentation } from '../presentation';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';

export const SignUpContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [{ loading: loadingSignUp }, register] = api.auth.useSignUp();
  const { formatMessage } = useIntl();
  const methods = useForm<SignUpParamsType>({
    defaultValues: { deficiencies: [] },
  });
  // const [{ data, loading: loadingDeficiencies }] = api.deficiencies.useList();
  // const deficiencies = data?.data?.deficiencies || [];

  const onSubmit = useCallback(
    async params => {
      try {
        await register({ params });
        enqueueSnackbar(
          formatMessage(
            { id: 'auth.success.signUp' },
            {
              variant: 'success',
            }
          )
        );
        navigate(paths.login);
      } catch (e) {
        enqueueSnackbar(formatMessage({ id: 'auth.error.signUp' }), {
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
      // deficiencies={deficiencies}
      loading={loadingSignUp}
      methods={methods}
      formatMessage={formatMessage}
      onSubmit={onSubmit}
      onSecondaryClick={onSecondaryClick}
    />
  );
};
