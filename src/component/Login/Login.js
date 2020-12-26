import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { authenticate } from "../../helpers/firebase";
const amazonLogo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    authenticate
      .createUserWithEmailAsindPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  const signIn = (e) => {
    e.preventDefault();
    authenticate
    .signInWithEmailAndPassword(email, password)
    .then((auth) => {
      console.log(auth, 'auth')
      if (auth) {
        history.push("/");
      }
    }).catch((err) => alert(err.message));
  };

  
  return (
    <div className="login">
      <Link to={"/"}>
        <img className="login__logo" src={amazonLogo} alt="amazon logo" />
      </Link>

      <div className="login__container">
        <h1>Sign In</h1>

        <form>
          <h5>E-Mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login__signin" onClick={signIn}>
            <strong>Sign In</strong>
          </button>
        </form>

        <p>
          Bulbasaur Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Ivysaur Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Venusaur Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Charmander Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Charmeleon Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <button className="login__signup" onClick={signUp}>
          <strong>Create your Amazon Account</strong>
        </button>
      </div>
    </div>
  );
};

export default Login;
