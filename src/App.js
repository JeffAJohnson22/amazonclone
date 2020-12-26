import React, { useEffect } from "react";
import Header from "./component//Header/Header";
import Body from "./component//Body/Body";
import Checkout from "./component//Checkout/Checkout";
import Login from "./component/Login/Login";
import { authenticate } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";

const App = () => {
  const [action, dispatch] = useStateValue();

  useEffect(() => {
    authenticate.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Body />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
