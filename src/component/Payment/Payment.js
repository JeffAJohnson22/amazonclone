import React, { useState, useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import BasketItems from "../Checkout/BasketItems/BasketItems";
import { Link, useHistory } from "react-router-dom";
import "./Payment.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { instance } from '../../helpers/axios'

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory()
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  let value = basket.map(({ price }) => {
    return price;
  });

  let newValue = value.reduce((acc, cv) => {
    return acc + cv;
  }, 0);

  const func = (v) => {
    let need = String(v).replace(/[$,]/gi,'')
    let other =(need * 100).toFixed(0)
    return Number(other)
    }


  useEffect(() => {
    const getClientSecret = async () => {
      const res = await instance({
        method: "post",
        url: `payment/create?total=${func(newValue)}`,
      });
      setClientSecret(res.data.clientSecret);
    };
    getClientSecret();
  }, [basket, newValue]);

  console.log('the secret is' , clientSecret)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    }).then(({paymentIntent}) => {
      setSucceeded(true)
      setError(null)
      setProcessing(false)

      dispatch({
        type: 'CLEAR_BASKET'
      })

      history.replace('/orders')
    });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout ({" "}
          <Link to={"/checkout"}>
            {" "}
            {basket.length === 0
              ? "No items in Cart"
              : basket.length + " items"}
          </Link>
          )
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email || "User"}</p>
            <p>123 Location</p>
            <p>South Korea</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((items) => (
              <BasketItems items={items} />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__price">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={newValue}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>

                {error && <div>{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
