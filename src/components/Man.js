import React, { useState, useEffect } from 'react';
import './Women.css'; // Ensure you have a corresponding CSS file for Men
import pic1 from '../images/men_pics/man_circle1.avif';
import pic2 from '../images/men_pics/man_circle2.avif';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import Cart from './Cart';

function Man() {
    const [suits, setSuits] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredAddToCart, setHoveredAddToCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setCartVisible] = useState(false);

    useEffect(() => {
        // Replace with your API endpoint for fetching suits data
        fetch('http://localhost:5000/api/products/men')
            .then(res => res.json())
            .then(data => {
                console.log(data); // Log the fetched data
                setSuits(data);
            })
            .catch(err => console.error(err));
    }, []);

    const addToCart = (suit) => {
        const existingItemIndex = cartItems.findIndex(item => item._id === suit._id);
        if (existingItemIndex > -1) {
            const newCartItems = [...cartItems];
            newCartItems[existingItemIndex].quantity += 1;
            setCartItems(newCartItems);
        } else {
            const newCartItem = { ...suit, quantity: 1, img: suit.images[0] };
            setCartItems([...cartItems, newCartItem]);
        }
        setCartVisible(true); // Show the cart when an item is added
    };

    const toggleCart = () => {
        setCartVisible(!isCartVisible);
    };

    return (
        <>
            <div className='circles'>
                <div className='name'>MAN</div>
                <div className='slider'>
                    <div className='slide-circle'>
                        <img src={pic1} alt='Unstitched'/>
                        <div>Unstitched</div>
                    </div>
                    <div className='slide-circle'>
                        <img src={pic2} alt='Ready To Wear'/>
                        <div>Ready To Wear</div>
                    </div>
                </div>
            </div>
            <div className='product-cards'>
                {suits.map((suit, index) => (
                    <div
                        className='card'
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <img
                            src={hoveredIndex === index ? suit.images[1] : suit.images[0]}
                            alt=''
                            className='suit-image'
                        />
                        <div className='buy'>
                            <div className='description'>
                                <div style={{ fontSize: '1.1vw', color: 'black' }}>{suit.name}</div>
                                <div>{suit.description}</div>
                                <div>Rs.{suit.price.toFixed(2)}</div>
                            </div>
                            <div
                                className={`addtocart ${hoveredAddToCart === index ? 'icon' : ''}`}
                                onMouseEnter={() => setHoveredAddToCart(index)}
                                onMouseLeave={() => setHoveredAddToCart(null)}
                                onClick={() => addToCart(suit)}
                            >
                                {hoveredAddToCart === index ? <ShoppingCartIcon /> : 'ADD TO BAG'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='endtext'>
                SAPPHIRE Man is a perfect blend of modern elegance and timeless style, designed to make a dapper statement this season. With a commitment to quality reflected in every detail, our Men's Stitched & Unstitched collections offer versatility that transcends trends, allowing you to curate a wardrobe suitable for every occasion. Whether you're looking for something formal or casual, SAPPHIRE Man has got you covered.
            </div>
            {isCartVisible && (
                <Cart cartItems={cartItems} setCartItems={setCartItems} toggleCart={toggleCart} />
            )}
        </>
    );
}

export default Man;
