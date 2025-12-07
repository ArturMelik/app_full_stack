const createProduct = `
    INSERT INTO products (name, price, description, img, id_provider, relevancia)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id_product, name, price;
`;

const getTotalProducts = `
    SELECT COUNT(*) AS total FROM products;
`;

const getAllProducts = `
SELECT 
    p.id_product,
    p.name,
    p.price,
    p.description,
    p.img,
    p.relevancia,
    pr.companyname AS provider_name
FROM products p
JOIN providers pr ON p.id_provider = pr.id_provider
ORDER BY p.id_product
LIMIT $1 OFFSET $2;
`;

const searchProducts = `
    SELECT 
        p.id_product,
        p.name,
        p.price,
        p.description,
        p.img,
        p.relevancia,
        pr.companyname AS provider_name
    FROM products p
    JOIN providers pr ON p.id_provider = pr.id_provider
    WHERE p.name ILIKE $1 OR pr.companyname ILIKE $1
`;


const getProductById = `
    SELECT 
        p.id_product, 
        p.name, 
        p.price, 
        p.description, 
        p.img,
        p.relevancia,
        pr.companyname AS provider_name
    FROM products p
    JOIN providers pr ON p.id_provider = pr.id_provider
    WHERE p.id_product = $1; 
`;

const updateProductQuery = (id, { name, price, description, img, id_provider, relevancia }) => {
    const query = `
        UPDATE products
        SET name = $1, 
            price = $2, 
            description = $3, 
            img = $4, 
            id_provider = $5,
            relevancia = $6
        WHERE id_product = $7  
        RETURNING *;
    `;
    const values = [name, price, description, img, id_provider, relevancia, id];
    return { query, values };
};

/**
 * Query para eliminar un producto por su ID.
 * @returns {string} Consulta SQL de tipo DELETE.
 */
const deleteProduct = ` 
    DELETE FROM products
    WHERE id_product = $1
    RETURNING id_product;
`;

const productQueries = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductQuery,
    deleteProduct,
    getTotalProducts,
    searchProducts
};

module.exports = productQueries;