const pool = require('../config/db');

class Blog {
  static async create({ title, content, image, authorId }) {
    const [result] = await pool.execute(
      `INSERT INTO blog_posts 
       (title, content, image, author_id) 
       VALUES (?, ?, ?, ?)`,
      [title, content, image, authorId]
    );
    return result.insertId;
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT p.*, u.username AS author_name 
      FROM blog_posts p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE 1=1
    `;
    const params = [];

    // Add filters
    if (filters.search) {
      query += ' AND (p.title LIKE ? OR p.content LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    if (filters.authorId) {
      query += ' AND p.author_id = ?';
      params.push(filters.authorId);
    }

    // Add sorting
    query += ' ORDER BY p.created_at DESC';

    // Add pagination if needed
    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(parseInt(filters.limit));
    }
    if (filters.offset) {
      query += ' OFFSET ?';
      params.push(parseInt(filters.offset));
    }

    const [posts] = await pool.execute(query, params);
    return posts;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT p.*, u.username AS author_name 
       FROM blog_posts p
       LEFT JOIN users u ON p.author_id = u.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async update(id, updates) {
    const { image, ...otherUpdates } = updates;
    let query = 'UPDATE blog_posts SET ';
    const params = [];
    const setClauses = [];

    // Build dynamic update query
    Object.entries(otherUpdates).forEach(([key, value]) => {
      if (value !== undefined) {
        setClauses.push(`${key} = ?`);
        params.push(value);
      }
    });

    if (image) {
      setClauses.push('image = ?');
      params.push(image);
    }

    query += setClauses.join(', ') + ' WHERE id = ?';
    params.push(id);

    await pool.execute(query, params);
  }

  static async delete(id) {
    // First get the post to delete its image
    const post = await this.findById(id);
    if (post && post.image) {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join('uploads', 'blogs', post.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await pool.execute('DELETE FROM blog_posts WHERE id = ?', [id]);
  }
}

module.exports = Blog;