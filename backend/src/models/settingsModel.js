const pool = require('../config/database');

const settingsModel = {
  getSettings: async () => {
    const [rows] = await pool.query('SELECT * FROM website_settings LIMIT 1');
    return rows[0] || null;
  },

  updateSettings: async (data) => {
    const current = await settingsModel.getSettings();
    
    if (!current) {
      const [result] = await pool.query(
        `INSERT INTO website_settings (company_name, logo, phone, email, address, about, facebook, instagram, linkedin)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.company_name || 'AURA & SPACES',
          data.logo || null,
          data.phone || null,
          data.email || null,
          data.address || null,
          data.about || null,
          data.facebook || null,
          data.instagram || null,
          data.linkedin || null
        ]
      );
      return result.insertId;
    }

    const fields = [];
    const values = [];

    if (data.company_name !== undefined) { fields.push('company_name = ?'); values.push(data.company_name); }
    if (data.logo !== undefined) { fields.push('logo = ?'); values.push(data.logo); }
    if (data.phone !== undefined) { fields.push('phone = ?'); values.push(data.phone); }
    if (data.email !== undefined) { fields.push('email = ?'); values.push(data.email); }
    if (data.address !== undefined) { fields.push('address = ?'); values.push(data.address); }
    if (data.about !== undefined) { fields.push('about = ?'); values.push(data.about); }
    if (data.facebook !== undefined) { fields.push('facebook = ?'); values.push(data.facebook); }
    if (data.instagram !== undefined) { fields.push('instagram = ?'); values.push(data.instagram); }
    if (data.linkedin !== undefined) { fields.push('linkedin = ?'); values.push(data.linkedin); }

    if (fields.length === 0) return true;

    values.push(current.id);
    const [result] = await pool.query(`UPDATE website_settings SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  }
};

module.exports = settingsModel;
