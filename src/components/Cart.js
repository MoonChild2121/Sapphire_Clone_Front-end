import React from 'react';
import './Cart.css';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Cart({ cartItems, setCartItems, toggleCart }) {
    const removeFromCart = (id) => {
      const newCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(newCartItems);
    };

    const increaseQuantity = (id) => {
      const newCartItems = [...cartItems];
      const itemIndex = newCartItems.findIndex((item) => item.id === id);
      if (itemIndex > -1) {
        newCartItems[itemIndex].quantity += 1;
        setCartItems(newCartItems);
      }
    };

    const decreaseQuantity = (id) => {
      const newCartItems = [...cartItems];
      const itemIndex = newCartItems.findIndex((item) => item.id === id);
      if (itemIndex > -1) {
        if (newCartItems[itemIndex].quantity > 1) {
          newCartItems[itemIndex].quantity -= 1;
          setCartItems(newCartItems);
        } else {
          removeFromCart(id);
        }
      }
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
      <div className="cart">
        <div className="cart-header">
          <p>SHOPPING CART</p>
          <CloseIcon onClick={toggleCart} className="close-icon" />
        </div>
        {cartItems.length === 0? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.desc} />
                <div className="cart-item-details">
                  <p>{item.desc}</p>
                  <p>Rs.{item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}><RemoveIcon /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}><AddIcon /></button>
                  </div>
                  <DeleteIcon onClick={() => removeFromCart(item.id)} className="delete-icon" />
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
