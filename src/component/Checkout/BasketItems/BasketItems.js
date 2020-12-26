import React from "react";
import { useStateValue } from "../../../context/StateProvider";
import "./BasketItems.css";

const Basket = ({ items: { id, img, title, price, rating } }) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="basket hover14">
      <figure><img className="basket__image" src={img} alt={title} /></figure>
      <div className="basket__info">
        <p className="basket__title">{title}</p>
        <p className="basket__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="basket__rating">
          <p>{"⭐".repeat(rating)}</p>
        </div>
        <button onClick={removeFromBasket}>
          <strong>remove from basket</strong>
        </button>
      </div>
    </div>
  );
};

export default Basket;
