import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { PlacesPresentation } from '../presentation';
import { useGeolocation } from '../../../hooks/useGeolocation';
import { usePlacesRequest } from '../../../api';

export const PlacesContainer = () => {
  const navigate = useNavigate();

  const [{ data, loading }] = usePlacesRequest();

  const places = data?.data?.places || [];

  const { getDistance } = useGeolocation();

  const { formatMessage } = useIntl();

  return (
    <PlacesPresentation
      navigate={navigate}
      formatMessage={formatMessage}
      places={places}
      getDistance={getDistance}
      loading={loading}
    />
  );
};
