import { Map as MapType } from 'leaflet';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { NewPlaceParamsType } from '../../../types/Forms';
import { NewPlacePresentation } from '../presentation';
import { PlaceModelType, StatusEnum } from '../../../types/Models';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';

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
  const [{ loading: loadingCreate }, createPlace] = api.places.useCreate();
  const [{ loading: loadingPatch }, patchPlace] = api.places.usePatch(
    defaultValues?.id
  );
  const [map, setMap] = useState<MapType | undefined>();
  const { formatMessage } = useIntl();
  const methods = useForm<NewPlaceParamsType>({
    defaultValues: {
      // types: [],
      description: '',
      status: StatusEnum.IN_PROGRESS,
      ...(formattedDefaultValues || {}),
    },
  });
  const onSubmit = useCallback(
    async formData => {
      console.log(map);
      const { lat: latitude, lng: longitude } = map?.getCenter() || {};
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
            { id: 'success.default.save' },
            {
              variant: 'success',
            }
          )
        );
        navigate(paths.home);
      } catch (e) {
        enqueueSnackbar(formatMessage({ id: 'error.default.save' }), {
          variant: 'error',
        });
      }
    },
    [map]
  );

  const defaultCenter = defaultValues && {
    lat: defaultValues.latitude,
    lng: defaultValues.longitude,
  };

  return (
    <NewPlacePresentation
      loading={loadingCreate || loadingPatch}
      update={!!defaultValues}
      center={defaultCenter}
      onSubmit={onSubmit}
      setMap={setMap}
      methods={methods}
      formatMessage={formatMessage}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};
