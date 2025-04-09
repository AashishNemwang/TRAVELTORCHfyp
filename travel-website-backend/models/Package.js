const pool = require('../config/db');

class Package {
  static async create({ name, description, location, date, price, photo, agencyId }) {
    const [result] = await pool.execute(
      'INSERT INTO packages (name, description, location, date, price, photo, agency_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, location, date, price, photo, agencyId]
    );
    return result.insertId;
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM packages WHERE 1=1';
    const params = [];

    if (filters.search) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.search}%`);
    }
    if (filters.minPrice) {
      query += ' AND price >= ?';
      params.push(filters.minPrice);
    }
    if (filters.maxPrice) {
      query += ' AND price <= ?';
      params.push(filters.maxPrice);
    }
    if (filters.agencyId) {
      query += ' AND agency_id = ?';
      params.push(filters.agencyId);
    }

    const [packages] = await pool.execute(query, params);
    return packages;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM packages WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, { name, description, location, date, price, photo }) {
    await pool.execute(
      'UPDATE packages SET name = ?, description = ?, location = ?, date = ?, price = ?, photo = ? WHERE id = ?',
      [name, description, location, date, price, photo, id]
    );
  }

  static async delete(id) {
    await pool.execute(
      'DELETE FROM packages WHERE id = ?',
      [id]
    );
  }
}

module.exports = Package;