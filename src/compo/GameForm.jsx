import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGame, createGame, updateGame } from '../apis/apis';

const GameForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);
  const [game, setGame] = useState({
    title: '',
    description: '',
    price: '',
    image_url: '',
    stock: ''
  });

  useEffect(() => {
    if (id) {
      const loadGame = async () => {
        try {
          const data = await fetchGame(id);
          setGame(data);
          setError(null);
        } catch (err) {
          setError('Failed to load game details. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadGame();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!game.title || !game.price) {
      setError('Title and price are required fields.');
      return;
    }
    try {
      if (id) {
        await updateGame(id, game);
      } else {
        await createGame(game);
      }
      navigate('/');
    } catch (err) {
      setError(`Failed to ${id ? 'update' : 'create'} game. Please try again later.`);
      console.error(err);
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading game details...</div>;

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">{id ? 'Edit Game' : 'Add New Game'}</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title*</label>
            <input type="text" name="title" value={game.title} onChange={handleChange} required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea name="description" rows="3" value={game.description} onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-gray-700">Price ($)*</label>
            <input type="number" step="0.01" name="price" value={game.price} onChange={handleChange} required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-gray-700">Image URL</label>
            <input type="text" name="image_url" value={game.image_url} onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-gray-700">Stock</label>
            <input type="number" name="stock" value={game.stock} onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={() => navigate('/')} className="px-4 py-2 text-white bg-gray-500 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md">{id ? 'Update Game' : 'Add Game'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameForm;
