const express = require('express');
const router = express.Router();
const { getAnalytics, getUsers } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/analytics', protect, admin, getAnalytics);
router.get('/users', protect, admin, getUsers);

module.exports = router;