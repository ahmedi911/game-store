import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchGame, addToCart, deleteGame } from '../apis/apis';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const [data, error] = await fetchGame(token, id);
        
        if (error) {
          setError(error);
          return;
        }
        
        setGame(data);
      } catch (err) {
        setError('Failed to load game details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadGame();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const cartId = localStorage.getItem('cartId');
      const [data, error] = await addToCart(token, cartId, game.id, quantity);
      
      if (error) {
        setError(error);
        return;
      }
      
      setMessage(`${game.title} added to cart!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to add game to cart. Please try again later.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        const token = localStorage.getItem('token');
        const [success, error] = await deleteGame(token, id);
        
        if (error) {
          setError(error);
          return;
        }
        
        navigate('/');
      } catch (err) {
        setError('Failed to delete game. Please try again later.');
        console.error(err);
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-16 h-16 border-4 border-t-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-4xl p-6 mx-auto mt-8 text-center text-red-500 bg-red-100 border-2 border-red-400 rounded-lg">
      <p className="text-xl font-bold">Error</p>
      <p>{error}</p>
      <Link to="/" className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Return to Home
      </Link>
    </div>
  );
  
  if (!game) return (
    <div className="max-w-4xl p-6 mx-auto mt-8 text-center text-yellow-600 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <p className="text-xl font-bold">Game Not Found</p>
      <Link to="/" className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Browse Games
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl p-8 mx-auto mt-8 text-gray-100 bg-gray-900 rounded-lg shadow-xl">
      {message && (
        <div className="p-4 mb-6 text-green-100 bg-green-900 border border-green-500 rounded-md animate-pulse">
          <p className="font-semibold">{message}</p>
        </div>
      )}
      
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-2/5">
          {game.image_url ? (
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src={game.image_url} 
                alt={game.title} 
                className="object-cover w-full transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center bg-gray-800 border border-gray-700 rounded-lg h-80">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          
          <div className="p-4 mt-4 bg-gray-800 rounded-lg">
            <p className="font-semibold text-gray-300">In Stock:</p> 
            <div className="flex items-center mt-1">
              <div className={`w-3 h-3 mr-2 rounded-full ${game.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={game.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                {game.stock > 0 ? `${game.stock} available` : 'Out of stock'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="md:w-3/5">
          <h1 className="text-3xl font-bold text-blue-400">{game.title}</h1>
          
          <div className="flex items-center mt-2">
            <div className="px-3 py-1 mr-4 text-lg font-bold text-white bg-blue-600 rounded-md">
              ${game.price}
            </div>
          </div>
          
          <div className="p-4 mt-6 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-200">About this game</h3>
            <p className="mt-2 leading-relaxed text-gray-300">{game.description}</p>
          </div>
          
          <div className="p-4 mt-6 bg-gray-800 rounded-lg">
            <h3 className="mb-2 text-lg font-semibold text-gray-200">Purchase</h3>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center space-x-1 bg-gray-700 rounded-md">
                <button 
                  className="px-4 py-2 font-bold text-gray-200 transition-colors rounded-l-md hover:bg-gray-600"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={game.stock <= 0}
                >
                  -
                </button>
                <input 
                  type="number" 
                  className="w-16 py-2 text-center text-white bg-transparent" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={game.stock}
                  disabled={game.stock <= 0}
                />
                <button 
                  className="px-4 py-2 font-bold text-gray-200 transition-colors rounded-r-md hover:bg-gray-600"
                  onClick={() => setQuantity(Math.min(game.stock, quantity + 1))}
                  disabled={game.stock <= 0 || quantity >= game.stock}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <button 
                className={`px-6 py-3 text-white bg-blue-600 rounded-md font-semibold transition-colors ${
                  !game.stock || game.stock <= 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-blue-700'
                }`}
                onClick={handleAddToCart}
                disabled={!game.stock || game.stock <= 0}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </span>
              </button>
              
              <Link to="/" className="px-6 py-3 font-semibold text-gray-300 transition-colors bg-gray-700 rounded-md hover:bg-gray-600">
                Back to Games
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to={`/games/${id}/edit`} className="px-4 py-2 font-semibold text-white transition-colors bg-yellow-600 rounded-md hover:bg-yellow-700">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </span>
            </Link>
            
            <button 
              onClick={handleDelete} 
              className="px-4 py-2 font-semibold text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;