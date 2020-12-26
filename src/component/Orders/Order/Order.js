import React from "react";
import "./Order.css";
import moment from "moment";
import BasketItems from "../../Checkout/BasketItems/BasketItems";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
  const { created, amount } = order.data;

  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className='order__id'>
        <small>{order.id}</small>
      </p>

      {order.data.basket?.map((items) => (
        <BasketItems items={items} created={created} />
      ))}
      <CurrencyFormat
        renderText={(amount) => (
          <>
            <p>
              <h3 className='order__total'>Order total: {amount} </h3>
            </p>
          </>
        )}
        decimalScale={2}
        value={amount/100}
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
      />
    </div>
  );
};

export default Order;
