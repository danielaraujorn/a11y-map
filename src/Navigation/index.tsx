import { Routes, Route, Navigate } from 'react-router-dom';
import { paths } from './paths';
import { Home } from '../screens/Home';
import { Login } from '../screens/Login';
import { NewPlace } from '../screens/NewPlace';
import { SignUp } from '../screens/SignUp';
import { Places } from '../screens/Places';
import { Place } from '../screens/Place';
import { useAuth } from '../hooks/useAuth';
import { LinearProgress } from '@mui/material';
import { usePlacesRequest } from '../api';

export const Navigation = () => {
  usePlacesRequest();
  const { logged, done } = useAuth();

  if (!done) return <LinearProgress />;
  if (logged)
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
