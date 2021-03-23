import React from 'react';
import Product from '../products/product.component';
import './home.styles.css';

const Home = () => {
    return (
        <div className="home">
             <div className="home__container">
                 <img 
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
                    alt=""/>

                <div className="home__row">
                    <Product 
                        id={1}
                        title="The Lean Startup + Measure What Matters (New York Times Best Selling Books)"
                        image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
                        price={1000}
                        rating={5}
                    />
                    <Product 
                        id={2}
                        title="voltonix® Multi Electric Mini 4 in 1 Desktop Functional Household Sewing Machine,Mini Sewing Machine for Home, Sewing Machine for Home Tailoring (Mini Sawing Machine)"
                        image="https://images-na.ssl-images-amazon.com/images/I/410F%2BhjJFCL.jpg"
                        price={400}
                        rating={4}
                    />
                </div>
                <div className="home__row">
                    <Product
                        id={3}
                        title="Infinity (JBL) Fuze 100 Deep Bass Dual Equalizer IPX7 Waterproof Portable Wireless Speaker (Charcoal Black)"
                        image="https://images-na.ssl-images-amazon.com/images/I/61EsEoanEkL._SX679_.jpg"
                        price={3499}
                        rating={3}
                    />
                    <Product
                        id={4}
                        title="Alexa: 272 Funniest Easter Egg Questions (Amazon Echo, Amazon Dot, Amazon Alexa)"
                        image="https://images-na.ssl-images-amazon.com/images/I/51I5rWdNZ3L._SX331_BO1,204,203,200_.jpg"
                        price={6000}
                        rating={5}
                    />
                    <Product
                        id={5}
                        title="Mi 10i 5G (Atlantic Blue, 6GB RAM, 128GB Storage) - 108MP Quad Camera | Snapdragon 750G Processor | Upto 6 Months No Cost EMI"
                        image="https://images-na.ssl-images-amazon.com/images/I/71w4n2itCNL._SY741_.jpg"
                        price={10000}
                        rating={5}
                    />
                </div>
                <div className="home__row">
                    <Product
                        id={6}
                        title="MI TV 4A Horizon Edition 80cm (32 inches) HD Ready Android LED TV (Grey)"
                        image="https://images-na.ssl-images-amazon.com/images/I/91EPNWiKDUL._SX450_.jpg"
                        price="1000"
                        rating="5"
                    />  
                </div>
             </div>
        </div>
    )
}

export default Home;
