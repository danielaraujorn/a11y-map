import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { HomePresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { usePlacesRequest } from '../../../api';

export const HomeContainer = () => {
  const navigate = useNavigate();
  const onAddButtonClick = useCallback(() => {
    navigate(paths.newPlace);
  }, [navigate]);

  const [{ data, loading }] = usePlacesRequest();

  const places = data?.data?.places || [];

  return (
    <HomePresentation
      places={places}
      loading={loading}
      onAddButtonClick={onAddButtonClick}
    />
  );
};
