import { useState, useCallback, forwardRef } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { InputController } from '../InputController';
import { useFormContext } from 'react-hook-form';

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
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleClickShowPassword} edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    );
  }
);

export const PasswordInput = ({ ...props }: { disabled?: boolean }) => {
  const rules = {
    required: true,
    minLength: 8,
    maxLength: 32,
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  };
  return (
    <InputController<typeof PasswordComponent>
      name='password'
      labelMessage='password'
      component={PasswordComponent}
      rules={rules}
      errorMessages={{
        pattern: 'error.weakPassword',
        minLength: 'error.smallPassword',
        maxLength: 'error.bigPassword',
      }}
      {...props}
    />
  );
};

export const PasswordConfirmationInput = ({
  ...props
}: {
  disabled?: boolean;
}) => {
  const { getValues } = useFormContext();
  const validate = useCallback(
    (passwordConfirmation: string) => {
      const password = getValues('password');
      return passwordConfirmation === password;
    },
    [getValues]
  );
  const rules = {
    required: true,
    validate,
  };
  return (
    <InputController<typeof PasswordComponent>
      name='passwordConfirmation'
      labelMessage='confirmPassword'
      rules={rules}
      errorMessages={{ validate: 'error.passwordConfirmation' }}
      component={PasswordComponent}
      {...props}
    />
  );
};
