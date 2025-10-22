const Brand = require('../models/brandModel');
const fs = require('fs');
const path = require('path');

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
exports.updateBrand = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.file;

  if (!name) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  // Si se subió una nueva imagen, eliminamos la anterior del servidor
  Brand.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Marca no encontrada' });

    const oldImagePath = path.join(__dirname, '..', results[0].image_url);

    let newImageUrl = null;
    if (image) {
      newImageUrl = `/uploads/brands/${image.filename}`;
      // Borramos la imagen vieja si existe
      fs.unlink(oldImagePath, (err) => {
        if (err) console.warn('No se pudo eliminar la imagen anterior:', err.message);
      });
    }

    Brand.update(id, name, newImageUrl, (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ message: 'Marca actualizada correctamente' });
    });
  });
};

// Eliminar marca
exports.deleteBrand = (req, res) => {
  const { id } = req.params;

  Brand.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Marca no encontrada' });

    const imagePath = path.join(__dirname, '..', results[0].image_url);

    Brand.delete(id, (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      // Intentamos eliminar la imagen asociada
      fs.unlink(imagePath, (err3) => {
        if (err3) console.warn('No se pudo eliminar la imagen:', err3.message);
      });

      res.json({ message: 'Marca eliminada correctamente' });
    });
  });
};