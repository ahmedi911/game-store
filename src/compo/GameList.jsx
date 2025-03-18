import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGames, deleteGame, addToCart } from '../apis/apis';

const GamesList = () => {
  // Static game data
  const staticGames = [
    {
      id: 1,
      title: "The Witcher 3: Wild Hunt",
      description: "An action role-playing game set in an open world environment. As Geralt of Rivia, you'll track down the Child of Prophecy in a vast fantasy world rich with merchant cities, pirate islands, and dangerous mountain passes.",
      price: 39.99,
      image_url: "https://cdn-l-thewitcher.cdprojektred.com/meta/TW3NG_thumbnail_en.png"
    },
    {
      id: 2,
      title: "Red Dead Redemption 2",
      description: "An epic tale of life in America's unforgiving heartland. The game's vast and atmospheric world also provides the foundation for a brand new online multiplayer experience.",
      price: 59.99,
      image_url: "https://static.printler.com/cache/8/3/4/2/2/5/834225dedffc2158b91e0b351173b6896ba9a82e.jpg"
    },
    {
      id: 3,
      title: "Cyberpunk 2077",
      description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. Play as a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.",
      price: 49.99,
      image_url: "https://static.printler.com/cache/a/6/1/d/c/7/a61dc7198c498ed7969a0e106844dd0496dbab9a.jpg"
    },
    {
      id: 5,
      title: "Elden Ring",
      description: "An action RPG developed by FromSoftware, Inc. and produced by BANDAI NAMCO Entertainment Inc. The game is a fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R. R. Martin.",
      price: 59.99,
      image_url: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1739922037.jpg"
    },
    {
      id: 6,
      title: "Horizon Forbidden West",
      description: "Join Aloy as she braves the Forbidden West – a majestic but dangerous frontier that conceals mysterious new threats. Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes.",
      price: 49.99,
      image_url: "https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/yIa8STLMmCyhj48fGDpaAuRM.jpg"
    },
    {
      id: 7,
      title: "Hades",
      description: "A god-like rogue-like dungeon crawler that combines the best aspects of Supergiant's critically acclaimed titles, including the fast-paced action of Bastion, the rich atmosphere and depth of Transistor, and the character-driven storytelling of Pyre.",
      price: 24.99,
      image_url: "https://m.media-amazon.com/images/M/MV5BM2Q2YjRiZmMtODlkMy00Zjc3LWIyYTktOWM3ZDc4YzI2YTYwXkEyXkFqcGc@._V1_.jpg"
    },
    {
      id: 8,
      title: "Final Fantasy VII Remake",
      description: "A reimagining of the iconic original game that re-defined the RPG genre, diving deeper into the world and its characters than ever before. The first game in the project is set in the eclectic city of Midgar and presents a fully standalone gaming experience.",
      price: 39.99,
      image_url: "https://i.ebayimg.com/images/g/IqQAAOSwQWBdeusL/s-l1200.jpg"
    },
    {
      id: 9,
      title: "Ghost of Tsushima",
      description: "In the late 13th century, the Mongol empire has laid waste to entire nations. Tsushima Island is all that stands between mainland Japan and a massive Mongol invasion fleet. As one of the last surviving samurai, you rise from the ashes to fight back.",
      price: 49.99,
      image_url: "https://image.api.playstation.com/vulcan/ap/rnd/202006/2617/vTFdM8FkYYxXvUfLzOmjY3zt.png"
    },
    {
      id: 10,
      title: "Hollow Knight",
      description: "A challenging 2D action-adventure. You'll explore twisting caverns, battle tainted creatures and escape intricate traps, all to solve an ancient long-hidden mystery.",
      price: 14.99,
      image_url: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000003208/4643fb058642335c523910f3a7910575f56372f612f7c0c9a497aaae978d3e51"
    }
  ];

  const [games, setGames] = useState(staticGames);
  const [loading, setLoading] = useState(false); // Changed to false since we have static data
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Comment out the useEffect since we're using static data
  // useEffect(() => {
  //   loadGames();
  // }, []);

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
<div className="px-4 py-12 mx-auto max-w-7xl">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-3xl font-bold text-transparent text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
      Games Collection
    </h2>
    <Link 
      to="/games/new"
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Add New Game
    </Link>
  </div>

  {message && (
    <div className="flex items-center gap-3 p-4 mb-6 text-green-700 bg-green-100 border border-green-200 rounded-lg animate-fadeIn">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {message}
    </div>
  )}

  {error && (
    <div className="flex items-center gap-3 p-4 mb-6 text-red-700 bg-red-100 border border-red-200 rounded-lg animate-fadeIn">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {error}
    </div>
  )}

  {games.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-16 text-center border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <p className="mb-4 text-gray-600">No games available. Add some games to get started!</p>
      <Link 
        to="/games/new" 
        className="inline-flex items-center px-4 py-2 text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add New Game
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {games.map(game => (
        <div 
          key={game.id} 
          className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-xl hover:border-gray-300 group"
        >
          {game.image_url && (
            <div className="relative h-56 overflow-hidden">
              <img
                src={game.image_url}
                alt={game.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-0 right-0 mt-3 mr-3">
                <span className="px-3 py-1 text-xs font-medium text-white rounded-full shadow-md bg-gradient-to-r from-blue-500 to-purple-600">
                  ${game.price}
                </span>
              </div>
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100"></div>
            </div>
          )}
          
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
              {game.title}
            </h5>
            <p className="mb-3 text-sm text-gray-600 line-clamp-2">{game.description}</p>
            
            <div className="flex gap-3 mt-4">
              <Link
                to={`/games/${game.id}`}
                className="flex items-center justify-center flex-1 gap-1 px-4 py-2 text-sm font-medium text-center text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </Link>
              <button
                onClick={() => handleAddToCart(game)}
                className="flex items-center justify-center flex-1 gap-1 px-4 py-2 text-sm font-medium text-center text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:ring-4 focus:ring-green-300/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 bg-gray-50">
            <Link
              to={`/games/${game.id}/edit`}
              className="flex items-center gap-1 text-sm font-medium text-yellow-600 transition-colors hover:text-yellow-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <button
              onClick={() => handleDelete(game.id)}
              className="flex items-center gap-1 text-sm font-medium text-red-600 transition-colors hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
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