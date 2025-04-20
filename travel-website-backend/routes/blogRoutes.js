const express = require('express');
const router = express.Router();
const {
  upload,
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Create blog post (authenticated users)
router.post(
  '/',
  authenticate,
  upload.single('image'),
  createBlogPost
);

// Get all blog posts (public)
router.get('/', getAllBlogPosts);

// Get single blog post (public)
router.get('/:id', getBlogPostById);

// Update blog post (only author or admin)
router.put(
  '/:id',
  authenticate,
  upload.single('image'),
  updateBlogPost
);

// Delete blog post (only author or admin)
router.delete('/:id', authenticate, deleteBlogPost);

module.exports = router;