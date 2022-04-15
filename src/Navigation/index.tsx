import { LinearProgress } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from '../screens/Home';
import { Login } from '../screens/Login';
import { NewPlace } from '../screens/NewPlace';
import { Places } from '../screens/Places';
import { Place } from '../screens/Place';
import { SignUp } from '../screens/SignUp';
import { paths } from './paths';
import { useAuth } from '../hooks/useAuth';
import { useOwnUser } from '../api';

export const Navigation = () => {
  useOwnUser();
  const { user, done } = useAuth();

  console.log(user);

  if (!done) return <LinearProgress />;

  if (user)
    return (
      <Routes>
        <Route path={paths.newPlace} element={<NewPlace />} />
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.places} element={<Places />} />
        <Route path={paths.place(':id')} element={<Place />} />
        <Route path="*" element={<Navigate replace to={paths.home} />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.signUp} element={<SignUp />} />
      <Route path="*" element={<Navigate replace to={paths.login} />} />
    </Routes>
  );
};
