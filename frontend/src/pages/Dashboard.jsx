import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaNewspaper, FaBlog, FaHashtag, FaEnvelope } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const contentTypes = [
    { id: 'blog', name: 'Blog Post', icon: <FaBlog className="text-4xl mb-2 text-primary" />, description: 'Create engaging blog posts on any topic' },
    { id: 'article', name: 'Article', icon: <FaNewspaper className="text-4xl mb-2 text-primary" />, description: 'Generate informative articles with research' },
    { id: 'social', name: 'Social Media', icon: <FaHashtag className="text-4xl mb-2 text-primary" />, description: 'Craft engaging social media content' },
    { id: 'email', name: 'Email', icon: <FaEnvelope className="text-4xl mb-2 text-primary" />, description: 'Write professional or marketing emails' },
    { id: 'other', name: 'Custom', icon: <FaFileAlt className="text-4xl mb-2 text-primary" />, description: 'Generate any other type of content' }
  ];

  const handleContentTypeSelect = (contentType) => {
    navigate('/generate', { state: { contentType } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Welcome to AI Content Generator</h1>
      <p className="text-gray-600 mb-8">Select a content type to get started</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentTypes.map((type) => (
          <div 
            key={type.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center"
            onClick={() => handleContentTypeSelect(type.id)}
          >
            {type.icon}
            <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
            <p className="text-gray-600">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;