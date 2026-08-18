const pool = require('../config/database');

const projectModel = {
  findAll: async ({ category, onlyActive = false } = {}) => {
    let sql = 'SELECT p.* FROM projects p WHERE 1=1';
    const params = [];

    if (onlyActive) {
      sql += ' AND p.status = ?';
      params.push('active');
    }

    if (category && category !== 'All') {
      sql += ' AND p.category = ?';
      params.push(category);
    }

    sql += ' ORDER BY p.id DESC';
    const [projects] = await pool.query(sql, params);

    // Attach images for each project
    for (let p of projects) {
      const [images] = await pool.query(
        'SELECT id, image_url, display_order FROM project_images WHERE project_id = ? ORDER BY display_order ASC, id ASC',
        [p.id]
      );
      p.images = images;
    }

    return projects;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    if (rows.length === 0) return null;

    const project = rows[0];
    const [images] = await pool.query(
      'SELECT id, image_url, display_order FROM project_images WHERE project_id = ? ORDER BY display_order ASC, id ASC',
      [id]
    );
    project.images = images;
    return project;
  },

  create: async ({ title, category, location, description, area, design_style, completion_date, status = 'active' }) => {
    const [result] = await pool.query(
      'INSERT INTO projects (title, category, location, description, area, design_style, completion_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, category, location || null, description, area || null, design_style || null, completion_date || null, status]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];

    if (data.title !== undefined) { fields.push('title = ?'); values.push(data.title); }
    if (data.category !== undefined) { fields.push('category = ?'); values.push(data.category); }
    if (data.location !== undefined) { fields.push('location = ?'); values.push(data.location); }
    if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
    if (data.area !== undefined) { fields.push('area = ?'); values.push(data.area); }
    if (data.design_style !== undefined) { fields.push('design_style = ?'); values.push(data.design_style); }
    if (data.completion_date !== undefined) { fields.push('completion_date = ?'); values.push(data.completion_date); }
    if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status); }

    if (fields.length === 0) return false;

    values.push(id);
    const [result] = await pool.query(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  addImage: async (projectId, imageUrl, displayOrder = 0) => {
    const [result] = await pool.query(
      'INSERT INTO project_images (project_id, image_url, display_order) VALUES (?, ?, ?)',
      [projectId, imageUrl, displayOrder]
    );
    return result.insertId;
  },

  deleteImage: async (imageId) => {
    const [result] = await pool.query('DELETE FROM project_images WHERE id = ?', [imageId]);
    return result.affectedRows > 0;
  },

  findImageById: async (imageId) => {
    const [rows] = await pool.query('SELECT * FROM project_images WHERE id = ?', [imageId]);
    return rows[0] || null;
  },

  countTotal: async () => {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM projects');
    return rows[0].total;
  }
};

module.exports = projectModel;
