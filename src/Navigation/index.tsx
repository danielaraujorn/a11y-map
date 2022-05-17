import { LinearProgress } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useMemo } from 'react';

import { RoleEnum } from '../types/Models';
import { paths } from './paths';
import { useAuth } from '../hooks/useAuth';
import { useOwnUser } from '../api';

const ForgotPassword = lazy(() => import('../screens/ForgotPassword'));
const Home = lazy(() => import('../screens/Home'));
const Login = lazy(() => import('../screens/Login'));
const NewPassword = lazy(() => import('../screens/NewPassword'));
const NewPlace = lazy(() => import('../screens/NewPlace'));
const NewValidator = lazy(() => import('../screens/NewValidator'));
const Place = lazy(() => import('../screens/Place'));
const Places = lazy(() => import('../screens/Places'));
const SignUp = lazy(() => import('../screens/SignUp'));
const Validators = lazy(() => import('../screens/Validators'));

export const Navigation = () => {
  useOwnUser();
  const { user, done } = useAuth();

  const publicRoutes = useMemo(
    () => (
      <>
        <Route path={paths.home} element={<Home />} />
        <Route path="*" element={<Navigate replace to={paths.home} />} />
      </>
    ),
    []
  );

  if (!done) return <LinearProgress />;
  const isAdmin = user?.role === RoleEnum.ADMIN;

  if (user)
    return (
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route path={paths.newPlace} element={<NewPlace />} />
          <Route path={paths.places} element={<Places />} />
          <Route path={paths.place(':id')} element={<Place />} />
          {isAdmin && (
            <Route path={paths.validators} element={<Validators />} />
          )}
          {isAdmin && (
            <Route path={paths.newValidator} element={<NewValidator />} />
          )}
          {publicRoutes}
        </Routes>
      </Suspense>
    );

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.signUp} element={<SignUp />} />
        <Route path={paths.forgotPassword} element={<ForgotPassword />} />
        <Route path={paths.newPassword} element={<NewPassword />} />
        {publicRoutes}
      </Routes>
    </Suspense>
  );
};
