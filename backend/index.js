const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.DOMAIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puesto ${PORT}`));