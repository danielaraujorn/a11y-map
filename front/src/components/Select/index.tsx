import { useFormContext, Controller } from "react-hook-form";
import {
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

export const Select = ({
  name,
  options,
  label,
  disabled,
  ...props
}: {
  name: string;
  label: string;
  multiple?: boolean;
  disabled?: boolean;
  options: { value: number | string; label: string }[];
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormControl fullWidth disabled={disabled}>
          <InputLabel>{label}</InputLabel>
          <MuiSelect
            label={label}
            disabled={disabled}
            fullWidth
            {...props}
            {...field}
          >
            {options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </MuiSelect>
        </FormControl>
      )}
    />
  );
};
