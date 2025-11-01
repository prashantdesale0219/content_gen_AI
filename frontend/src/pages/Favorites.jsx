import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get('/api/content/favorites', config);
        setFavorites(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch favorites');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(`/api/content/${id}`, config);
        setFavorites(favorites.filter(content => content._id !== id));
        toast.success('Content deleted successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete content');
      }
    }
  };

  const removeFromFavorites = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      };
      await axios.put(`/api/content/${id}/favorite`, { isFavorite: false }, config);
      
      // Update local state
      setFavorites(favorites.filter(content => content._id !== id));
      
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update favorite status');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Favorite Content</h1>
      
      {favorites.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">You don't have any favorite content yet.</p>
          <button 
            onClick={() => navigate('/history')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to History
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((content) => (
            <div key={content._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {content.contentType}
                  </span>
                  <button 
                    onClick={() => removeFromFavorites(content._id)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <FaStar />
                  </button>
                </div>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{content.topic}</h2>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Created: {formatDate(content.createdAt)}</p>
                  <p>Tone: {content.tone}</p>
                </div>
                <div className="h-24 overflow-hidden text-gray-700 mb-4">
                  <p className="line-clamp-4">{content.generatedContent}</p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(content._id)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(content._id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;