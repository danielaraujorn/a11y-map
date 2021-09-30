import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from "@mui/material";
import { forwardRef } from "react";
import { Rules } from "../../types/Rules";
import { InputController } from "../InputController";

const SelectComponent = forwardRef(
  (
    {
      label,
      disabled,
      options = [],
      helperText,
      error,
      ...props
    }: {
      name: string;
      label: string;
      helperText?: string;
      disabled?: boolean;
      error?: boolean;
      options?: { value: number | string; label: string }[];
    },
    ref: React.ForwardedRef<HTMLSelectElement>
  ) => (
    <FormControl fullWidth disabled={disabled} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} disabled={disabled} fullWidth {...props}>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
);

export const SelectInput = ({
  ...props
}: {
  name: string;
  label: string;
  multiple?: boolean;
  disabled?: boolean;
  options: { value: number | string; label: string }[];
  rules?: Rules;
}) => {
  return (
    <InputController<typeof SelectComponent>
      component={SelectComponent}
      {...props}
    />
  );
};
