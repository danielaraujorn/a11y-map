import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { paths } from './paths';
import { Home } from '../screens/Home';
import { Login } from '../screens/Login';
import { NewPlace } from '../screens/NewPlace';
import { SignUp } from '../screens/SignUp';
import { Points } from '../screens/Points';

export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.signUp} element={<SignUp />} />
        <Route path={paths.newPlace} element={<NewPlace />} />
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.points} element={<Points />} />
      </Routes>
    </Router>
  );
};
