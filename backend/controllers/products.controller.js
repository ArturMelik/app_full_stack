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


const getProductById = async (req, res) => {
    // El ID viene como parámetro de la URL (ej. /api/products/1)
    const id_product = parseInt(req.params.id); 

    if (isNaN(id_product)) {
        return res.status(400).json({ error: 'El ID del producto debe ser un número válido.' });
    }

    try {
        const product = await productModel.getProductByIdModel(id_product);
        
        if (!product) {
            // Si la consulta no devuelve filas (el producto no existe)
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener producto por ID:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const editProduct = async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    // ... (validaciones de datos)

    try {
        const updatedProduct = await productModel.updateProductModel(productId, productData);

        if (!updatedProduct) {
            return res.status(404).json({ error: `Producto con ID ${productId} no encontrado.` });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        // Manejo específico del error de proveedor no existente desde el modelo
        if (error.message.includes('proveedor')) { 
             return res.status(404).json({ error: error.message });
        }
        console.error('Error al editar producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al editar el producto.' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    editProduct
};