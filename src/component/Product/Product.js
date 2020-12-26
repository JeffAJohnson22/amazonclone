import React, { useState } from 'react';
import "./Product.css";
import { useStateValue } from "../../context/StateProvider";
import Popup from '../Popup/Popup';

const Product = ({ product: { id, img, title, price, rating } }) => {

  const [{ basket }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
 

  const addToBasket = () => {
    // togglePopup()
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        img: img,
        title: title,
        price: price,
        rating: rating,
      },
    });

    <div>apple</div>
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          <p>{"⭐".repeat(rating)}</p>
        </div>
      </div>
      <img src={img} alt={title} />
      <button onClick={addToBasket}>add to basket</button>
      {isOpen && <Popup
      content={<>
        <b>Design your Popup</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut </p>
        <button>Test button</button>
      </>}
      handleClose={togglePopup}
    />}
    </div>
  );
};

export default Product;
