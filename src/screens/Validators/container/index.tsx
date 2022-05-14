import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { RoleEnum } from '../../../types/Models';
import { ValidatorsPresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { useConfirmation } from '../../../hooks/useConfirmation';
import { useSnackbar } from 'notistack';
import { useUserRolePatchRequest, useUsersRequest } from '../../../api';

const ROLES_TO_FILTER = [RoleEnum.VALIDATOR, RoleEnum.ADMIN];

export const ValidatorsContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const onAddButtonClick = useCallback(() => {
    navigate(paths.newValidator);
  }, [navigate]);

  const { showConfirmation } = useConfirmation();

  const [{ data, loading }, getUsers] = useUsersRequest();
  const users = data?.data?.users || [];

  const [debouncedEmail] = useDebounce(email, 1000);

  const changeRole = useUserRolePatchRequest();

  useEffect(() => {
    getUsers({
      params: {
        roles: ROLES_TO_FILTER,
        ...(debouncedEmail ? { email: debouncedEmail } : {}),
      },
    });
  }, [debouncedEmail]);

  const deleteValidator = useCallback(async (id: string) => {
    try {
      await changeRole(id, { role: RoleEnum.NORMAL });
      enqueueSnackbar(formatMessage({ id: 'user.success.removeValidator' }), {
        variant: 'success',
      });
      getUsers({
        params: {
          roles: ROLES_TO_FILTER,
        },
      });
    } catch {
      enqueueSnackbar(formatMessage({ id: 'user.error.removeValidator' }), {
        variant: 'error',
      });
    }
  }, []);

  const onDelete = useCallback(
    async (id: string) => {
      try {
        await showConfirmation({
          title: formatMessage({ id: 'defaultConfirmationQuestion' }),
          description: formatMessage({
            id: 'user.confirmationDescripion.removeValidatorRole',
          }),
        });
        deleteValidator(id);
      } catch (e) {
        if (e) console.error(e);
      }
    },
    [deleteValidator]
  );

  return (
    <ValidatorsPresentation
      onAddButtonClick={onAddButtonClick}
      navigate={navigate}
      formatMessage={formatMessage}
      users={users}
      loading={loading}
      email={email}
      setEmail={setEmail}
      onDelete={onDelete}
    />
  );
};
