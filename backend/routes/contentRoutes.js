const express = require('express');
const router = express.Router();
const {
  generateContent,
  getUserContent,
  getFavorites,
  toggleFavorite,
  updateContent,
  deleteContent,
} = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateContent);
router.get('/', protect, getUserContent);
router.get('/favorites', protect, getFavorites);
router.put('/:id/favorite', protect, toggleFavorite);
router.put('/:id', protect, updateContent);
router.delete('/:id', protect, deleteContent);

module.exports = router;