import { LinearProgress } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ForgotPassword } from '../screens/ForgotPassword';
import { Home } from '../screens/Home';
import { Login } from '../screens/Login';
import { NewPassword } from '../screens/NewPassword';
import { NewPlace } from '../screens/NewPlace';
import { NewValidator } from '../screens/NewValidator';
import { Places } from '../screens/Places';
import { Place } from '../screens/Place';
import { SignUp } from '../screens/SignUp';
import { RoleEnum } from '../types/Models';
import { Validators } from '../screens/Validators';
import { paths } from './paths';
import { useAuth } from '../hooks/useAuth';
import { useOwnUser } from '../api';

export const Navigation = () => {
  useOwnUser();
  const { user, done } = useAuth();

  if (!done) return <LinearProgress />;
  const isAdmin = user?.role === RoleEnum.ADMIN;

  if (user)
    return (
      <Routes>
        <Route path={paths.newPlace} element={<NewPlace />} />
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.places} element={<Places />} />
        <Route path={paths.place(':id')} element={<Place />} />
        {isAdmin && <Route path={paths.validators} element={<Validators />} />}
        {isAdmin && (
          <Route path={paths.newValidator} element={<NewValidator />} />
        )}
        <Route path="*" element={<Navigate replace to={paths.home} />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.signUp} element={<SignUp />} />
      <Route path={paths.forgotPassword} element={<ForgotPassword />} />
      <Route path={paths.newPassword} element={<NewPassword />} />
      <Route path="*" element={<Navigate replace to={paths.login} />} />
    </Routes>
  );
};
