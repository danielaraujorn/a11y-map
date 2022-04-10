import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePlaceRequest } from '../../../api';
import { paths } from '../../../Navigation/paths';
import { PlacePresentation } from '../presentation';

export const PlaceContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) navigate(paths.home);
  });
  const [{ data, loading }] = usePlaceRequest(id || '');

  return <PlacePresentation loading={loading} data={data?.data} />;
};
