// Importar módulos
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 5000; // Puerto 5000 para el Backend

// Importar el pool de conexión SQL (¡Ahora hacemos la prueba!)
const pool = require('./config/db');

// Función de prueba de conexión y log
pool.query('SELECT NOW()')
    .then(res => console.log('✅ Conexión SQL establecida y probada con éxito.'))
    .catch(err => console.error('❌ ERROR CRÍTICO: No se pudo conectar a PostgreSQL.', err.stack));

// Configurar Middlewares
app.use(cors());
app.use(express.json()); 

// Importar el archivo de rutas
const userRoutes = require('./routes/users.route.js'); 

// Asignar las rutas al endpoint base /api/users
app.use('/api/users', userRoutes);

const authRoutes = require('./routes/auth.route.js'); 
app.use('/api/auth', authRoutes); // Monta las rutas de autenticación en /api/auth

const providerRoutes = require('./routes/providers.route.js'); 
app.use('/api/providers', providerRoutes); // Monta las rutas de proveedores en /api/providers

const productRoutes = require('./routes/products.route.js'); 
app.use('/api/products', productRoutes); // Monta las rutas de productos en /api/products

const favoriteRoutes = require('./routes/favorites.route.js'); 
app.use('/api/favorites', favoriteRoutes); // Monta las rutas de favoritos en /api/favorites


// Ruta de prueba
app.get('/', (req, res) => {
    res.status(200).json({ message: "Servidor operativo en puerto 5000." });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});