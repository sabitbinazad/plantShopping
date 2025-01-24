import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = Number(item.cost.replace(/[^0-9.-]+/g, '')); // Remove dollar sign and convert to number
      const quantity = Number(item.quantity); // Convert quantity to number
      
      // If either cost or quantity is NaN, return total without adding it
      if (isNaN(cost) || isNaN(quantity)) {
        return total;
      }
      
      return total + (quantity * cost); // Add the total cost of the item
    }, 0);
  };
  
  // Handle Continue Shopping
  const handleContinueShopping = () => {
    onContinueShopping();  // Call the function passed from the parent component
  };

  // Handle Increment Quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle Decrement Quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));  // Remove item if quantity becomes 0
    }
  };

  // Handle Remove Item from Cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for an individual item
  const calculateTotalCost = (item) => {
    const costWithoutDollar = item.cost.replace(/[^0-9.-]+/g, ''); // Remove non-numeric characters (except for the decimal point and minus sign)
    const cost = Number(costWithoutDollar);
    return item.quantity * cost;
  };

  // Maintain a variable for the total quantity counter
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

