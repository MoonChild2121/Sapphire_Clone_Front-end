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

    useEffect(() => {
        fetch('http://localhost:5000/api/products/beauty')
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
                                onClick={() => addToCart(suit)}
                            >
                                {hoveredAddToCart === index ? <ShoppingCartIcon /> : 'ADD TO BAG'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='endtext'>
                Our latest Beauty collection has been meticulously curated to offer a wide range of versatile silhouettes. Our collection features a variety of Eastern kurtas and Western dresses, all carefully crafted from the finest quality fabrics. Each piece in our collection is trendy, unique, and exquisite. The collection boasts a range of dainty prints and vibrant hues, which are sure to make your little star stand out in the crowd. Our outfits are perfect for a variety of occasions, from casual outings to formal events. With a focus on both style and comfort, we have ensured that each piece in our collection is not only fashionable but also comfortable to wear. The fabrics used in our collection are of the highest quality, ensuring that the clothes are durable and long-lasting. Our collection is a perfect blend of traditional and contemporary designs, which are sure to appeal to a wide range of tastes and preferences.
            </div>
            {isCartVisible && (
                <Cart cartItems={cartItems} setCartItems={setCartItems} toggleCart={toggleCart} />
            )}
        </>
    );
}

export default Beauty;
