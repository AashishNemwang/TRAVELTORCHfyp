const db = require("../config/db");

const Package = {
  addPackage: (pkg, callback) => {
    const { name, description, date, price, photo, agency_id } = pkg;
    const sql = `INSERT INTO travel_packages (name, description, date, price, photo, agency_id) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, description, date, price, photo, agency_id], callback);
  },

  getAllPackages: (filters, callback) => {
    let sql = `SELECT * FROM travel_packages WHERE 1=1`;
    let params = [];

    if (filters.search) {
      sql += ` AND (name LIKE ? OR description LIKE ?)`;
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    if (filters.minPrice) {
      sql += ` AND price >= ?`;
      params.push(filters.minPrice);
    }
    if (filters.maxPrice) {
      sql += ` AND price <= ?`;
      params.push(filters.maxPrice);
    }
    if (filters.startDate) {
      sql += ` AND date >= ?`;
      params.push(filters.startDate);
    }
    if (filters.endDate) {
      sql += ` AND date <= ?`;
      params.push(filters.endDate);
    }

    db.query(sql, params, callback);
  },

  getPackageById: (id, callback) => {
    const sql = "SELECT * FROM travel_packages WHERE id = ?";
    db.query(sql, [id], callback);
  },

  updatePackage: (id, pkg, callback) => {
    const { name, description, date, price, photo } = pkg;
    const sql = `UPDATE travel_packages 
                 SET name=?, description=?, date=?, price=?, photo=? 
                 WHERE id=?`;
    db.query(sql, [name, description, date, price, photo, id], callback);
  },

  deletePackage: (id, callback) => {
    const sql = "DELETE FROM travel_packages WHERE id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = Package;
