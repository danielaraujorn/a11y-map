import { LatLng, Map as MapType } from 'leaflet';
import { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import { NewPlaceParamsType } from '../../../types/Forms';
import { NewPlacePresentation } from '../presentation';
import { StatusEnum } from '../../../types/Models';
import { paths } from '../../../Navigation/paths';
import { useNewPlaceRequest } from '../../../api';
import { useSnackbar } from 'notistack';

export const NewPlaceContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const onCancelButtonClick = useCallback(() => {
    navigate(paths.home);
  }, [navigate]);
  const [, createPlace] = useNewPlaceRequest();
  const mapPosition = useRef<LatLng>();
  const { formatMessage } = useIntl();
  const methods = useForm<NewPlaceParamsType>({
    defaultValues: {
      // types: [],
      description: '',
      status: StatusEnum.IN_PROGRESS,
    },
  });
  const onSubmit = useCallback(async formData => {
    const { lat: latitude, lng: longitude } = mapPosition.current || {};
    const params: NewPlaceParamsType = {
      ...formData,
      latitude,
      longitude,
    };
    try {
      await createPlace({ params });
      enqueueSnackbar(formatMessage({ id: 'success.default' }));
      navigate(paths.home);
    } catch (e) {
      enqueueSnackbar(formatMessage({ id: 'error.default' }), {
        variant: 'error',
      });
    }
  }, []);
  const setPosition = useCallback((map: MapType) => {
    mapPosition.current = map.getCenter();
  }, []);
  return (
    <NewPlacePresentation
      setPosition={setPosition}
      onSubmit={onSubmit}
      methods={methods}
      formatMessage={formatMessage}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};
