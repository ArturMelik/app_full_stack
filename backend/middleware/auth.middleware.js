const jwt = require('jsonwebtoken');
const userModel = require('../models/users.model'); // Importamos el Modelo para buscar el usuario
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Función middleware para proteger rutas verificando el Token JWT.
 * @exports protect
 */
const protect = async (req, res, next) => {
    let token;

    // 1. Verificar si el Token está presente en la cabecera 'Authorization'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // El formato es: "Bearer <token>". Lo separamos para obtener solo el token.
            token = req.headers.authorization.split(' ')[1];

            // 2. Verificar el token y decodificar el payload (id y role)
            const decoded = jwt.verify(token, JWT_SECRET);

            // 3. Buscar el usuario en la DB usando el ID del token (sin la contraseña)
            // Esto asegura que el usuario todavía exista y no haya sido borrado.
            const user = await userModel.getUserById(decoded.id); 
            
            if (!user) {
                // Si el ID del token no corresponde a un usuario existente
                return res.status(401).json({ error: 'Usuario no encontrado para este token.' });
            }

            // 4. Adjuntar el objeto de usuario (sin password) a la petición (req.user)
            req.user = user; 

            next(); // Permite que la petición continúe al siguiente controlador/middleware

        } catch (error) {
            // El error ocurre si el token es inválido, está expirado, o la firma no coincide.
            console.error('Error de autenticación:', error.message);
            // Devolvemos un 401: No autorizado (Token no válido)
            res.status(401).json({ error: 'Acceso denegado, token no válido o expirado.' });
        }
    }

    // Si la cabecera 'Authorization' no estaba presente o no tenía el formato 'Bearer <token>'
    if (!token) {
        res.status(401).json({ error: 'Acceso denegado, no se ha proporcionado el token.' });
    }
};

module.exports = { protect };