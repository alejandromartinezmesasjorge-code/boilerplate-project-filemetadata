require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Permitir solicitudes de freeCodeCamp
app.use(cors());

// Archivos públicos
app.use('/public', express.static(process.cwd() + '/public'));

// Configuración de Multer
const upload = multer({
  storage: multer.memoryStorage()
});

// Página principal
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Endpoint solicitado por freeCodeCamp
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'No file uploaded'
    });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Puerto del servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});