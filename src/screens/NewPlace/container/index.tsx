import { Map as MapType } from 'leaflet';
import { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import { NewPlacePresentation } from '../presentation';
import { NewPlaceParamsType } from '../../../api';
import { paths } from '../../../Navigation/paths';

export const NewPlaceContainer = () => {
  const navigate = useNavigate();
  const onCancelButtonClick = useCallback(() => {
    navigate(paths.home);
  }, [navigate]);
  const mapPosition = useRef({});
  const { formatMessage } = useIntl();
  const methods = useForm<NewPlaceParamsType>({
    defaultValues: {
      // types: [],
      description: '',
      // status: 1,
    },
  });
  const onSubmit = useCallback(formData => {
    const data = { ...formData, location: mapPosition.current };
    console.log(data);
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
