import { Map as MapType } from 'leaflet';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { HomePresentation } from '../presentation';
import { PlacesFilterType } from '../../../api/places';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';
import { useAuth } from '../../../hooks/useAuth';
import { useIntl } from 'react-intl';

export const HomeContainer = () => {
  const [filter, setFilter] = useState<PlacesFilterType>({});
  const [map, setMap] = useState<MapType>();
  const [bounds, setBounds] = useState<{
    top_right: string[];
    bottom_left: string[];
  }>();

  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const onAddButtonClick = useCallback(() => {
    if (user) {
      navigate(paths.newPlace);
    } else {
      enqueueSnackbar(formatMessage({ id: 'auth.error.loginNeeded' }));
      navigate(paths.login);
    }
  }, [navigate, user]);

  const [{ data, loading }, getPlaces] = api.places.useList({ manual: true });

  const onSearch = useCallback(
    ({ location }) => {
      console.log(location);
      const { x, y } = location;
      map?.setView([y, x], 18, { animate: true });
    },
    [map]
  );

  const whenCreated = useCallback(
    newMap => {
      setMap(newMap);
      updateBounds({ target: newMap });
    },
    [setMap]
  );

  const updateBounds = useCallback(({ target }) => {
    if (target) {
      const [left, bottom, right, top] = target
        .getBounds()
        .toBBoxString()
        .split(',');
      const top_right = [top, right];
      const bottom_left = [bottom, left];
      setBounds(prev => {
        if (top_right !== prev?.top_right || bottom_left !== prev?.bottom_left)
          return {
            top_right,
            bottom_left,
          };
        return prev;
      });
    }
  }, []);

  useEffect(() => {
    map?.addEventListener('moveend', updateBounds);
    return () => {
      map?.removeEventListener('moveend', updateBounds);
    };
  }, [map]);

  useEffect(() => {
    if (bounds)
      getPlaces({
        params: {
          ...filter,
          ...bounds,
        },
      });
  }, [getPlaces, filter, bounds]);

  const places = data?.data?.places || [];

  const role = user?.role;

  return (
    <HomePresentation
      whenCreated={whenCreated}
      onSearch={onSearch}
      role={role}
      filter={filter}
      setFilter={setFilter}
      formatMessage={formatMessage}
      places={places}
      loading={loading}
      onAddButtonClick={onAddButtonClick}
      goToPlace={(id: string) => navigate(paths.place(id))}
    />
  );
};
