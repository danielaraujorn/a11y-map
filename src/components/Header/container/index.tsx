import { MouseEvent, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useLogoutRequest } from '../../../api';
import { useAuth } from '../../../hooks/useAuth';
import { RoleEnum } from '../../../types/Models';

import { HeaderPresentation } from '../presentation';

type HeaderContainerProps = {
  titleMessage: string;
  backButtonPath?: string;
};

export const HeaderContainer = ({
  titleMessage,
  backButtonPath,
}: HeaderContainerProps) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<
    HTMLButtonElement | undefined
  >(undefined);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(undefined);

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const logout = useLogoutRequest();

  const { user } = useAuth();
  const role = user?.role;

  const onBackButtonClick = useCallback(() => {
    backButtonPath && navigate(backButtonPath);
  }, [navigate, backButtonPath]);

  return (
    <HeaderPresentation
      onBackButtonClick={backButtonPath ? onBackButtonClick : undefined}
      titleMessage={titleMessage}
      isLogged={!!user}
      isAdmin={role === RoleEnum.ADMIN}
      navigate={navigate}
      formatMessage={formatMessage}
      handleMenu={handleMenu}
      handleMobileMenuClose={handleMobileMenuClose}
      mobileMoreAnchorEl={mobileMoreAnchorEl}
      logout={logout}
    />
  );
};
