import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ValidatorPresentation } from '../presentation';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';

export const ValidatorContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) navigate(paths.home);
  });
  const [{ data, loading }] = api.users.useGet(id || '');

  return <ValidatorPresentation loading={loading} data={data?.data} />;
};
