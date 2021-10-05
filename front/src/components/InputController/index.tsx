import { useFormContext, Controller } from "react-hook-form";
import { Rules } from "../../types/Rules";
import { useInputHelper } from "../../hooks/useInputHelper";

type Props<ComponentType> = {
  name: string;
  labelMessage: string;
  disabled?: boolean;
  rules?: Rules;
  errorMessages?: { [ḱey: string]: string };
  component: ComponentType;
};

export const InputController = <ComponentType extends Function>({
  name,
  rules,
  labelMessage,
  errorMessages = {},
  component,
  ...props
}: Props<ComponentType>) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const inputProps = useInputHelper({
    labelMessage,
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
