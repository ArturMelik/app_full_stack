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

const productQueries = {
    createProduct,
    getAllProducts
};

module.exports = productQueries;