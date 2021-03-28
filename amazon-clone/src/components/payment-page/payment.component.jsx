import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CardElement } from '@stripe/react-stripe-js';
import CheckoutProduct from '../checkoutProduct/checkoutproduct.component';
import { useStateValue } from '../../storeprovider';
import { db } from '../../firebase';
import { getSubtotal, addTax } from '../../reducer';
import './payment.styles.css';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    const history = useHistory();

    const [successed, setSuccessed] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisable] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(function(){
            setError(null);
            setProcessing(false);
            dispatch({
                type:"EMPTY_BASKET"
            })
        }, 30000);
        setTimeout(function(){
            setProcessing(false);
            setSuccessed("success");
        }, 10000);
        setTimeout(function(){
            history.replace('/orders');
        },30000);
    }

    const handleChange = (e) => {
        setDisable(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <Link to="/checkout"> 
                    <h1>CheckOut
                        ({basket?.length}) Items
                    </h1>
                </Link>
                <div className="payment__section">
                    <div className="payment_title">
                        <h2>Delivery Address</h2>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>No #100 1st main, 2nd stage hebbal bangalore - 560021</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {
                            basket?.map((item) => 
                                <CheckoutProduct key={item.id} 
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            )
                        }
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__details">
                    <div className="payment_title">
                        <h2>Payment Method {successed}</h2>
                    </div>
                        <form onSubmit={handleSubmit} className="payment-form">
                            <CardElement onChange={handleChange}/>
                            <div className="payment__pricecontainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: { value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={addTax(getSubtotal(basket))}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rs"}
                                />
                            </div>
                            <button disabled={processing || disabled || successed}>
                                <span>{processing ? <p>Processing</p>
                                    : "Buy Now"}
                                </span>
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
