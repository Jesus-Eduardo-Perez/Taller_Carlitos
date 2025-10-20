const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const brandController = require('../controllers/brandController');

// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/brands'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Rutas
router.get('/', brandController.getBrands);
router.post('/', upload.single('image'), brandController.createBrand);
router.put('/:id', upload.single('image'), brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

module.exports = router;
