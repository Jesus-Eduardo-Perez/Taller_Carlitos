const db = require('../config/db');

const Brand = {
    getAll: (callback) => {
        db.query('SELECT * FROM brands', callback);
    },

    create: (name, imageUrl, callback) => {
        db.query('INSERT INTO brands (name, image_url, created_at) VALUES (?, ?, NOW())', [name, imageUrl], callback);
    }
};

module.exports = Brand;