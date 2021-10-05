import { useState, useCallback, forwardRef } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { InputController } from "../InputController";
import { Rules } from "../../types/Rules";

const PasswordComponent = forwardRef(
  (props: object, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = useCallback(
      () => setShowPassword((prev) => !prev),
      [setShowPassword]
    );

    return (
      <TextField
        ref={ref}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        {...props}
      />
    );
  }
);

export const PasswordInput = ({
  rules,
  ...props
}: {
  disabled?: boolean;
  rules?: Rules;
}) => {
  return (
    <InputController<typeof PasswordComponent>
      name="password"
      labelMessage="password"
      component={PasswordComponent}
      rules={{
        ...rules,
        required: true
      }}
      {...props}
    />
  );
};

export const PasswordConfirmationInput = ({
  rules,
  ...props
}: {
  disabled?: boolean;
  rules?: Rules;
}) => {
  return (
    <InputController<typeof PasswordComponent>
      name="passwordConfirmation"
      labelMessage="confirmPassword"
      rules={{
        ...rules,
        required: true,
        validate: (value) => value.length > 4
      }}
      errorMessages={{ validate: "error.passwordConfirmation" }}
      component={PasswordComponent}
      {...props}
    />
  );
};
