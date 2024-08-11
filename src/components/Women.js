import React, { useState, useEffect } from 'react';
import './Women.css';
import pic1 from '../images/sliderwoman1.avif';
import pic2 from '../images/sliderwoman2.avif';
import pic3 from '../images/sliderwoman3.avif';
import pic4 from '../images/sliderwoman4.avif';
import pic5 from '../images/sliderwoman5.avif';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import Cart from './Cart';

function Women() {
    const [suits, setSuits] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredAddToCart, setHoveredAddToCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setCartVisible] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:5000/api/products/women')
            .then(res => res.json())
            .then(data => {
                console.log("Products Data:", data); // Debugging line
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
                console.log("Cart Data:", data); // Debugging line
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
                console.log("Updated Cart Data:", data);
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
                <div className='name'>WOMAN</div>
                <div className='slider'>
                    <div className='slide-circle'>
                        <img src={pic1} alt='Unstitched'/>
                        <div>Unstitched</div>
                    </div>
                    <div className='slide-circle'>
                        <img src={pic2} alt='Ready To Wear'/>
                        <div>Ready To Wear</div>
                    </div>
                    <div className='slide-circle'>
                        <img src={pic3} alt='Western'/>
                        <div>Western</div>
                    </div>
                    <div className='slide-circle'>
                        <img src={pic4} alt='Sleepwear'/>
                        <div>Sleepwear</div>
                    </div>
                    <div className='slide-circle'>
                        <img src={pic5} alt='Modest Wear'/>
                        <div>Modest Wear</div>
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
                With a dazzling assortment of women’s apparel, you’re sure to find stylish ready to wear pieces for casual looks, elegant unstitched ensembles, chic western wear and everything in between. Stay on trend this season with our latest collections and discover new favourites every week!
            </div>
            {isCartVisible && (
                <Cart cartItems={cartItems} setCartItems={setCartItems} toggleCart={toggleCart} token={token} />
            )}
        </>
    );
}

export default Women;
