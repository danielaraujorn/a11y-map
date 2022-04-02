import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { HomePresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { placesRequest, useAxios } from '../../../api';

export const HomeContainer = () => {
  const navigate = useNavigate();
  const onAddButtonClick = useCallback(() => {
    navigate(paths.newPlace);
  }, [navigate]);

  const [{ data, loading }, fetch] = useAxios(placesRequest, { manual: true });

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
    <HomePresentation loading={loading} onAddButtonClick={onAddButtonClick} />
  );
};
