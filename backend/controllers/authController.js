const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: 'Error en el servidor' });

            if (!isMatch) {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }

            const token = jwt.sign(
                { id: user.id, user_type: user.user_type },
                process.env.JWT_SECRET,
                { expiresIn: '4h' }
            );

            const redirectPage = user.user_type === 1 ? '/admin' : '/';

            res.json({ token, redirectPage, user_type: user.user_type, user_id: user.id});
        });
    });
};
exports.register = (req, res) => {
    const { name, email, password, user_type } = req.body;

    // Verifica que todos los datos estén completos
    if (!name || !email || !password || !user_type) {
        return res.status(400).json({ error: 'Por favor completa todos los campos' });
    }

    // Verifica si el correo ya está registrado
    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });

        if (results.length > 0) {
            return res.status(409).json({ error: 'El correo ya está registrado' });
        }

        // Encripta la contraseña
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ error: 'Error al encriptar la contraseña' });

            const newUser = {
                name,
                email,
                password: hashedPassword,
                user_type
            };

            User.create(newUser, (err, result) => {
                if (err) return res.status(500).json({ error: 'Error al registrar el usuario' });

                res.status(201).json({ message: 'Usuario registrado exitosamente' });
            });
        });
    });
};
exports.getUserProfile = (req, res) => {
    const userId = req.user.id; // Tomamos el ID desde el token decodificado

    User.findById(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener datos del usuario' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];
        res.json({ name: user.name, email: user.email });
    });
};