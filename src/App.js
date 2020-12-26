import React, { useEffect } from "react";
import Header from "./component//Header/Header";
import Body from "./component//Body/Body";
import Checkout from "./component//Checkout/Checkout";
import Login from "./component/Login/Login";
import Payment from "./component/Payment/Payment";
import Orders from "./component/Orders/Orders";

import { authenticate } from "./helpers/firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_ju0iMKKhjVefJJFJUcbKbgWP00Rb7RDyp8");

const App = () => {
  const [ {} ,  dispatch] = useStateValue();

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
    //possible 
  }, [dispatch]);

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
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
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
