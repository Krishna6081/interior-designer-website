const pool = require('../config/database');

const userModel = {
  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT id, name, email, mobile, role, status, created_at, updated_at FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async ({ name, email, mobile, password, role = 'user', status = 'active' }) => {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, mobile, password, role, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, mobile || null, password, role, status]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT id, name, email, mobile, role, status, created_at, updated_at FROM users ORDER BY id DESC');
    return rows;
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];

    if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
    if (data.email !== undefined) { fields.push('email = ?'); values.push(data.email); }
    if (data.mobile !== undefined) { fields.push('mobile = ?'); values.push(data.mobile); }
    if (data.role !== undefined) { fields.push('role = ?'); values.push(data.role); }
    if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status); }
    if (data.password !== undefined) { fields.push('password = ?'); values.push(data.password); }

    if (fields.length === 0) return false;

    values.push(id);
    const [result] = await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  countTotal: async () => {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM users');
    return rows[0].total;
  }
};

module.exports = userModel;
