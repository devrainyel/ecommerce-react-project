import { formatMoney } from '../../utils/money';
import axios from 'axios';
import './CartItemDetails.css';
import { useState } from 'react';

export function CartItemDetails( { cartItem, loadCart } ) {
  const deleteCartItem = async () => {
    await axios.delete(`api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const [isQuantityUpdating, setIsQuantityUpdating] = useState(false);

  const updateQuantity = async () => {
    if(isQuantityUpdating) {
      setIsQuantityUpdating(false)
    } else {
      setIsQuantityUpdating(true)
    }
  }

  return (
    <>
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
            <span>
            Quantity: {isQuantityUpdating ? <input type="text" className="quantity-input" /> : <span className="quantity-label">{cartItem.quantity}</span>}  
            </span>
            <span 
              className="update-quantity-link link-primary"
              onClick={updateQuantity}
            >Update</span>
            <span 
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >Delete</span>
        </div>
        </div>
    </>
  );
}
