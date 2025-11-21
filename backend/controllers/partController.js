const fs = require('fs');
const path = require('path');
const Part = require('../models/partModel');

// Obtener todas las piezas
exports.getParts = (req, res) => {
  Part.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
exports.getPartsByBrand = (req, res) => {
  const brandId = req.params.brand_id;

  Part.getByBrandId(brandId, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Obtener una pieza por ID
exports.getPartById = (req, res) => {
  const { id } = req.params;
  Part.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Pieza no encontrada' });
    res.json(results[0]);
  });
};

// Crear nueva pieza
exports.createPart = (req, res) => {
  const { name, brand_id, model, car_make, car_model, year_range, price, stock, description } = req.body;
  const image = req.file;

  if (!name || !brand_id || !price) {
    return res.status(400).json({ error: 'Faltan datos obligatorios (name, brand_id, price)' });
  }

  const newPart = {
    name,
    brand_id,
    model,
    car_make,
    car_model,
    year_range,
    price,
    stock,
    description,
    image_url: image ? `/uploads/parts/${image.filename}` : null
  };

  Part.create(newPart, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Pieza creada correctamente', id: result.insertId });
  });
};

// Actualizar pieza
exports.updatePart = (req, res) => {
  const { id } = req.params;
  const { name, brand_id, model, car_make, car_model, year_range, price, stock, description } = req.body;
  const image = req.file;

  if (!name || !brand_id || !price) {
    return res.status(400).json({ error: 'Faltan datos obligatorios (name, brand_id, price)' });
  }

  Part.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Pieza no encontrada' });

    const oldImagePath = results[0].image_url ? path.join(__dirname, '..', results[0].image_url) : null;
    const newImageUrl = image ? `/uploads/parts/${image.filename}` : results[0].image_url;

    // Si se subió una nueva imagen, eliminar la vieja
    if (image && oldImagePath) {
      fs.unlink(oldImagePath, (err) => {
        if (err) console.warn('No se pudo eliminar la imagen anterior:', err.message);
      });
    }

    const updatedPart = {
      name,
      brand_id,
      model,
      car_make,
      car_model,
      year_range,
      price,
      stock,
      description,
      image_url: newImageUrl
    };

    Part.update(id, updatedPart, (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ message: 'Pieza actualizada correctamente' });
    });
  });
};

// Eliminar pieza
exports.deletePart = (req, res) => {
  const { id } = req.params;

  Part.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Pieza no encontrada' });

    const imagePath = results[0].image_url ? path.join(__dirname, '..', results[0].image_url) : null;

    Part.delete(id, (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      if (imagePath) {
        fs.unlink(imagePath, (err3) => {
          if (err3) console.warn('No se pudo eliminar la imagen:', err3.message);
        });
      }

      res.json({ message: 'Pieza eliminada correctamente' });
    });
  });
};
