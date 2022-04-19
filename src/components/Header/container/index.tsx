import { MouseEvent, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useLogoutRequest } from '../../../api';

import { HeaderPresentation } from '../presentation';

export const HeaderContainer = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<
    HTMLButtonElement | undefined
  >(undefined);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(undefined);

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const { formatMessage } = useIntl();

  const navigate = useNavigate();

  const logout = useLogoutRequest();

  return (
    <HeaderPresentation
      navigate={navigate}
      formatMessage={formatMessage}
      handleMenu={handleMenu}
      handleMobileMenuClose={handleMobileMenuClose}
      mobileMoreAnchorEl={mobileMoreAnchorEl}
      logout={logout}
    />
  );
};
