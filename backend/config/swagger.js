const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Tienda de Informática',
      version: '1.0.0',
      description: 'Documentación de la API REST para la gestión de productos, usuarios y favoritos.',
    },
    // Definición de Esquemas de Seguridad (Para JWT)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Introduce el Token JWT con el prefijo Bearer (Ej: Bearer eyJhbGciOi...)',
        },
      },
    },
    // El servidor base donde correrá tu API
    servers: [
      {
        url: 'http://localhost:5000/api', // Asegúrate de que el puerto 5000 y el prefijo /api sean correctos
        description: 'Servidor de Desarrollo Local',
      },
    ],
  },
  // RUTAS A DOCUMENTAR
  // Le dice a swagger-jsdoc dónde buscar los comentarios JSDoc especiales
  apis: [
    './routes/*.js',       // Para documentar routes/userRoutes.js, routes/productRoutes.js, etc.
    './controllers/*.js'   
  ], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;