import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { NewValidatorParamsType } from '../../../types/Forms';
import { NewValidatorPresentation } from '../presentation';
import { RoleEnum, UserType } from '../../../types/Models';
import { paths } from '../../../Navigation/paths';
import { useConfirmation } from '../../../hooks/useConfirmation';
import { useUserRolePatchRequest, useUsersRequest } from '../../../api';

const formatDefaultValues = (
  defaultValues: UserType
): NewValidatorParamsType => {
  const { role, email } = defaultValues;
  return { role, email };
};

export const NewValidatorContainer = ({
  defaultValues,
}: {
  defaultValues?: UserType;
}) => {
  const update = !!defaultValues;

  const formattedDefaultValues =
    defaultValues && formatDefaultValues(defaultValues);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const onCancelButtonClick = useCallback(() => {
    navigate(paths.validators);
  }, [navigate]);

  const [{ loading: loadingUsers }, getUsers] = useUsersRequest();
  const [{ loading: loadingChangeRole }, changeRole] =
    useUserRolePatchRequest();

  const { formatMessage } = useIntl();
  const methods = useForm<NewValidatorParamsType>({
    defaultValues: { role: RoleEnum.VALIDATOR, ...formattedDefaultValues },
  });

  const { showConfirmation } = useConfirmation();

  const addValidator = useCallback(async (id: string, role: RoleEnum) => {
    try {
      await changeRole(id, { role });
      enqueueSnackbar(formatMessage({ id: 'user.success.addValidator' }), {
        variant: 'success',
      });
      navigate(paths.validators);
    } catch {
      enqueueSnackbar(formatMessage({ id: 'user.error.addValidator' }), {
        variant: 'error',
      });
    }
  }, []);

  const askForConfirmation = useCallback(
    async ({ email, id }: UserType, role: RoleEnum) => {
      try {
        await showConfirmation({
          title: formatMessage({ id: 'defaultConfirmationQuestion' }),
          description: formatMessage(
            {
              id: 'user.confirmationDescripion.addValidatorRole',
            },
            { email, role: formatMessage({ id: `user.role.${role}` }) }
          ),
        });
        addValidator(id, role);
      } catch {
        return;
      }
    },
    []
  );

  const onSubmit = useCallback(
    async (params: NewValidatorParamsType) => {
      const { email, role } = params;
      try {
        if (update) {
          askForConfirmation(defaultValues, role);
        } else {
          const { data } = await getUsers({ params: { email, limit: 1 } });
          const users = data?.data?.users;
          if (users?.length === 1) {
            const user = users?.[0] || {};
            askForConfirmation(user, role);
          } else {
            throw new Error();
          }
        }
      } catch (e) {
        enqueueSnackbar(formatMessage({ id: 'user.error.notFound' }), {
          variant: 'error',
        });
      }
    },
    [update]
  );

  return (
    <NewValidatorPresentation
      update={update}
      loading={loadingChangeRole || loadingUsers}
      onSubmit={onSubmit}
      methods={methods}
      formatMessage={formatMessage}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};
