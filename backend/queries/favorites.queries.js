// INSERT: Añadir un producto a favoritos.

const createFavorite = `
    INSERT INTO favorites (id_user, id_product)
    VALUES ($1, $2)
    RETURNING id_favorito, id_user, id_product;
`;

// SELECT: Obtener todos los productos favoritos de un usuario.
// Usamar JOIN para traer el nombre del producto, no solo el ID.
const getAllFavorites = `
    SELECT 
        f.id_favorito, 
        p.id_product,
        p.name AS product_name,
        p.price,
        p.img
    FROM favorites f
    JOIN products p ON f.id_product = p.id_product
    WHERE f.id_user = $1;
`;
const checkIfFavoriteExists = `
    SELECT id_user 
    FROM favorites 
    WHERE id_user = $1 AND id_product = $2;
`;

// DELETE: Eliminar un producto de favoritos.
const deleteFavorite = `
    DELETE FROM favorites
    WHERE id_user = $1 AND id_product = $2
    RETURNING *;
`;

const favoriteQueries = {
    createFavorite,
    getAllFavorites,
    checkIfFavoriteExists,
    deleteFavorite
};

module.exports = favoriteQueries;