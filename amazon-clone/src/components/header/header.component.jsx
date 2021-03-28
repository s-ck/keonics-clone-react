import React from 'react';
import './header.styles.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from '../../storeprovider';
import { auth } from '../../firebase';

const Header = () => {

    const [{basket, user}] = useStateValue();
    
    const handleAuth = () => {
        if(user){
            auth.signOut()
        }
    }

    return (
    <div className="header">
      <Link to="/">
        <img 
        className="header__logo" src="http://pngimg.com/uploads/amazon/small/amazon_PNG11.png" 
        alt=""/>
      </Link>  

        <div className="header__search">
            <input type="text" className="headersearch__input"/>
            <SearchIcon className="header__searchicon"/>
        </div>
        <div className="header__nav">
            <Link to={!user && '/login'}>
            <div onClick={handleAuth} className="header__option">
                <span className="header__optionline1">{user?user.email:'Hello Guest'}</span>
                <span className="header__optionline2">
                   {user?'Sing Out':'Sing In'} 
                </span>
            </div>
            </Link>
            <div className="header__option">
                <span className="header__optionline1">Returns</span>
                <span className="header__optionline2">& Orders</span>
            </div>
            <div className="header__option">
                <span className="header__optionline1">Your</span>
                <span className="header__optionline2">Prime</span>
            </div>
            <div className="header__optionBasket">
                {basket?.length > 0? 
                    <Link className="header__link" to="/checkout">
                        <ShoppingBasketIcon/>
                    </Link>
                    :<ShoppingBasketIcon/>
                }
               
                <span className="header__optionline2 header_basketCount">
                    {basket?.length}
                </span>
            </div>   
        </div> 
    </div>
)
}
export default Header;