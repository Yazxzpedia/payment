const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { URLSearchParams } = require('url');
const crypto = require("crypto");
const QRCode = require('qrcode');
const { ImageUploadService } = require('node-upload-images');

// CLASS OrderKuota
module.exports = {
  name: "Mutasi QRIS",
  desc: "Cek mutasi QRIS via xskycodes API",
  category: "Orderkuota",
  path: "/orderkuota/mutasiqr?apikey=&username=&token=",
  async run(req, res) {
    const { apikey, username, token } = req.query;

    if (!global.apikey.includes(apikey)) {
      return res.json({ status: false, error: 'Apikey invalid' });
    }
    if (!username) {
      return res.json({ status: false, error: 'Missing username' });
    }
    if (!token) {
      return res.json({ status: false, error: 'Missing token' });
    }

    try {
      const url = `https://xskycodes-apis.vercel.app/orderkuota/mutasiqr?apikey=Yazxz&username=${encodeURIComponent(username)}&token=${encodeURIComponent(token)}`;

      const response = await fetch(url);
      const data = await response.json();

      res.json({ status: true, result: data });
    } catch (err) {
      res.status(500).json({ status: false, error: err.message });
    }
  }
};
