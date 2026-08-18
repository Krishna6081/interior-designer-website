const pool = require('../config/database');

const testimonialModel = {
  findAll: async (onlyApproved = false) => {
    let sql = 'SELECT * FROM testimonials';
    const params = [];
    if (onlyApproved) {
      sql += ' WHERE status = ?';
      params.push('approved');
    }
    sql += ' ORDER BY id DESC';
    const [rows] = await pool.query(sql, params);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async ({ customer_name, customer_image, rating = 5, review, status = 'pending' }) => {
    const [result] = await pool.query(
      'INSERT INTO testimonials (customer_name, customer_image, rating, review, status) VALUES (?, ?, ?, ?, ?)',
      [customer_name, customer_image || null, rating, review, status]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];

    if (data.customer_name !== undefined) { fields.push('customer_name = ?'); values.push(data.customer_name); }
    if (data.customer_image !== undefined) { fields.push('customer_image = ?'); values.push(data.customer_image); }
    if (data.rating !== undefined) { fields.push('rating = ?'); values.push(data.rating); }
    if (data.review !== undefined) { fields.push('review = ?'); values.push(data.review); }
    if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status); }

    if (fields.length === 0) return false;

    values.push(id);
    const [result] = await pool.query(`UPDATE testimonials SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM testimonials WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  countTotal: async () => {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM testimonials');
    return rows[0].total;
  }
};

module.exports = testimonialModel;
