import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart } from '../apis/apis';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await fetchCart();
      setCartItems(data.cart_items || []);
      setError(null);
    } catch (err) {
      setError('Failed to load cart. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(cartItemId, newQuantity);
      setCartItems(cartItems.map(item => 
        item.id === cartItemId 
          ? { ...item, quantity: newQuantity } 
          : item
      ));
      setMessage('Cart updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to update cart. Please try again later.');
      console.error(err);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
      setMessage('Item removed from cart!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to remove item from cart. Please try again later.');
      console.error(err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.game.price * item.quantity, 0).toFixed(2);
  };

  if (loading) return <div className="text-lg font-semibold text-center">Loading cart...</div>;

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">Your Cart</h2>
      {message && <div className="p-3 mb-4 text-green-700 bg-green-100 rounded">{message}</div>}
      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

      {cartItems.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-lg">Your cart is empty.</p>
          <Link to="/" className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded">Browse Games</Link>
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-lg">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow-md">
              <div className="flex items-center">
                {item.game.image_url && (
                  <img src={item.game.image_url} alt={item.game.title} className="object-cover w-16 h-16 mr-4 rounded" />
                )}
                <div>
                  <Link to={`/games/${item.game.id}`} className="font-semibold text-blue-600 hover:underline">
                    {item.game.title}
                  </Link>
                  <p className="text-gray-600">${item.game.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <input 
                  type="number" 
                  className="w-12 mx-2 text-center border rounded" 
                  value={item.quantity} 
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))} 
                  min="1" 
                />
                <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <p className="font-semibold">${(item.game.price * item.quantity).toFixed(2)}</p>
              <button className="text-red-600 hover:text-red-800" onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4 mt-4 border-t">
            <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>
            <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
