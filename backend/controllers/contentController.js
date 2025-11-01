const Content = require('../models/contentModel');
const axios = require('axios');

// @desc    Generate content using Mistral API
// @route   POST /api/contents/generate
// @access  Private
const generateContent = async (req, res) => {
  try {
    const { contentType, tone, topic, keywords, language } = req.body;

    if (!contentType || !tone || !topic || !keywords || !language) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Format prompt for Mistral API
    const prompt = `Generate a ${contentType} in a ${tone} tone about "${topic}" using the keywords: ${keywords.join(', ')}.
    Keep it SEO-friendly and under 500 words. You MUST respond ONLY in ${language} language. This is very important.`;

    // Call Mistral API
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-medium',
        messages: [
          {
            role: 'system',
            content: `You are a content generation assistant that ONLY responds in ${language} language. Never use English unless specifically requested.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
        },
      }
    );

    // Extract generated text from response
    const generatedText = response.data.choices[0].message.content;

    // Calculate a simple SEO score (placeholder - in real app would use more sophisticated algorithm)
    const keywordsList = keywords.map(k => k.toLowerCase());
    const textLower = generatedText.toLowerCase();
    
    let keywordCount = 0;
    keywordsList.forEach(keyword => {
      const regex = new RegExp(keyword, 'g');
      const matches = textLower.match(regex);
      if (matches) {
        keywordCount += matches.length;
      }
    });
    
    // Simple SEO score calculation
    const wordCount = generatedText.split(' ').length;
    const keywordDensity = keywordCount / wordCount;
    const seoScore = Math.min(Math.round(keywordDensity * 100 * 10), 100); // Score between 0-100

    // Save to database
    const content = await Content.create({
      user: req.user._id,
      contentType,
      tone,
      topic,
      keywords: keywordsList,
      language,
      generatedText,
      seoScore,
    });

    res.status(201).json({
      _id: content._id,
      contentType: content.contentType,
      tone: content.tone,
      topic: content.topic,
      keywords: content.keywords,
      language: content.language,
      generatedText: content.generatedText,
      seoScore: content.seoScore,
      isFavorite: content.isFavorite,
      createdAt: content.createdAt,
    });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({
      message: 'Error generating content',
      error: error.response ? error.response.data : error.message,
    });
  }
};

// @desc    Get user content
// @route   GET /api/contents
// @access  Private
const getUserContent = async (req, res) => {
  try {
    const contents = await Content.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ message: 'Error fetching content' });
  }
};

// @desc    Get user favorite content
// @route   GET /api/contents/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const favorites = await Content.find({ 
      user: req.user._id,
      isFavorite: true 
    }).sort({ createdAt: -1 });
    
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorite content' });
  }
};

// @desc    Toggle favorite status of content
// @route   PUT /api/contents/:id/favorite
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }

    // Check if content belongs to user
    if (content.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    content.isFavorite = !content.isFavorite;
    const updatedContent = await content.save();

    res.json(updatedContent);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Error toggling favorite status' });
  }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private
// @desc    Update content
// @route   PUT /api/contents/:id
// @access  Private
const updateContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }

    // Check if content belongs to user
    if (content.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    // Update content fields
    content.topic = req.body.topic || content.topic;
    content.keywords = req.body.keywords || content.keywords;
    content.generatedText = req.body.generatedText || content.generatedText;
    content.contentType = req.body.contentType || content.contentType;
    content.tone = req.body.tone || content.tone;
    content.language = req.body.language || content.language;
    content.seoScore = req.body.seoScore || content.seoScore;
    
    // Save updated content
    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ message: 'Error updating content' });
  }
};

const deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }

    // Check if content belongs to user
    if (content.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await content.deleteOne();
    res.json({ message: 'Content removed' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ message: 'Error deleting content' });
  }
};

module.exports = {
  generateContent,
  getUserContent,
  getFavorites,
  toggleFavorite,
  updateContent,
  deleteContent,
};