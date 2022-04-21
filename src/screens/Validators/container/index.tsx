import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { ValidatorsPresentation } from '../presentation';
import { useGeolocation } from '../../../hooks/useGeolocation';
import { useValidatorsRequest } from '../../../api';

export const ValidatorsContainer = () => {
  const navigate = useNavigate();
  const { getDistance } = useGeolocation();
  const { formatMessage } = useIntl();

  const [{ data, loading }] = useValidatorsRequest();
  const users = data?.data?.users || [];

  return (
    <ValidatorsPresentation
      navigate={navigate}
      formatMessage={formatMessage}
      users={users}
      getDistance={getDistance}
      loading={loading}
    />
  );
};
