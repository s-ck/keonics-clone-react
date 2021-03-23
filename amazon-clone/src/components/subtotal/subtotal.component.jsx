import React from 'react';
import CurrencyFormat from 'react-currency-format';
import './subtotal.styles.css';
import { useStateValue } from '../../storeprovider';
import { getSubtotal, addTax } from '../../reducer';

function Subtotal(){
    
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
           <button>Proceed to checkout</button>
        </div>
    )
}
export default Subtotal;