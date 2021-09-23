import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export const Input = ({
  name,
  ...props
}: {
  name: string;
  label: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => <TextField fullWidth {...props} {...field} />}
    />
  );
};
