const productModel = require('../models/products.model');

const createProduct = async (req, res) => {
    // Asegúrate de que los campos numéricos como 'price' y 'id_provider' 
    // sean tratados como números, no como cadenas de texto.
    const { name, price, description, img, id_provider } = req.body;

    if (!name || !price || !id_provider) {
        return res.status(400).json({ error: 'Nombre, precio e ID de proveedor son obligatorios.' });
    }
    // Simple validación de tipos
    if (isNaN(parseFloat(price)) || isNaN(parseInt(id_provider))) {
        return res.status(400).json({ error: 'Precio e ID de proveedor deben ser numéricos.' });
    }

    try {
        const newProduct = await productModel.createProductModel(name, price, description, img, id_provider);
        res.status(201).json({ 
            message: 'Producto creado con éxito.',
            product: newProduct
        });
    } catch (error) {
        if (error.message.includes('proveedor')) {
            return res.status(404).json({ error: error.message });
        }
        console.error('Error al crear producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProductsModel();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = {
    createProduct,
    getProducts
};