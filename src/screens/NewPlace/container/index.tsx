import { LatLng, Map as MapType } from 'leaflet';
import { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { NewPlaceParamsType } from '../../../types/Forms';
import { NewPlacePresentation } from '../presentation';
import { PlaceModelType, StatusEnum } from '../../../types/Models';
import { paths } from '../../../Navigation/paths';
import { useCreatePlaceRequest, usePatchPlaceRequest } from '../../../api';

const formatDefaultValues = (
  defaultValues: PlaceModelType
): NewPlaceParamsType => {
  const { status, description, latitude, longitude } = defaultValues;
  return { status, description, latitude, longitude };
};

export const NewPlaceContainer = ({
  defaultValues,
}: {
  defaultValues?: PlaceModelType;
}) => {
  const formattedDefaultValues =
    defaultValues && formatDefaultValues(defaultValues);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const onCancelButtonClick = useCallback(() => {
    navigate(paths.home);
  }, [navigate]);
  const [, createPlace] = useCreatePlaceRequest();
  const [, patchPlace] = usePatchPlaceRequest(defaultValues?.id);
  const mapPosition = useRef<LatLng>();
  const { formatMessage } = useIntl();
  const methods = useForm<NewPlaceParamsType>({
    defaultValues: {
      // types: [],
      description: '',
      status: StatusEnum.IN_PROGRESS,
      ...(formattedDefaultValues || {}),
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
      if (defaultValues?.id) await patchPlace({ params });
      else await createPlace({ params });
      enqueueSnackbar(
        formatMessage(
          { id: 'success.default' },
          {
            variant: 'success',
          }
        )
      );
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
  const defaultCenter = defaultValues && {
    lat: defaultValues.latitude,
    lng: defaultValues.longitude,
  };

  return (
    <NewPlacePresentation
      update={!!defaultValues}
      center={defaultCenter}
      setPosition={setPosition}
      onSubmit={onSubmit}
      methods={methods}
      formatMessage={formatMessage}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};
