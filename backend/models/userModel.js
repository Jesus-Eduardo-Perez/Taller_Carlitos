const db = require('../config/db');

const User = {
    findById: (id, callback) => {
        db.query('SELECT id, name, email FROM users WHERE id = ?', [id], callback);
    },
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },
    create: (userData, callback) => {
        db.query('INSERT INTO users SET ?', userData, callback);
    }
};

module.exports = User;