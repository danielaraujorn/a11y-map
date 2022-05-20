import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PlacePresentation } from '../presentation';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';

export const PlaceContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) navigate(paths.home);
  });
  const [{ data, loading }] = api.places.useGet(id || '');

  return <PlacePresentation loading={loading} data={data?.data} />;
};
