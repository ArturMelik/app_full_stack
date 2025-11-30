const queries = {
  // Necesaria para la función getAllUsers
    getAllUsers: `
        SELECT id_user, username, email, role FROM users
    `,
    
    // 2. CONSULTA PARA OBTENER POR EMAIL (login futuro)
    getUserByEmail: `
        SELECT * FROM users
        WHERE email = $1
    `,

    // 3. CONSULTA PARA CREAR USUARIO (Registro)
    createUser: `
        INSERT INTO users (username, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id_user, username, email, role
    `,
};

module.exports = queries;

module.exports = queries;
