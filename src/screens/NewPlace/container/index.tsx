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
  StatusEnum,
} from '../../../types/Models';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';
import { useAuth } from '../../../hooks/useAuth';
import { isValidator } from '../../../utils/isValidator';

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
    validator_comments: validator_comments || undefined,
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
    async ({ image, deficiencies, validator_comments, ...data }) => {
      const { lat: latitude, lng: longitude } = map?.getCenter() || {};
      const params: { [key: string]: string | number } = {
        ...data,
        latitude,
        longitude,
      };

      const formData = new FormData();
      if (image?.[0]) formData.append('image', image[0]);
      deficiencies.forEach((deficiency: string) => {
        formData.append(`deficiencies[]`, deficiency);
      });
      Object.entries(params).forEach(([key, value]) => {
        if (!!value || typeof value === 'number')
          formData.append(key, String(value));
      });
      if (isValidator(user?.role) && validator_comments)
        formData.append('validator_comments', String(validator_comments));

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
      role={user?.role}
      loading={loadingCreate || loadingPatch}
      update={!!defaultValues}
      mine={defaultValues?.user_id === user?.id}
      center={defaultCenter}
      onSubmit={onSubmit}
      setMap={setMap}
      hasDefaultFile={!!defaultValues?.image}
      methods={methods}
      formatMessage={formatMessage}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};
