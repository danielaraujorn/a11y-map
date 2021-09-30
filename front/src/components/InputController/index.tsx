import { useFormContext, Controller } from "react-hook-form";
import { Rules } from "../../types/Rules";
import { useInputHelper } from "../../hooks/useInputHelper";
import React from "react";

type Props<ComponentType> = {
  name: string;
  label: string;
  disabled?: boolean;
  rules?: Rules;
  errorMessages?: { [ḱey: string]: string };
  component: ComponentType;
};

export const InputController = <ComponentType extends Function>({
  name,
  rules,
  label,
  errorMessages = {},
  component,
  ...props
}: Props<ComponentType>) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const inputProps = useInputHelper({
    label,
    rules,
    errors: errors[name],
    errorMessages
  });
  const Component = component;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field }) => (
        <Component fullWidth {...props} {...field} {...inputProps} />
      )}
    />
  );
};
