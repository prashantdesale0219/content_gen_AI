import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSave, FaDownload, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { generatePDF } from '../utils/pdfUtils';

// Simple rich text editor component
const RichTextEditor = ({ value, onChange }) => {
  const handleBold = () => {
    document.execCommand('bold', false, null);
  };

  const handleItalic = () => {
    document.execCommand('italic', false, null);
  };

  const handleUnderline = () => {
    document.execCommand('underline', false, null);
  };

  const handleHeading = () => {
    document.execCommand('formatBlock', false, '<h2>');
  };

  const handleParagraph = () => {
    document.execCommand('formatBlock', false, '<p>');
  };

  const handleList = () => {
    document.execCommand('insertUnorderedList', false, null);
  };

  const handleOrderedList = () => {
    document.execCommand('insertOrderedList', false, null);
  };

  const handleContentChange = (e) => {
    onChange(e.target.innerHTML);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-2 border-b flex flex-wrap gap-2">
        <button 
          onClick={handleBold} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          type="button"
        >
          <strong>B</strong>
        </button>
        <button 
          onClick={handleItalic} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          type="button"
        >
          <em>I</em>
        </button>
        <button 
          onClick={handleUnderline} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          type="button"
        >
          <u>U</u>
        </button>
        <button 
          onClick={handleHeading} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          type="button"
        >
          H2
        </button>
        <button 
          onClick={handleParagraph} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          type="button"
        >
          P
        </button>
        <button 
          onClick={handleList} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          type="button"
        >
          • List
        </button>
        <button 
          onClick={handleOrderedList} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          type="button"
        >
          1. List
        </button>
      </div>
      <div
        className="p-4 min-h-[300px] focus:outline-none"
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleContentChange}
      />
    </div>
  );
};

const EditContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [content, setContent] = useState({
    topic: '',
    contentType: '',
    tone: '',
    keywords: [],
    language: '',
    generatedContent: '',
    seoScore: 0,
    isFavorite: false
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/contents/${id}`, config);
        setContent(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch content');
        navigate('/history');
      }
    };

    fetchContent();
  }, [id, user, navigate]);

  const handleContentChange = (newContent) => {
    setContent({ ...content, generatedText: newContent });
  };

  const handleTopicChange = (e) => {
    setContent({ ...content, topic: e.target.value });
  };

  const handleKeywordsChange = (e) => {
    const keywordsArray = e.target.value.split(',').map(keyword => keyword.trim());
    setContent({ ...content, keywords: keywordsArray });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Generate and download PDF
      generatePDF(
        content.topic,
        content.generatedText,
        content.contentType,
        content.tone
      );
      
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      };
      
      await axios.put(`/api/contents/${id}`, content, config);
      toast.success('Content updated and downloaded as PDF');
      setSaving(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update content');
      setSaving(false);
    }
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
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Edit Content</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Topic</label>
          <input
            type="text"
            value={content.topic}
            onChange={handleTopicChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Keywords (comma separated)</label>
          <input
            type="text"
            value={content.keywords.join(', ')}
            onChange={handleKeywordsChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700 font-medium">Content</label>
            <div className="flex items-center text-sm">
              <span className="mr-2">SEO Score:</span>
              <span className={`font-bold ${
                content.seoScore >= 80 ? 'text-green-600' : 
                content.seoScore >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {content.seoScore}%
              </span>
            </div>
          </div>
          <RichTextEditor 
            value={content.generatedText} 
            onChange={handleContentChange} 
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="mr-2">Type:</span>
            <span className="font-medium">{content.contentType}</span>
            <span className="mx-2">|</span>
            <span className="mr-2">Tone:</span>
            <span className="font-medium">{content.tone}</span>
            <span className="mx-2">|</span>
            <span className="mr-2">Language:</span>
            <span className="font-medium">{content.language}</span>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContent;