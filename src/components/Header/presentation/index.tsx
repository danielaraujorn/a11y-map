import { MouseEvent } from 'react';
import {
  AccountCircle,
  HowToReg,
  Logout,
  // Menu as MenuIcon,
  // Search as SearchIcon,
  ViewList,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
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
  isAdmin?: boolean;
};

export const HeaderPresentation = ({
  isAdmin,
  formatMessage,
  navigate,
  handleMobileMenuClose,
  mobileMoreAnchorEl,
  handleMenu,
  logout,
}: HeaderPresentationPropType) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          A11Y-MAP
        </Typography>
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search> */}
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="open menu"
          sx={{ ml: 2 }}
          onClick={handleMenu}
        >
          <AccountCircle />
        </IconButton>
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
      {isAdmin && (
        <MenuItem sx={{ pr: 3 }} onClick={() => navigate(paths.validators)}>
          <IconButton
            disableRipple
            aria-label={formatMessage({ id: 'user.validators' })}
            color="inherit"
          >
            <HowToReg />
          </IconButton>
          <p>{formatMessage({ id: 'user.validators' })}</p>
        </MenuItem>
      )}
      <MenuItem sx={{ pr: 3 }} onClick={() => navigate(paths.places)}>
        <IconButton
          disableRipple
          aria-label={formatMessage({ id: 'place.my_places' })}
          color="inherit"
        >
          <ViewList />
        </IconButton>
        <p>{formatMessage({ id: 'place.my_places' })}</p>
      </MenuItem>
      <MenuItem sx={{ pr: 3 }} onClick={logout}>
        <IconButton
          disableRipple
          aria-label={formatMessage({ id: 'auth.signOut' })}
          color="inherit"
        >
          <Logout />
        </IconButton>
        <p>{formatMessage({ id: 'auth.signOut' })}</p>
      </MenuItem>
    </Menu>
  </Box>
);
