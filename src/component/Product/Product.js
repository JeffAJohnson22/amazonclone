import React from "react";
import "./Product.css";
import { useStateValue } from "../../context/StateProvider";

const Product = ({ product: { id, img, title, price, rating } }) => {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
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
    </div>
  );
};

export default Product;
