import { useCallback } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { ArrowLeft } from '@mui/icons-material';
import { paths } from '../../Navigation/paths';

export const BackButtonAppBar = ({
  titleMessage,
}: {
  titleMessage: string;
}) => {
  const navigate = useNavigate();
  const onBackButtonClick = useCallback(() => {
    navigate(paths.home);
  }, [navigate]);
  const { formatMessage } = useIntl();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={onBackButtonClick}>
          <ArrowLeft />
        </IconButton>
        <Typography component="h1" variant="h6">
          {formatMessage({ id: titleMessage })}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
