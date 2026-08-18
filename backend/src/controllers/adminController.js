const pool = require('../config/database');
const { sendSuccess } = require('../utils/response');

const getDashboardStats = async (req, res, next) => {
  try {
    // 1. Calculate aggregate stats using SQL COUNT queries
    const [userRows] = await pool.query('SELECT COUNT(*) as total FROM users');
    const [serviceRows] = await pool.query('SELECT COUNT(*) as total FROM services');
    const [projectRows] = await pool.query('SELECT COUNT(*) as total FROM projects');
    const [testimonialRows] = await pool.query('SELECT COUNT(*) as total FROM testimonials');
    const [inquiryRows] = await pool.query('SELECT COUNT(*) as total FROM inquiries');
    const [pendingInquiryRows] = await pool.query("SELECT COUNT(*) as total FROM inquiries WHERE LOWER(status) = 'pending'");

    const totalUsers = userRows[0]?.total || 0;
    const totalServices = serviceRows[0]?.total || 0;
    const totalProjects = projectRows[0]?.total || 0;
    const totalTestimonials = testimonialRows[0]?.total || 0;
    const totalInquiries = inquiryRows[0]?.total || 0;
    const pendingInquiries = pendingInquiryRows[0]?.total || 0;

    // 2. Fetch Recent Projects (latest 4)
    const [recentProjectRows] = await pool.query(`
      SELECT p.id, p.title, p.category, p.location, p.design_style, p.created_at,
             (SELECT image_url FROM project_images WHERE project_id = p.id ORDER BY display_order ASC LIMIT 1) as hero_image
      FROM projects p
      ORDER BY p.id DESC
      LIMIT 4
    `);

    const recentProjects = recentProjectRows.map((p) => {
      let hero = p.hero_image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
      if (hero && hero.startsWith('/uploads')) {
        hero = `http://localhost:5000${hero}`;
      }
      return {
        id: p.id,
        title: p.title,
        category: p.category || 'Residential',
        location: p.location || 'Pune',
        heroImage: hero,
        created_at: p.created_at
      };
    });

    // 3. Fetch Recent Client Inquiries (latest 4)
    const [recentInquiryRows] = await pool.query(`
      SELECT id, name, email, mobile, project_type, location, budget, message, status, created_at
      FROM inquiries
      ORDER BY id DESC
      LIMIT 4
    `);

    const recentInquiries = recentInquiryRows.map((inq) => {
      const statusCap = inq.status ? inq.status.charAt(0).toUpperCase() + inq.status.slice(1) : 'Pending';
      return {
        id: inq.id,
        name: inq.name,
        email: inq.email,
        mobile: inq.mobile || '',
        projectType: inq.project_type || 'Residential Interior',
        location: inq.location || '',
        budget: inq.budget || '$10,000 - $25,000',
        status: statusCap,
        created_at: inq.created_at
      };
    });

    return sendSuccess(res, 'Admin dashboard statistics fetched successfully', {
      totalUsers,
      totalServices,
      totalProjects,
      totalTestimonials,
      totalInquiries,
      pendingInquiries,
      recentProjects,
      recentInquiries
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
