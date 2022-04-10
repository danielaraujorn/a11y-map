import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { HomePresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { usePlacesRequest } from '../../../api';
import { useIntl } from 'react-intl';

export const HomeContainer = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const onAddButtonClick = useCallback(() => {
    navigate(paths.newPlace);
  }, [navigate]);

  const [{ data, loading }] = usePlacesRequest();

  const places = data?.data?.places || [];

  return (
    <HomePresentation
      formatMessage={formatMessage}
      places={places}
      loading={loading}
      onAddButtonClick={onAddButtonClick}
      goToPlace={(id: string) => navigate(paths.place(id))}
    />
  );
};
