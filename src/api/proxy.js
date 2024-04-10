// /api/proxy.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const response = await fetch('https://www.figma.com/api/plugins/profile/2392090?');
  const data = await response.json();

  res.status(200).json(data);
};
