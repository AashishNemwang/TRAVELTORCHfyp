const pool = require('../config/db');

class Package {
  static async create({ name, destination, type, price, startDate, endDate, duration, description, photo, agencyId }) {
    const [result] = await pool.execute(
      `INSERT INTO travel_package 
       (name, destination, type, price, startDate, endDate, duration, description, photo, agency_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, destination, type, price, startDate, endDate, duration, description, photo, agencyId]
    );
    return result.insertId;
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT p.*, a.name as agency_name 
      FROM travel_package p
      LEFT JOIN agencies a ON p.agency_id = a.id
      WHERE 1=1
    `;
    const params = [];

    // Add filters
    if (filters.search) {
      query += ' AND (p.name LIKE ? OR p.destination LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    if (filters.minPrice) {
      query += ' AND p.price >= ?';
      params.push(filters.minPrice);
    }
    if (filters.maxPrice) {
      query += ' AND p.price <= ?';
      params.push(filters.maxPrice);
    }
    if (filters.agencyId) {
      query += ' AND p.agency_id = ?';
      params.push(filters.agencyId);
    }
    if (filters.type) {
      query += ' AND p.type = ?';
      params.push(filters.type);
    }

    // Add sorting
    query += ' ORDER BY p.created_at DESC';

    const [packages] = await pool.execute(query, params);
    return packages;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT p.*, a.name as agency_name 
       FROM travel_package p
       LEFT JOIN agencies a ON p.agency_id = a.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async update(id, updates) {
    const { photo, ...otherUpdates } = updates;
    let query = 'UPDATE travel_package SET ';
    const params = [];
    const setClauses = [];

    // Build dynamic update query
    Object.entries(otherUpdates).forEach(([key, value]) => {
      if (value !== undefined) {
        setClauses.push(`${key} = ?`);
        params.push(value);
      }
    });

    if (photo) {
      setClauses.push('photo = ?');
      params.push(photo);
    }

    query += setClauses.join(', ') + ' WHERE id = ?';
    params.push(id);

    await pool.execute(query, params);
  }

  static async delete(id) {
    // First get the package to delete its photo
    const package = await this.findById(id);
    if (package && package.photo) {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join('uploads', package.photo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await pool.execute('DELETE FROM travel_package WHERE id = ?', [id]);
  }
}

module.exports = Package;