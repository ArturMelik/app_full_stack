const pool = require('../config/db'); 
const queries = require('../queries/products.queries');

const createProductModel = async (name, price, description, img, id_provider) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createProduct, [name, price, description, img, id_provider]);
        result = data.rows[0];
    } catch (err) {
        // Error 23503: Clave foránea no existe (el id_provider no existe)
        if (err.code === '23503') { 
            throw new Error(`El proveedor con ID ${id_provider} no existe.`);
        }
        console.error('Error en productModel.createProductModel:', err.message);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result;
};

const getAllProductsModel = async () => {
    let client, rows;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllProducts);
        rows = data.rows; 
    } catch (err) {
        console.error('Error en productModel.getAllProductsModel:', err.message);
        throw err;
    } finally {
        if (client) client.release();
    }
    return rows;
};


const getProductByIdModel = async (id_product) => {
    let client, result;
    try {
        client = await pool.connect();
        // Usamos el ID como parámetro $1
        const data = await client.query(queries.getProductById, [id_product]);
        result = data.rows[0]; // Solo esperamos un resultado

    } catch (err) {
        console.error('Error en productModel.getProductByIdModel:', err.message);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result;
};


module.exports = {
    createProductModel,
    getAllProductsModel,
    getProductByIdModel
};