import NewDeficiency from '../../NewDeficiency';
import { LinearProgress } from '@mui/material';
import { DeficiencyType } from '../../../types/Models';

type DeficiencyPresentationType = {
  loading?: boolean;
  data?: DeficiencyType;
};

export const DeficiencyPresentation = ({
  loading,
  data,
}: DeficiencyPresentationType) => {
  if (loading) {
    return <LinearProgress />;
  }
  return <NewDeficiency defaultValues={data} />;
};
