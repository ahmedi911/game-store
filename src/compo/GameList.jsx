import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGames, deleteGame, addToCart } from '../apis/apis';

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const [data, errorMsg] = await fetchGames(); // Your API returns [data, errorMsg]
      if (data) {
        setGames(data);
        setError(null);
      } else if (errorMsg) {
        setError(errorMsg);
      }
    } catch (err) {
      setError('Failed to load games. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await deleteGame(id);
        setGames(games.filter(game => game.id !== id));
        setMessage('Game deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete game. Please try again later.');
        console.error(err);
      }
    }
  };

  const handleAddToCart = async (game) => {
    try {
      await addToCart(game.id);
      setMessage(`${game.title} added to cart!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to add game to cart. Please try again later.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-lg font-semibold text-center">Loading games...</div>;

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Games Collection</h2>
      
      {message && <div className="p-3 mb-4 text-green-700 bg-green-100 rounded-md">{message}</div>}
      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-md">{error}</div>}

      {games.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">No games available. Add some games to get started!</p>
          <Link to="/games/new" className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">Add New Game</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games.map(game => (
            <div key={game.id} className="overflow-hidden bg-white rounded-xl shadow-lg transition-transform hover:scale-[1.02] border border-gray-200">
  {game.image_url && (
    <div className="relative h-56 overflow-hidden">
      <img 
        src={game.image_url} 
        alt={game.title} 
        className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
      />
      <div className="absolute top-3 right-3">
        <span className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow">
          ${game.price}
        </span>
      </div>
    </div>
  )}
  
  <div className="p-5">
    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{game.title}</h5>
    <p className="mb-3 text-sm text-gray-600 line-clamp-2">{game.description}</p>
    
    <div className="flex gap-3 mt-4">
      <Link 
        to={`/games/${game.id}`} 
        className="flex-1 px-4 py-2 text-sm font-medium text-center text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
      >
        View Details
      </Link>
      <button 
        onClick={() => handleAddToCart(game)} 
        className="flex-1 px-4 py-2 text-sm font-medium text-center text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
      >
        Add to Cart
      </button>
    </div>
  </div>
  
  <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 bg-gray-50">
    <Link 
      to={`/games/${game.id}/edit`} 
      className="text-sm font-medium text-yellow-600 transition-colors hover:text-yellow-800"
    >
      Edit
    </Link>
    <button 
      onClick={() => handleDelete(game.id)} 
      className="text-sm font-medium text-red-600 transition-colors hover:text-red-800"
    >
      Delete
    </button>
  </div>
</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GamesList;