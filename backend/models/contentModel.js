const mongoose = require('mongoose');

const contentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    contentType: {
      type: String,
      required: true,
      enum: ['Blog', 'Ad', 'Caption', 'Product Description', 'Article', 'Blog Post', 'Social Media', 'Email'],
    },
    tone: {
      type: String,
      required: true,
      enum: ['Formal', 'Friendly', 'Persuasive', 'Funny', 'Professional'],
    },
    topic: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: 'English',
    },
    generatedText: {
      type: String,
      required: true,
    },
    seoScore: {
      type: Number,
      default: 0,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;