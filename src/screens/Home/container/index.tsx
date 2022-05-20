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

  useEffect(() => {
    getPlaces({ params: filter });
  }, [getPlaces, filter]);

  const places = data?.data?.places || [];

  const role = user?.role;

  return (
    <HomePresentation
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
