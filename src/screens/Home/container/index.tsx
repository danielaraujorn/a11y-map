import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { HomePresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { usePlacesRequest } from '../../../api';

export const HomeContainer = () => {
  const navigate = useNavigate();
  const onAddButtonClick = useCallback(() => {
    navigate(paths.newPlace);
  }, [navigate]);

  const [{ data, loading }, fetch] = usePlacesRequest();

  const places = data?.data?.places || [];

  console.log(places);

  const getPlaces = useCallback(async () => {
    try {
      await fetch();
    } catch (e) {
      navigate(paths.login);
    }
  }, []);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);
  return (
    <HomePresentation
      places={places}
      loading={loading}
      onAddButtonClick={onAddButtonClick}
    />
  );
};
