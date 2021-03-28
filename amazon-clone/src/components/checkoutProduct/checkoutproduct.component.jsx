import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from '../../storeprovider';
import './checkoutproduct.styles.css';

function CheckoutProduct({id, title, image, price, rating}) {
    const [{basket}, dispatch] = useStateValue();

    const removeFrombasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id:id
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkout__product__img" src={image} alt=""/>
            <div className="checkoutproduct__info">
                <p className="checkoutproduct__title">{title}</p>
                <p className="checkoutproduct__price">
                    <small>Rs</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutproduct__rating">
                    {
                        Array(rating).fill().map((row) =>
                            <p><StarIcon className="rating"/></p>
                        )
                    }
                </div>
                <button onClick={removeFrombasket}>Remove From Cart</button>
            </div>
        </div>
    )
}
export default CheckoutProduct;
