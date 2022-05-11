import { useDebounce } from 'use-debounce';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { RoleEnum } from '../../../types/Models';
import { ValidatorsPresentation } from '../presentation';
import { useGeolocation } from '../../../hooks/useGeolocation';
import { useUsersRequest } from '../../../api';
import { useCallback, useEffect, useState } from 'react';
import { useConfirmation } from '../../../hooks/useConfirmation';

export const ValidatorsContainer = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const { showConfirmation } = useConfirmation();

  const [{ data, loading }, fetch] = useUsersRequest();
  const users = data?.data?.users || [];

  const [debouncedEmail] = useDebounce(email, 1000);

  useEffect(() => {
    fetch({
      params: {
        roles: [RoleEnum.VALIDATOR, RoleEnum.ADMIN],
        ...(debouncedEmail ? { email: debouncedEmail } : {}),
      },
    });
  }, [debouncedEmail]);

  // @todo: "excluir", i18n, exibir snackbar de erro e sucesso
  // @todo: fazer tela de adicionar usuario
  const onDelete = useCallback(async (id: string) => {
    try {
      await showConfirmation({
        title: 'Confirma essa ação?',
        description:
          'Vocẽ irá remover as permissões de validador deste usuario',
      });
      console.log(id);
    } catch {
      console.log('negou');
    }
  }, []);

  return (
    <ValidatorsPresentation
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
