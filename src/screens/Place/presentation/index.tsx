import { LinearProgress } from '@mui/material';
import { NewPlace } from '../../NewPlace';
import { PlaceModelType } from '../../../types/Models';

type PlacePresentationType = {
  loading?: boolean;
  data?: PlaceModelType;
};

export const PlacePresentation = ({ loading, data }: PlacePresentationType) => {
  if (loading) {
    return <LinearProgress />;
  }
  return <NewPlace defaultValues={data} />;
};
