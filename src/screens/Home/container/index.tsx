import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { HomePresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { usePlacesRequest } from '../../../api';
import { useIntl } from 'react-intl';
import { useAuth } from '../../../hooks/useAuth';

export const HomeContainer = () => {
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
