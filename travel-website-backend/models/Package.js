const db = require('../config/db');

class Package {
  static async addPackage({ name, description, date, price, photo, agency_id }) {
    const [result] = await db.query(
      'INSERT INTO packages (name, description, date, price, photo, agency_id) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, date, price, photo, agency_id]
    );
    return result.insertId;
  }

  static async getAllPackages(filters = {}) {
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

    const [packages] = await db.query(query, params);
    return packages;
  }

  static async getPackageById(id) {
    const [packages] = await db.query('SELECT * FROM packages WHERE id = ?', [id]);
    return packages[0] || null;
  }

  static async updatePackage(id, { name, description, date, price, photo }) {
    await db.query(
      'UPDATE packages SET name=?, description=?, date=?, price=?, photo=? WHERE id=?',
      [name, description, date, price, photo, id]
    );
  }

  static async deletePackage(id) {
    await db.query('DELETE FROM packages WHERE id = ?', [id]);
  }
}

module.exports = Package;