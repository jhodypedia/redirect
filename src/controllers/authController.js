const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../db/mysql');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const rows = await query('SELECT * FROM admins WHERE username = ? LIMIT 1', [username]);
    const admin = rows[0];

    if (!admin) {
      return res.render('login', { error: 'Username atau password salah' });
    }

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) {
      return res.render('login', { error: 'Username atau password salah' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 hari
    });

    res.redirect('/dashboard');
  } catch (error) {
    res.render('login', { error: 'Terjadi kesalahan sistem' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('admin_token');
  res.redirect('/login');
};
