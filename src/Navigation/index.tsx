import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { paths } from './paths';
import { Home } from '../screens/Home';
import { Login } from '../screens/Login';
import { NewPoint } from '../screens/NewPoint';
import { SignUp } from '../screens/SignUp';

export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.signUp} element={<SignUp />} />
        <Route path={paths.newPoint} element={<NewPoint />} />
        <Route path={paths.home} element={<Home />} />
      </Routes>
    </Router>
  );
};
