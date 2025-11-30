// Este middleware se ejecuta DESPUÉS de 'protect',

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