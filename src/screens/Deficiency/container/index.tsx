import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DeficiencyPresentation } from '../presentation';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';

export const DeficiencyContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) navigate(paths.home);
  });
  const [{ data, loading }] = api.deficiencies.useGet(id || '');

  return <DeficiencyPresentation loading={loading} data={data?.data} />;
};
