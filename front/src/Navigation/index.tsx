import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { paths } from "./paths";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { NewPoint } from "../screens/NewPoint";
import { SignUp } from "../screens/SignUp";

export const Navigation = () => {
  return (
    <Router>
      <Switch>
        <Route path={paths.login}>
          <Login />
        </Route>
        <Route path={paths.signUp}>
          <SignUp />
        </Route>
        <Route path={paths.newPoint}>
          <NewPoint />
        </Route>
        <Route path={paths.home}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
