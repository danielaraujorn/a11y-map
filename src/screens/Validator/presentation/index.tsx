import NewValidator from '../../NewValidator';
import { LinearProgress } from '@mui/material';
import { UserType } from '../../../types/Models';

type ValidatorPresentationType = {
  loading?: boolean;
  data?: UserType;
};

export const ValidatorPresentation = ({
  loading,
  data,
}: ValidatorPresentationType) => {
  if (loading) {
    return <LinearProgress />;
  }
  return <NewValidator defaultValues={data} />;
};
