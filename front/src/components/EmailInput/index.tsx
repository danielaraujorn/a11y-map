import { Input } from "../Input";
import { Rules } from "../../types/Rules";

export const EmailInput = ({
  rules,
  ...props
}: {
  disabled?: boolean;
  rules?: Rules;
}) => {
  const emailRules = {
    required: true,
    ...rules,
    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  };
  return (
    <Input
      name="email"
      labelMessage="email"
      rules={emailRules}
      errorMessages={{
        pattern: "error.notAnEmail"
      }}
      {...props}
    />
  );
};
