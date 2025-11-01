const User = require('../models/userModel');
const Content = require('../models/contentModel');

// @desc    Get admin analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
  try {
    // Get total users count
    const userCount = await User.countDocuments();
    
    // Get total content count
    const contentCount = await Content.countDocuments();
    
    // Get content by type
    const contentByType = await Content.aggregate([
      {
        $group: {
          _id: '$contentType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get content by language
    const contentByLanguage = await Content.aggregate([
      {
        $group: {
          _id: '$language',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get recent content (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentContent = await Content.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });
    
    // Get top users by content generation
    const topUsers = await Content.aggregate([
      {
        $group: {
          _id: '$user',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $project: {
          _id: 1,
          count: 1,
          name: { $arrayElemAt: ['$userInfo.name', 0] },
          email: { $arrayElemAt: ['$userInfo.email', 0] }
        }
      }
    ]);
    
    res.json({
      userCount,
      contentCount,
      contentByType,
      contentByLanguage,
      recentContent,
      topUsers
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

module.exports = {
  getAnalytics,
  getUsers,
};