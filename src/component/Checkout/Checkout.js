import React from "react";
import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import { useStateValue } from "../../context/StateProvider";
import BasketItems from "./BasketItems/BasketItems";
import FlipMove from 'react-flip-move';
const banner =
  "https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg";

const Checkout = () => {
  const [{ basket, user }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" alt="checkout banner" src={banner} />
        <div>
        <h3>Hello {user ? user.email : 'User'}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          <FlipMove>
          {basket.map((items) => (
            <BasketItems key={items.id} items={items} />
          ))}
          </FlipMove>


        </div>
      </div>
      <div className="checkout__right">
        <Subtotal items={basket} />
      </div>
    </div>
  );
};

export default Checkout;
