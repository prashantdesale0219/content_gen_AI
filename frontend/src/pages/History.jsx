import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTrash, FaStar, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { contentAPI } from '../services/api';

const History = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'favorites'
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContents();
  }, [user, activeTab]);

  const fetchContents = async () => {
    setLoading(true);
    try {
      let data;
      if (activeTab === 'all') {
        const response = await contentAPI.getAll();
        data = response.data;
      } else {
        const response = await contentAPI.getFavorites();
        data = response.data;
      }
      setContents(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch content history');
      setLoading(false);
    }
  };

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
        await axios.delete(`/api/contents/${id}`, config);
        setContents(contents.filter(content => content._id !== id));
        toast.success('Content deleted successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete content');
      }
    }
  };

  const toggleFavorite = async (id, isFavorite) => {
    try {
      await contentAPI.toggleFavorite(id);
      
      // Update local state
      setContents(contents.map(content => 
        content._id === id ? { ...content, isFavorite: !isFavorite } : content
      ));
      
      // Refresh content if we're on favorites tab and removing an item
      if (activeTab === 'favorites' && isFavorite) {
        fetchContents();
      }
      
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
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
      <h1 className="text-2xl font-bold mb-6">Content History</h1>
      
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'all'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Content
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'favorites'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
      </div>
      
      {contents.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">You haven't generated any content yet.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Generate Content
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <div key={content._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {content.contentType}
                  </span>
                  <button 
                    onClick={() => toggleFavorite(content._id, content.isFavorite)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    {content.isFavorite ? <FaStar /> : <FaRegStar />}
                  </button>
                </div>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{content.topic}</h2>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Created: {formatDate(content.createdAt)}</p>
                  <p>Tone: {content.tone}</p>
                </div>
                <div className="h-24 overflow-hidden text-gray-700 mb-4">
                  <p className="line-clamp-4">{content.generatedText}</p>
                </div>
                <div className="flex justify-end">
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

export default History;