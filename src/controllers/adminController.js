const linkRepo = require('../repositories/linkRepository');
const clickRepo = require('../repositories/clickRepository');

exports.renderDashboard = async (req, res) => {
  try {
    const links = await linkRepo.findAll();
    const activeLinksCount = links.filter(l => l.is_active).length;
    
    // Render halaman dashboard EJS
    res.render('dashboard', { 
      path: '/admin',
      links,
      stats: {
        active: activeLinksCount,
        total: links.length
      }
    });
  } catch (error) {
    res.status(500).send('Terjadi kesalahan saat memuat dashboard.');
  }
};
