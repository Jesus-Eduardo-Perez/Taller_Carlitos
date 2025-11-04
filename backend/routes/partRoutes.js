const express = require('express');
const router = express.Router();
const partController = require('../controllers/partController');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/parts'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Rutas CRUD
router.get('/', partController.getParts);
router.get('/:id', partController.getPartById);
router.post('/', upload.single('image'), partController.createPart);
router.put('/:id', upload.single('image'), partController.updatePart);
router.delete('/:id', partController.deletePart);

module.exports = router;
