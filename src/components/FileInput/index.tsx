import { FormControl, FormHelperText, Button } from '@mui/material';
import { Rules } from '../../types/Rules';
import { useFormContext } from 'react-hook-form';
import { useInputHelper } from '../../hooks/useInputHelper';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { useMemo } from 'react';

const FilePreview = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(),
  marginBottom: theme.spacing(),
  maxWidth: '100%',
  maxHeight: 300,
}));

export const FileInput = ({
  name,
  rules,
  disabled,
  errorMessages = {},
  labelMessage,
  ...props
}: {
  name: string;
  labelMessage: string;
  multiple?: boolean;
  disabled?: boolean;
  rules?: Rules;
  accept?: string;
  errorMessages?: { [ḱey: string]: string };
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const { formatMessage } = useIntl();
  const files = watch(name);

  const imageSrc = useMemo(() => {
    if (files?.length > 0) {
      console.log('é array');
      return URL.createObjectURL(files[0]);
    } else if (files?.file_name) {
      return `${process.env.REACT_APP_IMAGES_PREFIX}${files.file_name}`;
    }
    return undefined;
  }, [files]);

  const { error, helperText } = useInputHelper({
    labelMessage,
    rules,
    errors: errors[name],
    errorMessages,
  });
  return (
    <FormControl disabled={disabled} error={error}>
      <label htmlFor="upload-photo">
        {imageSrc && (
          <>
            <FilePreview src={imageSrc} />
            <br />
          </>
        )}
        {!disabled && (
          <>
            <input
              disabled={disabled}
              {...register(name, rules)}
              id="upload-photo"
              type="file"
              style={{ display: 'none' }}
              {...props}
            />
            <Button
              color={error ? 'error' : 'secondary'}
              variant="contained"
              component="span"
            >
              {formatMessage({ id: labelMessage })}
            </Button>
          </>
        )}
      </label>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
