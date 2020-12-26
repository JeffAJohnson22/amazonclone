import React from "react";
import amazonLogo from "../../images/amazon_logo.png";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import "./Header.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { authenticate } from "../../helpers/firebase";

const Header = () => {
  const [{ basket, user }] = useStateValue();

  const handleAuth = () => {
    if (user) {
      authenticate.signOut();
    }
  };

  return (
    <div className="header">
      <Link to={"/"}>
        <img className="header__logo" alt="amazon  logo" src={amazonLogo} />
      </Link>
      <EditLocationIcon className="header__location" />
      <div className="header__option">
        <span className="header__optionlineOne">Hello</span>
        <span className="header__optionlineTwo">Select your address</span>
      </div>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionlineOne">Translate</span>
        </div>

        <Link to={!user && "/login"}>
          <div className="header__option" onClick={handleAuth}>
            <span className="header__optionlineOne">{!user ? 'Hello User' : `Hello ${user.email}`}</span>
            <span className="header__optionlineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to={"/orders"}>
        <div className="header__option">
          <span className="header__optionlineOne">Returns</span>
          <span className="header__optionlineTwo">& Orders</span>
        </div>
        </Link>
        <div className="header__option">
          <span className="header__optionlineOne">Your</span>
          <span className="header__optionlineTwo">Prime</span>
        </div>

        <Link to={"/checkout"}>
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionlineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
