import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { PlacesPresentation } from '../presentation';
import { StatusEnum } from '../../../types/Models';
import { api } from '../../../api';
import { useGeolocation } from '../../../hooks/useGeolocation';
import { usePagination } from '../../../hooks/usePagination';

export const PlacesContainer = () => {
  const navigate = useNavigate();

  const [{ data, loading }, getPlaces] = api.places.useList({ manual: true });

  const { pageProps, pageParams } = usePagination(data?.total);

  useEffect(() => {
    getPlaces({
      params: {
        mine: true,
        statuses: [StatusEnum.IN_PROGRESS, StatusEnum.NEED_CHANGES],
        ...pageParams,
      },
    });
  }, [pageParams]);

  const places = data?.data?.places || [];

  const { getDistance } = useGeolocation();

  const { formatMessage } = useIntl();

  return (
    <PlacesPresentation
      pageProps={pageProps}
      navigate={navigate}
      formatMessage={formatMessage}
      places={places}
      getDistance={getDistance}
      loading={loading}
    />
  );
};
