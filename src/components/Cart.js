import React from 'react';
import './Cart.css';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Cart({ cartItems, setCartItems, toggleCart, token }) {
  console.log("Cart Items in Cart Component:", cartItems);

    const updateCartItem = (productId, quantity) => {
        if (token) {
            fetch(`http://localhost:5000/api/cart/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ quantity })
            })
            .then(res => res.json())
            .then(data => setCartItems(data))
            .catch(err => console.error(err));
        } else {
            // Update cart in localStorage
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = existingCart.findIndex(item => item.productId === productId);
            if (itemIndex > -1) {
                if (quantity > 0) {
                    existingCart[itemIndex].quantity = quantity;
                } else {
                    existingCart.splice(itemIndex, 1);
                }
                localStorage.setItem('cart', JSON.stringify(existingCart));
                setCartItems(existingCart);
            }
        }
    };

    const removeFromCart = (productId) => {
        if (token) {
            fetch(`http://localhost:5000/api/cart/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setCartItems(data))
            .catch(err => console.error(err));
        } else {
            // Remove from localStorage cart
            let existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            existingCart = existingCart.filter(item => item.productId !== productId);
            localStorage.setItem('cart', JSON.stringify(existingCart));
            setCartItems(existingCart);
        }
    };

  const increaseQuantity = (productId) => {
      const item = cartItems.find(item => item.productId === productId);
      if (item) {
          updateCartItem(productId, item.quantity + 1);
      }
  };

  const decreaseQuantity = (productId) => {
      const item = cartItems.find(item => item.productId === productId);
      if (item && item.quantity > 1) {
          updateCartItem(productId, item.quantity - 1);
      } else {
          removeFromCart(productId);
      }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
      <div className="cart">
          <div className="cart-header">
              <p>SHOPPING CART</p>
              <CloseIcon onClick={toggleCart} className="close-icon" />
          </div>
          {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
          ) : (
              <>
                  {cartItems.map((item) => (
                      <div key={item.productId} className="cart-item">
                          <img src={item.img} alt="" />
                          <div className="cart-item-details">
                          <p>{item.name}</p>
                          <p>Rs.{item.price ? item.price.toFixed(2) : '0.00'}</p>
                              <div className="quantity-controls">
                                  <button onClick={() => decreaseQuantity(item.productId)}><RemoveIcon /></button>
                                  <span>{item.quantity}</span>
                                  <button onClick={() => increaseQuantity(item.productId)}><AddIcon /></button>
                              </div>
                              <DeleteIcon onClick={() => removeFromCart(item.productId)} className="delete-icon" />
                          </div>
                      </div>
                  ))}
                  <div className="cart-total">
                      <div>Subtotal: </div>
                      <div>Rs.{totalPrice.toFixed(2)}</div>
                  </div>
                  <div className="cart-buttons">
                      <button>VIEW CART</button>
                      <button>CHECKOUT</button>
                      <button onClick={toggleCart}>CONTINUE SHOPPING</button>
                  </div>
              </>
          )}
      </div>
  );
}


export default Cart;