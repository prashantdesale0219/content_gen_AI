import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaNewspaper, FaBlog, FaHashtag, FaEnvelope } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const contentTypes = [
    { id: 'blog', name: 'Blog Post', icon: <FaBlog className="text-3xl sm:text-4xl mb-2 text-primary" />, description: 'Create engaging blog posts on any topic' },
    { id: 'article', name: 'Article', icon: <FaNewspaper className="text-3xl sm:text-4xl mb-2 text-primary" />, description: 'Generate informative articles with research' },
    { id: 'social', name: 'Social Media', icon: <FaHashtag className="text-3xl sm:text-4xl mb-2 text-primary" />, description: 'Craft engaging social media content' },
    { id: 'email', name: 'Email', icon: <FaEnvelope className="text-3xl sm:text-4xl mb-2 text-primary" />, description: 'Write professional or marketing emails' },
    { id: 'other', name: 'Custom', icon: <FaFileAlt className="text-3xl sm:text-4xl mb-2 text-primary" />, description: 'Generate any other type of content' }
  ];

  const handleContentTypeSelect = (contentType) => {
    navigate('/dashboard/generate', { state: { contentType } });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="text-center sm:text-left mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Welcome to AI Content Generator</h1>
        <p className="text-gray-600 text-sm sm:text-base">Select a content type to get started</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {contentTypes.map((type) => (
          <div 
            key={type.id}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center"
            onClick={() => handleContentTypeSelect(type.id)}
          >
            {type.icon}
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{type.name}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;