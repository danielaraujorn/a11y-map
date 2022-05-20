import { MouseEvent, ReactNode, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { RoleEnum } from '../../../types/Models';
import { HeaderPresentation } from '../presentation';
import { api } from '../../../api';
import { useAuth } from '../../../hooks/useAuth';

type HeaderContainerProps = {
  titleMessage: string;
  backButtonPath?: string;
  rightActions?: ReactNode;
};

export const HeaderContainer = ({
  titleMessage,
  backButtonPath,
  rightActions,
}: HeaderContainerProps) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<
    HTMLButtonElement | undefined
  >(undefined);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(undefined);

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const logout = api.auth.useLogout();

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
      isValidator={role === RoleEnum.VALIDATOR}
      navigate={navigate}
      formatMessage={formatMessage}
      handleMenu={handleMenu}
      handleMobileMenuClose={handleMobileMenuClose}
      mobileMoreAnchorEl={mobileMoreAnchorEl}
      logout={logout}
      rightActions={rightActions}
    />
  );
};
