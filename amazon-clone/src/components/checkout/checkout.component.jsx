import React from 'react';
import CheckoutProduct from '../checkoutProduct/checkoutproduct.component';
import Subtotal from '../subtotal/subtotal.component';
import { useStateValue } from '../../storeprovider';
import './checkout.styles.css';

function Checkout(){

    const [{basket, user}] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                    className="checkout__ad" 
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/2021/1499_store/english/1499_header_1500x300_eng.jpg"
                    alt=""
                />
                <div>
                    <p className="checkout__username">{user?user.email:''}</p>
                    <h2 className="checkout__title">Your Shopping Cart</h2>
                    {
                        basket?.map(row => (
                            <CheckoutProduct  
                                id={row.id}
                                title={row.title}
                                image={row.image}
                                price={row.price}
                                rating={row.rating}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal/>
            </div>
        </div>
    )
}
export default Checkout;