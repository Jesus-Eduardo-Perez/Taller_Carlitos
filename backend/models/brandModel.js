const db = require('../config/db');

const Brand = {
    getAll: (callback) => {
        db.query('SELECT * FROM brands', callback);
    },
    getById: (id, callback) => {
    db.query('SELECT * FROM brands WHERE id = ?', [id], callback);
  },
    create: (name, imageUrl, callback) => {
        db.query('INSERT INTO brands (name, image_url, created_at) VALUES (?, ?, NOW())', [name, imageUrl], callback);
    },
    update: (id, name, imageUrl, callback) => {
    // Si no hay nueva imagen, no la actualizamos
    if (imageUrl) {
      db.query('UPDATE brands SET name = ?, image_url = ? WHERE id = ?', [name, imageUrl, id], callback);
    } else {
      db.query('UPDATE brands SET name = ? WHERE id = ?', [name, id], callback);
    }
  },

  delete: (id, callback) => {
    db.query('DELETE FROM brands WHERE id = ?', [id], callback);
  }
};

module.exports = Brand;