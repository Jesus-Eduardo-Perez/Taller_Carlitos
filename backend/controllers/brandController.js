const Brand = require('../models/brandModel');

exports.getBrands = (req, res) => {
    Brand.getAll((err, results) => {
       if (err) return res.status(500).json({error: err.message});
       res.json(results);
    });
};
exports.createBrand = (req, res) => {
  const { name } = req.body;
  const image = req.file; // viene de multer

  if (!name || !image) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const imageUrl = `/uploads/brands/${image.filename}`;

  Brand.create(name, imageUrl, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Marca creada correctamente', id: result.insertId });
  });
};