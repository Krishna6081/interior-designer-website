const pool = require('../config/database');

const serviceModel = {
  findAll: async (onlyActive = false) => {
    let sql = 'SELECT * FROM services';
    const params = [];
    if (onlyActive) {
      sql += ' WHERE status = ?';
      params.push('active');
    }
    sql += ' ORDER BY id DESC';
    const [rows] = await pool.query(sql, params);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async ({ title, description, image, status = 'active' }) => {
    const [result] = await pool.query(
      'INSERT INTO services (title, description, image, status) VALUES (?, ?, ?, ?)',
      [title, description, image || null, status]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];

    if (data.title !== undefined) { fields.push('title = ?'); values.push(data.title); }
    if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
    if (data.image !== undefined) { fields.push('image = ?'); values.push(data.image); }
    if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status); }

    if (fields.length === 0) return false;

    values.push(id);
    const [result] = await pool.query(`UPDATE services SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM services WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  countTotal: async () => {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM services');
    return rows[0].total;
  }
};

module.exports = serviceModel;
