import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { createContext, ReactElement, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

type OptionsType = { title: string; description?: string };

export const ConfirmationContext = createContext<{
  showConfirmation: (options: OptionsType) => void;
}>({
  showConfirmation: () => {
    return;
  },
});

export const ConfirmationProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [confirmation, setConfirmation] = useState<
    | {
        options: OptionsType;
        resolve: (value?: unknown) => void;
        reject: () => void;
      }
    | undefined
  >();

  const { options, resolve, reject } = confirmation || {};

  const showConfirmation = useCallback((options: OptionsType) => {
    return new Promise((resolve, reject) => {
      setConfirmation({ options, resolve, reject });
    });
  }, []);

  const handleClose = useCallback(() => {
    setConfirmation(undefined);
  }, []);

  const handleCancel = useCallback(() => {
    if (reject) {
      reject();
      handleClose();
    }
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve();
      handleClose();
    }
  }, [resolve, handleClose]);

  const { title, description } = options || {};

  const { formatMessage } = useIntl();

  const confirmButtonTitle = formatMessage({ id: 'confirm' });
  const cancelButtonTitle = formatMessage({ id: 'cancel' });

  return (
    <ConfirmationContext.Provider
      value={{
        showConfirmation,
      }}
    >
      <Dialog
        open={!!options && !!resolve && !!reject}
        onClose={handleCancel}
        aria-labelledby="confirm-dialog"
      >
        <DialogTitle id="confirm-dialog">{title}</DialogTitle>
        {description && (
          <DialogContent>
            <Typography>{description}</Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button aria-label={confirmButtonTitle} onClick={handleConfirm}>
            {confirmButtonTitle}
          </Button>
          <Button
            aria-label={cancelButtonTitle}
            variant="contained"
            onClick={handleCancel}
            color="primary"
          >
            {cancelButtonTitle}
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </ConfirmationContext.Provider>
  );
};
