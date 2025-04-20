const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../config/db');

// Uploads directory
const uploadDir = path.join(__dirname, '../uploads/blogs');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and GIF files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// CREATE blog post
const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;
    const authorId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const query = `
      INSERT INTO blog_posts 
      (title, content, image, author_id)
      VALUES (?, ?, ?, ?)
    `;
    const values = [title, content, image, authorId];
    const [result] = await db.query(query, values);

    res.status(201).json({ 
      message: "Blog post created", 
      postId: result.insertId,
      post: {
        id: result.insertId,
        title,
        content,
        image,
        author_id: authorId,
        created_at: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error(err);
    if (req.file) {
      fs.unlink(path.join(uploadDir, req.file.filename), () => {});
    }
    res.status(500).json({ message: "Server error" });
  }
};

// GET all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, u.username AS author_name
      FROM blog_posts p
      LEFT JOIN users u ON p.author_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch blog posts" });
  }
};

// GET single blog post
const getBlogPostById = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, u.username AS author_name
      FROM blog_posts p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.id = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching blog post" });
  }
};

// UPDATE blog post
const updateBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;
    const postId = req.params.id;
    const authorId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // First get the current post to check ownership and delete old image if needed
    const [currentPost] = await db.query('SELECT * FROM blog_posts WHERE id = ?', [postId]);
    if (currentPost.length === 0) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (currentPost[0].author_id !== authorId) {
      return res.status(403).json({ message: "You can only update your own posts" });
    }

    let query;
    let values;
    
    if (image) {
      // Delete old image if it exists
      if (currentPost[0].image) {
        const oldImagePath = path.join(uploadDir, currentPost[0].image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      query = 'UPDATE blog_posts SET title = ?, content = ?, image = ? WHERE id = ?';
      values = [title, content, image, postId];
    } else {
      query = 'UPDATE blog_posts SET title = ?, content = ? WHERE id = ?';
      values = [title, content, postId];
    }

    await db.query(query, values);

    res.json({ message: "Blog post updated" });
  } catch (err) {
    console.error(err);
    if (req.file) {
      fs.unlink(path.join(uploadDir, req.file.filename), () => {});
    }
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE blog post
const deleteBlogPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.user.id;

    const [rows] = await db.query('SELECT * FROM blog_posts WHERE id = ?', [postId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (rows[0].author_id !== authorId) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    // Delete associated image if it exists
    if (rows[0].image) {
      const imagePath = path.join(uploadDir, rows[0].image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await db.query('DELETE FROM blog_posts WHERE id = ?', [postId]);
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete blog post' });
  }
};

module.exports = {
  upload,
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};