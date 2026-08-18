const pool = require('../config/database');

const inquiryModel = {
  findAll: async (statusFilter = null) => {
    let sql = 'SELECT * FROM inquiries';
    const params = [];
    if (statusFilter) {
      sql += ' WHERE status = ?';
      params.push(statusFilter);
    }
    sql += ' ORDER BY created_at DESC';
    const [rows] = await pool.query(sql, params);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async ({ name, email, mobile, project_type, location, budget, message, status = 'pending' }) => {
    const [result] = await pool.query(
      'INSERT INTO inquiries (name, email, mobile, project_type, location, budget, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, mobile || null, project_type || null, location || null, budget || null, message, status]
    );
    return result.insertId;
  },

  updateStatus: async (id, status) => {
    const [result] = await pool.query('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM inquiries WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  countTotal: async () => {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM inquiries');
    return rows[0].total;
  },

  countPending: async () => {
    const [rows] = await pool.query("SELECT COUNT(*) as pending FROM inquiries WHERE status = 'pending'");
    return rows[0].pending;
  }
};

module.exports = inquiryModel;
