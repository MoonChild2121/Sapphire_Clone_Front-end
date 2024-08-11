import React from 'react';
import './ProductPage.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import Cart from './Cart';

function ProductPage({ product, addToCart, setSelectedProduct, cartItems, toggleCart, totalQuantity, isCartVisible, setCartItems, token }) {
    return (
        <>
            <div className="cart-icon-container">
                <ShoppingCartIcon onClick={toggleCart} style={{ cursor: 'pointer', fontSize: '2rem' }} />
                {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
            </div>
            <button onClick={() => setSelectedProduct(null)} className="back-button">Back to Products</button>
            <div className="product-page">
                <img src={product.images[0]} alt={product.name} className="product-image" />
                <div className="product-details">
                    <h1 className="product-name">{product.name}</h1>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">Rs.{product.price.toFixed(2)}</div>
                    <button
                        className="add-to-cart-button"
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingCartIcon /> ADD TO BAG
                    </button>
                </div>
            </div>
            {isCartVisible && (
                <Cart cartItems={cartItems} setCartItems={setCartItems} toggleCart={toggleCart} token={token} />
            )}
        </>
    );
}

export default ProductPage;
