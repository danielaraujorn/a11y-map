import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DeficiencyPresentation } from '../presentation';
import { paths } from '../../../Navigation/paths';
import { useDeficiencyRequest } from '../../../api';

export const DeficiencyContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) navigate(paths.home);
  });
  const [{ data, loading }] = useDeficiencyRequest(id || '');

  return <DeficiencyPresentation loading={loading} data={data?.data} />;
};
