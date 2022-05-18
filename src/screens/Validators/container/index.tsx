import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { RoleEnum } from '../../../types/Models';
import { ValidatorsPresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { useUsersRequest } from '../../../api';

const ROLES_TO_FILTER = [RoleEnum.VALIDATOR, RoleEnum.ADMIN];

export const ValidatorsContainer = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const onAddButtonClick = useCallback(() => {
    navigate(paths.newValidator);
  }, [navigate]);

  const [{ data, loading: loadingUsers }, getUsers] = useUsersRequest();
  const users = data?.data?.users || [];

  const [debouncedEmail] = useDebounce(email, 1000);

  useEffect(() => {
    getUsers({
      params: {
        roles: ROLES_TO_FILTER,
        ...(debouncedEmail ? { email: debouncedEmail } : {}),
      },
    });
  }, [debouncedEmail]);

  return (
    <ValidatorsPresentation
      onAddButtonClick={onAddButtonClick}
      navigate={navigate}
      formatMessage={formatMessage}
      users={users}
      loading={loadingUsers}
      email={email}
      setEmail={setEmail}
    />
  );
};
