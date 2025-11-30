/**
 * @fileoverview Middleware de verificación de roles de administrador.
 * @author Artur Melik Adamyan
 */

/**
 * @description Verifica si el usuario autenticado tiene el rol de "admin".
 * * Este middleware es esencial para asegurar rutas críticas.
 * * | Aspecto | Requisito/Resultado | Estado HTTP |
 * | :--- | :--- | :--- |
 * | **Precondición** | Objeto 'req.user' adjunto | N/A |
 * | **Condición de Éxito** | req.user.role === 'admin' | next() |
 * | **Condición de Fracaso** | Usuario no existe o no es 'admin' | 403 Prohibido |
 * * @static
 * @method
 * @param {object} req - Objeto de petición HTTP, debe contener req.user.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función que pasa al siguiente estado si la comprobación es correcta.
 * @throws {object} Devuelve un error 403 (Prohibido) si el usuario no es 'admin'.
 */
const admin = (req, res, next) => {
    // Si req.user existe Y su rol es "admin", permitimos continuar.
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        // Acceso denegado (código 403: Prohibido)
        res.status(403).json({ 
            error: 'Acceso denegado. Se requiere rol de administrador.' 
        });
    }
};

module.exports = { admin };