import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import './subtotal.styles.css';
import { useStateValue } from '../../storeprovider';
import { getSubtotal, addTax } from '../../reducer';

function Subtotal(){
    
    const history = useHistory();

    const [{basket}] = useStateValue();
    
    return(
        <div className="subtotal">
           <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>Subtotal ({basket?.length} items)
                            <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox"/>This order
                            contains a gift 
                        </small>
                    </>
                )}
                decimalScale={2}
                value={addTax(getSubtotal(basket))}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs"}
           />
           <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}
export default Subtotal;