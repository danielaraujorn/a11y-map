import { TextField } from '@mui/material';
import { Rules } from '../../types/Rules';
import { InputController } from '../InputController';

export const Input = ({
  ...props
}: {
  name: string;
  labelMessage: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  rules?: Rules;
  errorMessages?: { [ḱey: string]: string };
  disabled?: boolean;
}) => {
  return <InputController<typeof TextField> component={TextField} {...props} />;
};
