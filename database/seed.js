const path = require('path');
const backendNodeModules = path.join(__dirname, '../backend/node_modules');

const mysql = require(path.join(backendNodeModules, 'mysql2/promise'));
const bcrypt = require(path.join(backendNodeModules, 'bcryptjs'));
const dotenv = require(path.join(backendNodeModules, 'dotenv'));

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
};

const allProjects = [
  {
    title: "Modern Pune Residence",
    category: "Residential",
    location: "Koregaon Park, Pune",
    description: "A serene minimalist penthouse combining warm teak wood, Italian Travertine marble, and panoramic lush garden views. Featuring an open-plan layout, custom fluted paneling, and hidden smart-home automations.",
    area: "4,200 sq.ft",
    design_style: "Modern Luxury",
    completion_date: "October 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Luxury Sky Apartment",
    category: "Luxury",
    location: "Worli, Mumbai",
    description: "Suspended high above the Arabian Sea, this luxury sky apartment integrates brushed champagne metals, plush velvet seating, and custom Italian marble wall cladding to offer unparalleled executive elegance.",
    area: "3,800 sq.ft",
    design_style: "Contemporary Chic",
    completion_date: "December 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Contemporary Corporate Office",
    category: "Office",
    location: "Bandra Kurla Complex, Mumbai",
    description: "Designed for modern tech leaders, Nexus HQ balances focused solo work areas with energetic open spaces. High acoustic dampening ceiling panels, ergonomic standing desks, and a central social bar.",
    area: "12,000 sq.ft",
    design_style: "Biophilic Modern",
    completion_date: "January 2026",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Minimalist Japandi Kitchen",
    category: "Kitchen",
    location: "Jubilee Hills, Hyderabad",
    description: "Blending Scandinavian functionality with Japanese minimalist philosophy, this kitchen features concealed storage walls, integrated Gaggenau appliances, and a central waterfall island.",
    area: "650 sq.ft",
    design_style: "Japandi Minimalism",
    completion_date: "November 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Regal Living Lounge",
    category: "Living Room",
    location: "Vasant Vihar, New Delhi",
    description: "Double-height living space adorned with custom crystal chandelier, silk rugs, and architectural crown moldings, seamlessly integrating classical elements with modern seating.",
    area: "1,800 sq.ft",
    design_style: "Neo-Classical Modern",
    completion_date: "August 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Serene Master Suite",
    category: "Bedroom",
    location: "Indiranagar, Bengaluru",
    description: "A soothing sanctuary characterized by linen wall coverings, custom walnut headboard, ambient cove lighting, private morning tea balcony, and circadian lighting controls.",
    area: "950 sq.ft",
    design_style: "Organic Modern",
    completion_date: "September 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Boutique Fashion Showroom",
    category: "Commercial",
    location: "Kala Ghoda, Mumbai",
    description: "High-end couture boutique featuring curved Venetian plaster walls, arch display niches, soft warm spotlights, micro-cement arches, and VIP fitting salons.",
    area: "2,500 sq.ft",
    design_style: "Minimalist Glamour",
    completion_date: "February 2026",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Marbella Style Coastal Villa",
    category: "Modern",
    location: "Candolim, Goa",
    description: "Sun-drenched holiday villa featuring whitewashed textured walls, natural teak pergolas, terracotta accents, natural linen drapes, and outdoor lounge pools.",
    area: "6,500 sq.ft",
    design_style: "Mediterranean Luxury",
    completion_date: "January 2026",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Zenith Penthouse Terrace",
    category: "Residential",
    location: "Banjara Hills, Hyderabad",
    description: "Panoramic rooftop sanctuary with infinity glass pool, recessed firepit lounge, automated retractable awning, dark basalt stone, and brushed bronze fixtures.",
    area: "3,200 sq.ft",
    design_style: "Ultra-Modern Luxury",
    completion_date: "December 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Emerald Bay Spa Bathroom",
    category: "Residential",
    location: "Alibaug, Maharashtra",
    description: "Bespoke spa bathroom featuring emerald book-matched marble slabs, deep soaking stone tub, rain shower enclosure, heated marble floors, and brass thermostatic controls.",
    area: "520 sq.ft",
    design_style: "Spa Luxury",
    completion_date: "January 2026",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Opulent Private Cinema",
    category: "Commercial",
    location: "Kalyani Nagar, Pune",
    description: "Custom 12-seat private Dolby Atmos home theater with acoustic velvet walls, starry optical fiber ceiling, Italian motorized recliner loungers, and concealed subwoofer arrays.",
    area: "850 sq.ft",
    design_style: "Art Deco Modern",
    completion_date: "February 2026",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Artisan Dining Pavilion",
    category: "Residential",
    location: "Boat Club Road, Pune",
    description: "Handcrafted 12-seater live-edge walnut dining table with custom brass chandelier, temperature-controlled glass wine storage, and warm plaster wall finishes.",
    area: "1,100 sq.ft",
    design_style: "Organic Minimalist",
    completion_date: "October 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Biophilic Garden Villa",
    category: "Residential",
    location: "Lonavala, Maharashtra",
    description: "Hillside luxury getaway built with rammed earth walls, indoor courtyard trees, solar circadian skylights, natural stone, and organic non-toxic finishes.",
    area: "5,800 sq.ft",
    design_style: "Biophilic Eco-Luxury",
    completion_date: "November 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Grand Heritage Estate",
    category: "Residential",
    location: "Civil Lines, Jaipur",
    description: "Meticulous restoration of a 100-year-old haveli combining hand-carved stone arches with modern luxury amenities, custom silk drapery, and antique art displays.",
    area: "8,200 sq.ft",
    design_style: "Royal Heritage Revival",
    completion_date: "August 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Smart Luminary Penthouse",
    category: "Luxury",
    location: "Prabhadevi, Mumbai",
    description: "Fully automated luxury penthouse with biometric entry, hidden OLED screens, circadian lighting systems, motorized glass partitions, and multi-zone invisible audio.",
    area: "4,500 sq.ft",
    design_style: "Futuristic Modern",
    completion_date: "February 2026",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Azure Lounge & Cafe",
    category: "Commercial",
    location: "Koregaon Park Annex, Pune",
    description: "Chic artisanal coffee lounge featuring terrazzo flooring, custom brass lighting fixtures, outdoor patio seating, velvet booth seating, and acoustic plaster walls.",
    area: "2,200 sq.ft",
    design_style: "Mediterranean Modern",
    completion_date: "December 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Celestial Duplex Loft",
    category: "Luxury",
    location: "Lower Parel, Mumbai",
    description: "Double-height industrial loft featuring exposed brick walls, steel spiral staircase, floating glass catwalks, custom leather sofas, and brass pendant grids.",
    area: "3,600 sq.ft",
    design_style: "Industrial Chic",
    completion_date: "January 2026",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Scandi Coastal Retreat",
    category: "Residential",
    location: "ECR, Chennai",
    description: "Luminous beachfront sanctuary framed with bleached oak, woven rattan, serene ocean views, open-air living pavilions, and whitewashed oak joinery.",
    area: "5,100 sq.ft",
    design_style: "Scandinavian Coastal",
    completion_date: "February 2026",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Avant-Garde Studio Residence",
    category: "Residential",
    location: "Hauz Khas Village, New Delhi",
    description: "A creative artist sanctuary featuring museum-grade track lighting, sculptural seating, micro-cement floors, adaptable display walls, and bespoke brass sculpture stands.",
    area: "2,800 sq.ft",
    design_style: "Avant-Garde Modern",
    completion_date: "November 2025",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "Palatial Wellness Manor",
    category: "Luxury",
    location: "Gachibowli, Hyderabad",
    description: "A grand private estate equipped with indoor hydrotherapy pool, private sauna, expansive marble porticos, custom Venetian plaster, and handcrafted teak doors.",
    area: "9,500 sq.ft",
    design_style: "Royal Contemporary",
    completion_date: "March 2026",
    status: "active",
    featured: 1,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

async function seedDatabase() {
  let connection;
  try {
    console.log('Connecting to MySQL server...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL.');

    const dbName = process.env.DB_NAME || 'interior_designer_db';
    console.log(`Ensuring database '${dbName}' exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.changeUser({ database: dbName });

    // Table schemas
    const schemaSql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        mobile VARCHAR(20) DEFAULT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_users_email (email),
        INDEX idx_users_role (role)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) DEFAULT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_services_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        category VARCHAR(100) NOT NULL,
        location VARCHAR(150) DEFAULT NULL,
        description TEXT NOT NULL,
        area VARCHAR(50) DEFAULT NULL,
        design_style VARCHAR(100) DEFAULT NULL,
        completion_date VARCHAR(50) DEFAULT NULL,
        featured TINYINT(1) DEFAULT 1,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_projects_category (category),
        INDEX idx_projects_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS project_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_project_images_project FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        customer_image VARCHAR(255) DEFAULT NULL,
        rating INT NOT NULL DEFAULT 5,
        review TEXT NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        mobile VARCHAR(20) DEFAULT NULL,
        project_type VARCHAR(100) DEFAULT NULL,
        location VARCHAR(150) DEFAULT NULL,
        budget VARCHAR(100) DEFAULT NULL,
        message TEXT NOT NULL,
        status ENUM('pending', 'contacted', 'completed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_inquiries_status (status),
        INDEX idx_inquiries_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS website_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(150) NOT NULL DEFAULT 'AURA & SPACES',
        logo VARCHAR(255) DEFAULT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        email VARCHAR(150) DEFAULT NULL,
        address TEXT DEFAULT NULL,
        about TEXT DEFAULT NULL,
        facebook VARCHAR(255) DEFAULT NULL,
        instagram VARCHAR(255) DEFAULT NULL,
        linkedin VARCHAR(255) DEFAULT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    console.log('Ensuring tables exist...');
    await connection.query(schemaSql);

    // Ensure featured column exists if table was previously created without it
    try {
      await connection.query('ALTER TABLE projects ADD COLUMN featured TINYINT(1) DEFAULT 1 AFTER completion_date;');
    } catch (e) {
      // Column already exists
    }

    console.log('Tables created / verified.');

    // Seed Admin User
    const adminEmail = 'admin@example.com';
    const [existingAdmin] = await connection.query('SELECT * FROM users WHERE email = ?', [adminEmail]);
    if (existingAdmin.length === 0) {
      const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
      await connection.query(
        'INSERT INTO users (name, email, mobile, password, role, status) VALUES (?, ?, ?, ?, ?, ?)',
        ['Admin User', adminEmail, '9876543210', adminPasswordHash, 'admin', 'active']
      );
      console.log('✅ Admin user created: admin@example.com / Admin@123');
    }

    // Seed Normal User
    const userEmail = 'john@example.com';
    const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [userEmail]);
    if (existingUser.length === 0) {
      const userPasswordHash = await bcrypt.hash('password123', 10);
      await connection.query(
        'INSERT INTO users (name, email, mobile, password, role, status) VALUES (?, ?, ?, ?, ?, ?)',
        ['John Doe', userEmail, '9876543210', userPasswordHash, 'user', 'active']
      );
      console.log('✅ Demo user created: john@example.com / password123');
    }

    // Seed Projects (upsert / populate all 20)
    for (const p of allProjects) {
      const [existing] = await connection.query('SELECT id FROM projects WHERE title = ?', [p.title]);
      let projectId;
      if (existing.length === 0) {
        const [result] = await connection.query(
          'INSERT INTO projects (title, category, location, description, area, design_style, completion_date, featured, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [p.title, p.category, p.location, p.description, p.area, p.design_style, p.completion_date, p.featured, p.status]
        );
        projectId = result.insertId;
      } else {
        projectId = existing[0].id;
        await connection.query(
          'UPDATE projects SET category = ?, location = ?, description = ?, area = ?, design_style = ?, completion_date = ?, featured = ?, status = ? WHERE id = ?',
          [p.category, p.location, p.description, p.area, p.design_style, p.completion_date, p.featured, p.status, projectId]
        );
      }

      // Sync images
      const [existingImages] = await connection.query('SELECT id FROM project_images WHERE project_id = ?', [projectId]);
      if (existingImages.length === 0 && p.images && p.images.length > 0) {
        for (let i = 0; i < p.images.length; i++) {
          await connection.query(
            'INSERT INTO project_images (project_id, image_url, display_order) VALUES (?, ?, ?)',
            [projectId, p.images[i], i + 1]
          );
        }
      }
    }
    console.log(`✅ Seeded ${allProjects.length} featured projects into MySQL database.`);

    // Seed Website Settings
    const [settingsCount] = await connection.query('SELECT COUNT(*) as count FROM website_settings');
    if (settingsCount[0].count === 0) {
      await connection.query(
        `INSERT INTO website_settings (company_name, logo, phone, email, address, about, facebook, instagram, linkedin)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          'AURA & SPACES',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
          '+91 (020) 2612-8899',
          'concierge@auraspaces.com',
          'Suite 401, Grand Atelier Tower, Koregaon Park, Pune, Maharashtra 411001',
          'Bespoke Interior Architecture & Fine Living since 2012.',
          'https://facebook.com/auraspaces',
          'https://instagram.com/auraspaces.design',
          'https://linkedin.com/company/auraspaces'
        ]
      );
      console.log('✅ Default website settings seeded.');
    }

    console.log('🎉 Database seeding completed successfully.');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    if (connection) await connection.end();
  }
}

seedDatabase();
