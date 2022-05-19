import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { PlacesPresentation } from '../presentation';
import { StatusEnum } from '../../../types/Models';
import { useGeolocation } from '../../../hooks/useGeolocation';
import { usePlacesRequest } from '../../../api';

export const PlacesContainer = () => {
  const navigate = useNavigate();

  const [{ data, loading }] = usePlacesRequest({
    mine: true,
    statuses: [StatusEnum.IN_PROGRESS, StatusEnum.NEED_CHANGES],
  });

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
