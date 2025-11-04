const db = require('../config/db');

const Part = {
  // Obtener todas las piezas (con nombre de la marca)
  getAll(callback) {
    const sql = `
      SELECT parts.*, brands.name AS brand_name
      FROM parts
      JOIN brands ON parts.brand_id = brands.id
      ORDER BY parts.id DESC
    `;
    db.query(sql, callback);
  },

  // Obtener una pieza por ID
  getById(id, callback) {
    const sql = `
      SELECT parts.*, brands.name AS brand_name
      FROM parts
      JOIN brands ON parts.brand_id = brands.id
      WHERE parts.id = ?
    `;
    db.query(sql, [id], callback);
  },

  // Crear nueva pieza
  create(data, callback) {
    const sql = `
      INSERT INTO parts (name, brand_id, model, car_make, car_model, year_range, price, stock, description, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
      data.name,
      data.brand_id,
      data.model,
      data.car_make,
      data.car_model,
      data.year_range,
      data.price,
      data.stock || 1,
      data.description || null,
      data.image_url || null
    ], callback);
  },

  // Actualizar una pieza
  update(id, data, callback) {
    const sql = `
      UPDATE parts
      SET name = ?, brand_id = ?, model = ?, car_make = ?, car_model = ?, year_range = ?, price = ?, stock = ?, description = ?, image_url = ?
      WHERE id = ?
    `;
    db.query(sql, [
      data.name,
      data.brand_id,
      data.model,
      data.car_make,
      data.car_model,
      data.year_range,
      data.price,
      data.stock,
      data.description,
      data.image_url,
      id
    ], callback);
  },

  // Eliminar una pieza
  delete(id, callback) {
    const sql = `DELETE FROM parts WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

module.exports = Part;
