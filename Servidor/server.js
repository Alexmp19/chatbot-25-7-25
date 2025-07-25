const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const iaRoutes = require('./routes/iaRoutes.js');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/ia', iaRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
