const userModel = require('../models/users.model'); 

// --- FUNCIÓN GET (Obtener todos los usuarios) ---
const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers(); 
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al obtener usuarios.' });
    }
};

// --- FUNCIÓN POST (Crear/Registrar un usuario) ---
const createUser = async (req, res) => {
    // 1. Recibe los datos del body
    const { username, email, password, role } = req.body; 
    
    // 2. Crea el objeto user para el Modelo
    const user = { 
        username, 
        email, 
        password, 
        role: role || 'user'
    };

    try {
        // 3. Llama al Modelo para hashear y guardar
        const newUser = await userModel.createUser(user); 
        
        // 4. Respuesta de éxito (201 Created)
        return res.status(201).json({ 
            message: 'Usuario creado exitosamente.',
            user: newUser // Retorna el usuario sin la contraseña
        });
        
    } catch (error) {
        console.error('Error en userController.createUser:', error);
        
        // 5. Manejo de error de conflicto (Email/userName duplicado)
        if (error.code === '23505') { 
            return res.status(409).json({ error: 'El nombre de usuario o email ya está registrado.' });
        }
        res.status(500).json({ error: 'Error interno del servidor al registrar usuario.' });
    }
};

module.exports = {
    getUsers,
    createUser
};