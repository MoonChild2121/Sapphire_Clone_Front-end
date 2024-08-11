import React, { useState, useEffect } from 'react';
import './Women.css'; // Ensure you have the correct CSS file
import pic1 from '../images/beauty/circle1.avif';
import pic2 from '../images/beauty/circle2.avif';
import pic3 from '../images/beauty/circle3.jpg';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import Cart from './Cart';

function Beauty() {
    const [suits, setSuits] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredAddToCart, setHoveredAddToCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setCartVisible] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:5000/api/products/beauty')
            .then(res => res.json())
            .then(data => {
                setSuits(data);
            })
            .catch(err => console.error(err));

        if (token) {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];

            if (localCart.length > 0) {
                localCart.forEach(item => {
                    fetch('http://localhost:5000/api/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(item)
                    })
                    .catch(err => console.error(err));
                });

                localStorage.removeItem('cart');
            }

            fetch('http://localhost:5000/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setCartItems(data);
            })
            .catch(err => console.error(err));
        } else {
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(existingCart);
        }
    }, [token]);

    const addToCart = (suit) => {
        setIsAddingToCart(true);
        const newCartItem = {
            productId: suit._id,
            name: suit.name,
            price: suit.price,
            quantity: 1,
            img: suit.images[0]
        };
    
        if (token) {
            // User is logged in, add to the backend cart
            fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newCartItem)
            })
            .then(res => res.json())
            .then(data => {
                setCartItems(data);
                setIsAddingToCart(false);
            })
            .catch(err => {
                console.error(err);
                setIsAddingToCart(false);
            });
        } else {
            // User is not logged in, store cart in localStorage
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = existingCart.findIndex(item => item.productId === suit._id);
    
            if (itemIndex > -1) {
                existingCart[itemIndex].quantity += 1;
            } else {
                existingCart.push(newCartItem);
            }
    
            localStorage.setItem('cart', JSON.stringify(existingCart));
            setCartItems(existingCart);
            setIsAddingToCart(false);
        }
    
        setCartVisible(true);
    };

    const toggleCart = () => {
        setCartVisible(!isCartVisible);
    };

    return (
        <>
            <div className='circles'>
                <div className='name'>BEAUTY</div>
                <div className='slider'>
                    <div className='slide-circle'>
                        <img src={pic1} alt='Cosmetics'/>
                        <div>Cosmetics</div>
                    </div>
                    <div className='slide-circle'>
                        <img src={pic2} alt='Fragrances'/>
                        <div>Fragrances</div>
                    </div>
                    <div className='slide-circle'>
                        <img src={pic3} alt='Shop by Scent'/>
                        <div>Shop by Scent</div>
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
                                onClick={() => !isAddingToCart && addToCart(suit)}
                            >
                                {isAddingToCart && hoveredAddToCart === index ? 'ADDING...' : hoveredAddToCart === index ? <ShoppingCartIcon /> : 'ADD TO BAG'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='endtext'>
                {/* Your descriptive text */}
            </div>
            {isCartVisible && (
                <Cart cartItems={cartItems} setCartItems={setCartItems} toggleCart={toggleCart} token={token} />
            )}
        </>
    );
}

export default Beauty;
