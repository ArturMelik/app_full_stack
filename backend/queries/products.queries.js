const createProduct = `
    INSERT INTO products (name, price, description, img, id_provider)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id_product, name, price;
`;

const getAllProducts = `
    SELECT p.id_product, p.name, p.price, p.description, p.img, 
           pr.companyname AS provider_name
    FROM products p
    JOIN providers pr ON p.id_provider = pr.id_provider
`;

const getProductById = `
    SELECT 
        p.id_product, 
        p.name, 
        p.price, 
        p.description, 
        p.img, 
        pr.companyname AS provider_name
    FROM products p
    JOIN providers pr ON p.id_provider = pr.id_provider
    WHERE p.id_product = $1; 
`;

const updateProductQuery = (id, { name, price, description, img, id_provider }) => {
    const query = `
        UPDATE products
        SET name = $1, 
            price = $2, 
            description = $3, 
            img = $4, 
            id_provider = $5
        WHERE id_product = $6  
        RETURNING *;
    `;
    const values = [name, price, description, img, id_provider, id];
    return { query, values };
};

const productQueries = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductQuery
};

module.exports = productQueries;