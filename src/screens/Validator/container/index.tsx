import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserRequest } from '../../../api';
import { paths } from '../../../Navigation/paths';
import { ValidatorPresentation } from '../presentation';

export const ValidatorContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) navigate(paths.home);
  });
  const [{ data, loading }] = useUserRequest(id || '');

  console.log(data?.data);

  return <ValidatorPresentation loading={loading} data={data?.data} />;
};
