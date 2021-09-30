import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { NewPoint } from "../screens/NewPoint";

export const Navigation = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/new-point">
          <NewPoint />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
