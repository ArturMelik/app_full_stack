const bcrypt = require('bcryptjs'); // bcryptjs para hashing de contraseñas
const queries = require("../queries/users.queries"); // Importa las consultas SQL
const pool = require("../config/db"); // Importa el pool de conexión PostgreSQL

// --- FUNCIÓN GET (Obtener todos los usuarios) ---
const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); 
        const data = await client.query(queries.getAllUsers); // Ejecuta SELECT * FROM users
        result = data.rows; // Array de usuarios
    } catch (err) {
        console.error('Error en userModel.getAllUsers:', err);
        throw err;
    } finally {
        if (client) client.release(); // ¡Libera siempre la conexión!
    }
    return result; 
};

// --- FUNCIÓN POST (Crear/Registrar un usuario) ---
const createUser = async (user) => {
    // 1. Destructurar los datos recibidos
    const { username, email, password, role } = user; 
    
    // 2. Hashear la contraseña (Seguridad)
    const hashedPassword = await bcrypt.hash(password, 10); 
    
    let client, result;
    try {
        client = await pool.connect(); 
        
        // 3. Ejecutar la consulta INSERT (Asegura el orden: username, email, hashedPassword, role)
        const data = await client.query(queries.createUser, [
            username, 
            email, 
            hashedPassword, 
            role || 'user' // Si el rol no viene, asigna 'user' por defecto
        ]); 
        
        result = data.rows[0]; // Retorna el usuario creado (con id_user)
    } catch (error) {
        console.error('Error en userModel.createUser:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
    return result; 
};

// --- FUNCIÓN GET por email (Para login futuro) ---
const getUserByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); 
        const data = await client.query(queries.getUserByEmail, [email]);
        result = data.rows[0]; // Retorna un solo usuario o undefined
    } catch (err) {
        console.error('Error en userModel.getUserByEmail:', err);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result;
};


const getUserById = async (id) => {
    let client, result;
    try {
        client = await pool.connect(); 
        const data = await client.query(queries.getUserById, [id]);
        result = data.rows[0]; 
    } catch (err) {
        console.error('Error en userModel.getUserById:', err);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result;
};


const userModel = {
    getAllUsers,
    createUser,
    getUserByEmail,
    getUserById
};

module.exports = userModel;