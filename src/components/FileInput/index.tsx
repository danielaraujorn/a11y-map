import { FormControl, FormHelperText, Button } from '@mui/material';
import { Rules } from '../../types/Rules';
import { useFormContext } from 'react-hook-form';
import { useInputHelper } from '../../hooks/useInputHelper';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

const imagePrefix = process.env.REACT_APP_IMAGES_PREFIX;

// const FileComponent = forwardRef<
//   HTMLInputElement,
//   {
//     name: string;
//     label: string;
//     helperText?: string;
//     disabled?: boolean;
//     error?: boolean;
//   }
// >(({ label, disabled, helperText, error, ...props }, ref) => (
//   <FormControl disabled={disabled} error={error}>
//     <label htmlFor="upload-photo">
//       <input
//         ref={ref}
//         disabled={disabled}
//         {...props}
//         style={{ display: 'none' }}
//         id="upload-photo"
//         type="file"
//       />
//       <Button
//         color={error ? 'error' : 'secondary'}
//         variant="contained"
//         component="span"
//       >
//         {label}
//       </Button>
//     </label>
//     {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
//   </FormControl>
// ));

// export const FileInput = ({
//   ...props
// }: {
//   name: string;
//   labelMessage: string;
//   multiple?: boolean;
//   disabled?: boolean;
//   value?: unknown;
//   rules?: Rules;
//   accept?: string;
// }) => {
//   return (
//     <InputController<typeof FileComponent>
//       component={FileComponent}
//       {...props}
//     />
//   );
// };

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
  console.log(files);
  const imageSrc =
    files &&
    (Array.isArray(files)
      ? files?.length > 0 && URL.createObjectURL(files[0])
      : files.file_name && `${imagePrefix}${files.file_name}`);

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
