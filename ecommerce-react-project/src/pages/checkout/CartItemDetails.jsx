import { formatMoney } from '../../utils/money';
import axios from 'axios';
import './CartItemDetails.css';
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCart }) {
  const [isQuantityUpdating, setIsQuantityUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    if (isQuantityUpdating) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(quantity),
      })
      await loadCart();
      setIsQuantityUpdating(false);
    } else {
      setIsQuantityUpdating(true);
    }
  };

  return (
    <>
      <img className='product-image' src={cartItem.product.image} />

      <div className='cart-item-details'>
        <div className='product-name'>{cartItem.product.name}</div>
        <div className='product-price'>
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className='product-quantity'>
          <span>
            Quantity:
            {isQuantityUpdating ? (
              <input type='text' className='quantity-input' value={quantity} onChange={(event) => {
              const inputValue =  event.target.value;
              setQuantity(inputValue);
              console.log(inputValue);
              }} />
            ) : (
              <span className='quantity-label'>{cartItem.quantity}</span>
            )}
          </span>
          <span
            className='update-quantity-link link-primary'
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            className='delete-quantity-link link-primary'
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
