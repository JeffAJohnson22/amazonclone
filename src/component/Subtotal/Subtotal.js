import React from "react";
import CurrencyFormat from 'react-currency-format';
import "./Subtotal.css";
import { Link, useHistory } from "react-router-dom";

const Subtotal = ({ items }) => {
  const history = useHistory();

  let value = items.map(({ price }) => {
    return price;
  });

  let newValue = value.reduce((acc, cv) => {
    return acc + cv;
  }, 0);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(newValue) => (
          <>
            <p>
              Subtotal ({items.length} items) :
              <strong>{`${newValue}`} </strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={newValue}
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
      />

      <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
