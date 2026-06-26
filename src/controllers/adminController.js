const linkRepo = require('../repositories/linkRepository');
const clickRepo = require('../repositories/clickRepository');
const { success } = require('../utils/response');

exports.getLinks = async (req, res) => {
  const links = await linkRepo.findAll();
  success(res, links);
};

exports.getLink = async (req, res) => {
  const link = await linkRepo.findById(req.params.id);
  if (!link) return res.status(404).json({ error: 'Not found' });
  success(res, link);
};

exports.getStats = async (req, res) => {
  const stats = await clickRepo.getStatsByLinkId(req.params.id);
  success(res, stats);
};
