import { Map as MapType } from 'leaflet';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { NewPlaceParamsType } from '../../../types/Forms';
import { NewPlacePresentation } from '../presentation';
import {
  BarrierLevelEnum,
  PlaceModelType,
  RoleEnum,
  StatusEnum,
} from '../../../types/Models';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';
import { useAuth } from '../../../hooks/useAuth';

const formatDefaultValues = (
  defaultValues: PlaceModelType
): NewPlaceParamsType => {
  const {
    status,
    description,
    latitude,
    longitude,
    validator_comments,
    deficiencies,
    barrier_level,
    image,
  } = defaultValues;
  return {
    status,
    description,
    latitude,
    longitude,
    validator_comments,
    barrier_level,
    image: image || undefined,
    deficiencies: deficiencies.map(({ id }) => id),
  };
};

export const NewPlaceContainer = ({
  defaultValues,
}: {
  defaultValues?: PlaceModelType;
}) => {
  const { user } = useAuth();

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
      validator_comments: '',
      description: '',
      status: StatusEnum.IN_PROGRESS,
      deficiencies: [],
      barrier_level: BarrierLevelEnum.BAD,
      ...(formattedDefaultValues || {}),
    },
  });
  const onSubmit = useCallback(
    async ({ image, deficiencies, ...data }) => {
      const { lat: latitude, lng: longitude } = map?.getCenter() || {};
      const params: { [key: string]: string | number } = {
        ...data,
        latitude,
        longitude,
      };

      const formData = new FormData();
      formData.append('image', image[0]);
      deficiencies.forEach((deficiency: string) => {
        formData.append(`deficiencies[]`, deficiency);
      });
      Object.entries(params).forEach(([key, value]) => {
        if (typeof value !== 'undefined') formData.append(key, String(value));
      });

      try {
        if (defaultValues?.id) await patchPlace({ data: formData });
        else await createPlace({ data: formData });
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
      validator_comments={formattedDefaultValues?.validator_comments}
      role={user?.role}
      loading={loadingCreate || loadingPatch}
      update={!!defaultValues}
      mine={defaultValues?.user_id === user?.id}
      center={defaultCenter}
      onSubmit={onSubmit}
      setMap={setMap}
      methods={methods}
      formatMessage={formatMessage}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};
