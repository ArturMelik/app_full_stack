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

const updateProductModel = async (id, productData) => {
    let client, result;
    const { query, values } = queries.updateProductQuery(id, productData);
    
    try {
        client = await pool.connect(); // <--- ¡Conectar el cliente primero!
        // Ahora usamos client.query, como en las otras funciones
        const data = await client.query(query, values); 
        result = data.rows[0] || null;
        
    } catch (error) {
        // Manejar el error de clave foránea no existente si aplica (proveedor)
        if (error.code === '23503') { 
            throw new Error(`El proveedor con ID ${productData.id_provider} no existe.`);
        }
        console.error('Error en productModel.updateProductModel:', error.message);
        throw new Error('Error al actualizar el producto en la base de datos.');
    } finally {
        if (client) client.release(); // <--- Liberar el cliente al final
    }
    return result;
};


/**
 * @description Elimina un producto existente por su ID.
 * @param {number} id - ID del producto a eliminar.
 * @returns {object|null} El ID del producto eliminado o null si no se encontró.
 */
const deleteProductModel = async (id) => { //el nombre del modelo para distinguirlo del controlador
    let client, result;
    
    try {
        client = await pool.connect();
        // Usamos la query importada 'deleteProduct'
        const data = await client.query(queries.deleteProduct, [id]); 
        result = data.rows[0] || null;
    } catch (error) {
        console.error('Error en productModel.deleteProductModel:', error.message);
        throw new Error('Error al eliminar el producto en la base de datos.');
    } finally {
        if (client) client.release();
    }
    return result;
};

module.exports = {
    createProductModel,
    getAllProductsModel,
    getProductByIdModel,
    updateProductModel,
    deleteProductModel
};