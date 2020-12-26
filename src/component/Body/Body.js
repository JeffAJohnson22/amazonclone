import React from "react";
import "./Body.css";
import Product from "../Product/Product";

import { firstRow, secondRow, lastRow, hero } from "./items";

const Body = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" alt="amazon landing page" src={hero} />
        <div className="home__row">
          {firstRow.map((product, i) => (
            <Product product={product} />
          ))}
        </div>
        <div className="home__row">
          {secondRow.map((product) => (
            <Product product={product} />
          ))}
        </div>
        <div className="home__row">
          {lastRow.map((product) => (
            <Product product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
