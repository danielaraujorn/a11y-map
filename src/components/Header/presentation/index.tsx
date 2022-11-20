import { MouseEvent, ReactNode } from 'react';
import {
  Accessible,
  AccountCircle,
  ArrowLeft,
  HowToReg,
  Logout,
  ViewList,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { MessageDescriptor } from 'react-intl';

import { paths } from '../../../Navigation/paths';

type HeaderPresentationPropType = {
  navigate: (path: string) => void;
  formatMessage: (descriptor: MessageDescriptor) => string;
  handleMobileMenuClose: () => void;
  mobileMoreAnchorEl: HTMLButtonElement | undefined;
  handleMenu: (event: MouseEvent<HTMLButtonElement>) => void;
  logout: () => void;
  isLogged?: boolean;
  isAdmin?: boolean;
  isValidator?: boolean;
  titleMessage: string;
  onBackButtonClick?: () => void;
  leftActions?: ReactNode;
  rightActions?: ReactNode;
};

export const HeaderPresentation = ({
  isLogged,
  isAdmin,
  formatMessage,
  navigate,
  handleMobileMenuClose,
  mobileMoreAnchorEl,
  handleMenu,
  logout,
  titleMessage,
  onBackButtonClick,
  leftActions,
  rightActions,
}: HeaderPresentationPropType) => {
  const loginButtonTitle = formatMessage({ id: 'auth.login' });
  const validatorsButtonTitle = formatMessage({ id: 'user.validators' });
  const deficienciesButtonTitle = formatMessage({ id: 'deficiencies' });
  const myPlacesButtonTitle = formatMessage({ id: 'place.not_validated' });
  const signOutButtonTitle = formatMessage({ id: 'auth.signOut' });

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          {onBackButtonClick && (
            <IconButton
              sx={{ marginRight: 1 }}
              aria-label={formatMessage({ id: 'goBack' })}
              onClick={onBackButtonClick}
            >
              <ArrowLeft />
            </IconButton>
          )}
          <Typography component="h1" variant="h6">
            {formatMessage({ id: titleMessage })}
          </Typography>
          <Box sx={{ marginRight: 'auto', flex: 1, display: 'flex' }}>
            {leftActions}
          </Box>
          {rightActions}
          {isLogged ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label={formatMessage({ id: 'menu.open' })}
                sx={{ ml: 2 }}
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <Button
              aria-label={loginButtonTitle}
              variant="outlined"
              color="inherit"
              onClick={() => navigate(paths.login)}
            >
              {loginButtonTitle}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={'account-primary-menu'}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(mobileMoreAnchorEl)}
        onClose={handleMobileMenuClose}
      >
        {isAdmin && [
          <MenuItem
            key="validators"
            sx={{ pr: 3 }}
            onClick={() => navigate(paths.validators)}
          >
            <IconButton
              disableRipple
              aria-label={validatorsButtonTitle}
              color="inherit"
            >
              <HowToReg />
            </IconButton>
            <p>{validatorsButtonTitle}</p>
          </MenuItem>,
          <MenuItem
            key="deficiencies"
            sx={{ pr: 3 }}
            onClick={() => navigate(paths.deficiencies)}
          >
            <IconButton
              disableRipple
              aria-label={deficienciesButtonTitle}
              color="inherit"
            >
              <Accessible />
            </IconButton>
            <p>{deficienciesButtonTitle}</p>
          </MenuItem>,
        ]}
        <MenuItem sx={{ pr: 3 }} onClick={() => navigate(paths.places)}>
          <IconButton
            disableRipple
            aria-label={myPlacesButtonTitle}
            color="inherit"
          >
            <ViewList />
          </IconButton>
          <p>{myPlacesButtonTitle}</p>
        </MenuItem>
        <MenuItem sx={{ pr: 3 }} onClick={logout}>
          <IconButton
            disableRipple
            aria-label={signOutButtonTitle}
            color="inherit"
          >
            <Logout />
          </IconButton>
          <p>{signOutButtonTitle}</p>
        </MenuItem>
      </Menu>
    </Box>
  );
};
