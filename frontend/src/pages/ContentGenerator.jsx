import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaSave, FaSpinner, FaDownload } from 'react-icons/fa';
import { contentAPI } from '../services/api';
import { generatePDF } from '../utils/pdfUtils';

const ContentGenerator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    contentType: '',
    topic: '',
    tone: 'Friendly',
    keywords: '',
    language: 'English'
  });
  
  const [generatedContent, setGeneratedContent] = useState('');
  const [seoScore, setSeoScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Get content type from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type) {
      setFormData(prev => ({ ...prev, contentType: type }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKeywordsChange = (e) => {
    setFormData(prev => ({ ...prev, keywords: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    
    try {
      // Convert keywords string to array
      const keywordsArray = formData.keywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword !== '');
      
      const requestData = {
        ...formData,
        keywords: keywordsArray
      };
      
      // Make actual API call to generate content
      const response = await contentAPI.generate(requestData);
      const data = response.data;
      
      setGeneratedContent(data.generatedText);
      setSeoScore(data.seoScore);
      toast.success('Content generated successfully!');
      setLoading(false);
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error(error.response?.data?.message || 'Failed to generate content');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent) return;
    
    try {
      // Generate and download PDF
      generatePDF(
        formData.topic,
        generatedContent,
        formData.contentType,
        formData.tone
      );
      
      // Make actual API call to save content
      await contentAPI.update('new', {
        topic: formData.topic,
        contentType: formData.contentType,
        tone: formData.tone,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k !== ''),
        language: formData.language,
        generatedText: generatedContent,
        seoScore: seoScore
      });
      
      setSaved(true);
      toast.success('Content saved and downloaded as PDF!');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error(error.response?.data?.message || 'Failed to save content');
    }
  };

  const contentTypes = ['Blog Post', 'Article', 'Social Media', 'Email', 'Product Description'];
  const tones = ['Formal', 'Friendly', 'Persuasive', 'Funny', 'Professional'];
  const languages = ['English', 'Hindi', 'Spanish', 'French', 'German'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Generate Content</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Content Type</label>
              <select
                name="contentType"
                value={formData.contentType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Content Type</option>
                {contentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Topic</label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                placeholder="e.g. Digital Marketing for Startups"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Tone</label>
              <select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tones.map(tone => (
                  <option key={tone} value={tone}>{tone}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Keywords (comma separated)</label>
              <input
                type="text"
                value={formData.keywords}
                onChange={handleKeywordsChange}
                placeholder="e.g. SEO, growth, branding"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" /> Generating...
                </span>
              ) : 'Generate Content'}
            </button>
          </form>
        </div>
        
        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated Content</h2>
            {generatedContent && (
              <div className="flex items-center">
                <div className="mr-4">
                  <span className="text-sm text-gray-600 mr-2">SEO Score:</span>
                  <span className={`font-bold ${
                    seoScore >= 80 ? 'text-green-600' : 
                    seoScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {seoScore}%
                  </span>
                </div>
                <button
                  onClick={handleSave}
                  disabled={!generatedContent || saved}
                  className="flex items-center bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition disabled:bg-green-400"
                >
                  <FaSave className="mr-1" /> {saved ? 'Saved' : 'Save'}
                </button>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : generatedContent ? (
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap">{generatedContent}</div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-center">Fill out the form and click "Generate Content" to create your content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;