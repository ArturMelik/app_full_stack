

const userModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const JWT_SECRET = process.env.JWT_SECRET;

// --- FUNCIÓN LOGIN (POST /api/auth/login) ---
async function login(req, res) {
    const { email, password } = req.body;
    
    try {
        // 1. Buscar usuario por email (usa tu función del Modelo)
        const user = await userModel.getUserByEmail(email);

        // Si el usuario no existe
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado.' });
        }

        // 2. Comparar la contraseña (bcrypt.compare)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Usuario no encontrado.' });
        }

        // 3. Generar el Token JWT
        const token = jwt.sign(
            { id: user.id_user, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: '1h' } // Token expira en 1 hora
        );

        // 4. Respuesta exitosa con el Token
        return res.status(200).json({ 
            message: 'Inicio de sesión exitoso.',
            token: token,
            user: { id: user.id_user, username: user.username, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error('Error durante el login:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}



// --- FUNCIÓN LOGOUT (POST /api/auth/logout) ---
function logout(req, res) {
    return res.status(200).json({ message: 'Sesión cerrada correctamente.' });
}

const authControllers ={
    login,
    logout 
};

module.exports = authControllers;