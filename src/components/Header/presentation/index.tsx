import { MouseEvent } from 'react';
import {
  Accessible,
  AccountCircle,
  ArrowLeft,
  HowToReg,
  Logout,
  // Menu as MenuIcon,
  // Search as SearchIcon,
  ViewList,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  // InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { MessageDescriptor } from 'react-intl';
// import { styled, alpha } from '@mui/material/styles';

import { paths } from '../../../Navigation/paths';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

type HeaderPresentationPropType = {
  navigate: (path: string) => void;
  formatMessage: (descriptor: MessageDescriptor) => string;
  handleMobileMenuClose: () => void;
  mobileMoreAnchorEl: HTMLButtonElement | undefined;
  handleMenu: (event: MouseEvent<HTMLButtonElement>) => void;
  logout: () => void;
  isLogged?: boolean;
  isAdmin?: boolean;
  titleMessage: string;
  onBackButtonClick?: () => void;
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
}: HeaderPresentationPropType) => {
  const loginButtonTitle = formatMessage({ id: 'auth.loginTitle' });
  const validatorsButtonTitle = formatMessage({ id: 'user.validators' });
  const deficienciesButtonTitle = formatMessage({ id: 'deficiencies' });
  const myPlacesButtonTitle = formatMessage({ id: 'place.not_validated' });
  const signOutButtonTitle = formatMessage({ id: 'auth.signOut' });

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
          {onBackButtonClick && (
            <IconButton
              aria-label={formatMessage({ id: 'goBack' })}
              onClick={onBackButtonClick}
            >
              <ArrowLeft />
            </IconButton>
          )}
          <Typography component="h1" variant="h6">
            {formatMessage({ id: titleMessage })}
          </Typography>
          {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
          />
        </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          {isLogged ? (
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
